import { PlaceType } from '@prisma/client';

import {
  daySuggestions,
  generatePopulation,
  multiplyRangeByPeople,
} from '../../../../utils/ga-operations/utils';
import { tripDuration } from '../../../../utils/utils';
import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type CreateDepartingLocationInput =
  NexusGenInputs['CreateDepartingLocationInput'];

export const createTrip = async (
  tripInput: CreateTripInput,
  locationInput: CreateDepartingLocationInput,
  ctx: Context,
) => {
  try {
    const filters = [];

    filters.push({
      type: PlaceType.ATTRACTION,
    });

    if (tripInput.isAccommodationIncluded) {
      filters.push({
        type: PlaceType.ACCOMMODATION,
      });
    }

    if (tripInput.isFoodIncluded) {
      filters.push({
        type: PlaceType.RESTAURANT,
      });
    }

    const places = await ctx.prisma.place.findMany({
      where: {
        OR: filters,
      },
    });

    const departingLocation = await ctx.prisma.departingLocation.create({
      data: locationInput,
    });

    const numberOfPeople =
      (tripInput.adultCount || 0) + (tripInput.childCount || 0);

    const duration = tripDuration(
      new Date(tripInput.startDate),
      new Date(tripInput.endDate),
    );

    const initializedPopulation = generatePopulation(tripInput, places);
    const randomIndex = Math.floor(
      Math.random() * initializedPopulation.length - 1,
    );
    const currentPopulation = initializedPopulation[randomIndex]; // Randomly selects a chromosome
    const dailyPlans = daySuggestions(currentPopulation!, duration);

    return await ctx.prisma.trip.create({
      data: {
        budget: tripInput.budget,
        endDate: new Date(tripInput.endDate),
        startDate: new Date(tripInput.startDate),
        title: tripInput.title,
        travelSize: tripInput.travelSize,
        adultCount: tripInput.adultCount,
        childCount: tripInput.childCount,
        isAccommodationIncluded: tripInput.isAccommodationIncluded,
        isFoodIncluded: tripInput.isFoodIncluded,
        isTransportationIncluded: tripInput.isTransportationIncluded,
        travelerId: tripInput.travelerId,
        destinationId: tripInput.destinationId,
        departingLocationId: departingLocation.id,
        preferredTime: tripInput.preferredTime as string[],
        itinerary: {
          create: {
            totalCost: currentPopulation
              ? currentPopulation.chrom.sumCost()
              : 0,
            totalDuration: currentPopulation
              ? currentPopulation.chrom.sumDuration()
              : 0,
            url: 'sample',
            dailyItineraries: {
              create: dailyPlans.map((dailyPlan, index) => ({
                accommodationCost:
                  dailyPlan.chrom.accommodationCost() * duration,
                foodCost: multiplyRangeByPeople(
                  dailyPlan.chrom.foodCostRange(),
                  numberOfPeople,
                ),
                attractionCost:
                  dailyPlan.chrom.attractionCost() * numberOfPeople,
                transportationCost: 0,
                dayIndex: index,
                destinations: {
                  connect: dailyPlan.chrom.genes
                    .map((gene) => gene.id)
                    .map((id) => ({ id })),
                },
              })),
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

export const deleteTrip = async (id: number, ctx: Context) => {
  const itinerary = await ctx.prisma.itinerary.findFirstOrThrow({
    where: {
      trip: {
        id: id,
      },
    },
  });

  await ctx.prisma.expense.deleteMany({
    where: {
      itinerary: {
        id: itinerary.id,
      },
    },
  });

  await ctx.prisma.dailyItinerary.deleteMany({
    where: {
      itinerary: {
        id: itinerary.id,
      },
    },
  });

  await ctx.prisma.itinerary.delete({
    where: {
      tripId: id,
    },
  });

  return await ctx.prisma.trip.delete({
    where: {
      id: id,
    },
    include: {
      departingLocation: true,
    },
  });
};
