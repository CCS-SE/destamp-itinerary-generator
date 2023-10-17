import { generateItinerary } from '../../../../utils/ga-operations';
import {
  getDailyPlans,
  getDaySuggestions,
} from '../../../../utils/ga-operations/daySuggestion';
import { multiplyRangeByPeople } from '../../../../utils/ga-operations/utils';
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
    const restaurants = await ctx.prisma.place.findMany({
      where: {
        type: 'RESTAURANT',
      },
    });

    const attractions = await ctx.prisma.place.findMany({
      where: {
        type: 'ATTRACTION',
      },
    });

    const accomodations = await ctx.prisma.place.findMany({
      where: {
        type: 'ACCOMMODATION',
      },
      orderBy: {
        id: 'asc',
      },
    });

    const departingLocation = await ctx.prisma.departingLocation.create({
      data: locationInput,
    });

    const numberOfPeople =
      (tripInput.adultCount || 0) + (tripInput.childCount || 0);

    const suggestedDestinations = await generateItinerary(
      tripInput,
      restaurants,
      attractions,
    );

    const bestSoFar = suggestedDestinations[0];

    const suggestedPlans = bestSoFar
      ? getDaySuggestions(bestSoFar, tripInput, accomodations)
      : [];

    // const dailyPlans = suggestedPlans;

    const dailyPlans = await getDailyPlans(suggestedPlans, tripInput);

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
            totalCost: bestSoFar?.chrom.sumCost() || 0,
            totalDuration: bestSoFar?.chrom.sumDuration() || 0,
            url: '',
            dailyItineraries: {
              create: dailyPlans.map((dailyPlan, index) => ({
                accommodationCost: dailyPlan.chrom.accommodationCost(),
                foodCost: multiplyRangeByPeople(
                  dailyPlan.chrom.foodCostRange(),
                  numberOfPeople,
                ),
                attractionCost:
                  dailyPlan.chrom.attractionCost() * numberOfPeople,
                transportationCost: dailyPlan.travelExpenses,
                travelDistances: dailyPlan.travelDistances,
                travelDurations: dailyPlan.travelDurations,
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
