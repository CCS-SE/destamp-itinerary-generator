import { generateItinerary } from '../../../../utils/ga-operations';
import {
  getDailyPlans,
  getDaySuggestions,
} from '../../../../utils/ga-operations/daySuggestion';
import { multiplyRangeByPeople } from '../../../../utils/ga-operations/utils';
import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

const selectedFields = {
  id: true,
  price: true,
  isAttraction: true,
  visitDuration: true,
  latitude: true,
  longitude: true,
  accommodation: true,
  restaurant: true,
};

export const createTrip = async (
  userId: string,
  input: CreateTripInput,
  ctx: Context,
) => {
  const {
    budget,
    isAccommodationIncluded,
    isFoodIncluded,
    isTransportationIncluded,
    title,
    travelSize,
    travelerCount,
  } = input;
  try {
    const restaurants = await ctx.prisma.pointOfInterest.findMany({
      where: {
        restaurant: {
          isNot: null,
        },
      },
      select: {
        ...selectedFields,
      },
    });

    const attractions = await ctx.prisma.pointOfInterest.findMany({
      where: {
        isAttraction: true,
      },
      select: {
        ...selectedFields,
      },
    });

    const accomodations = await ctx.prisma.pointOfInterest.findMany({
      where: {
        accommodation: {
          isNot: null,
        },
      },
      select: {
        ...selectedFields,
      },
    });

    const suggestedDestinations = await generateItinerary(
      input,
      restaurants,
      attractions,
    );

    const bestSoFar = suggestedDestinations[0];

    const suggestedPlans = bestSoFar
      ? getDaySuggestions(bestSoFar, input, accomodations)
      : [];

    const dailyPlans = await getDailyPlans(suggestedPlans, input);

    return await ctx.prisma.trip.create({
      data: {
        budget: budget,
        endDate: new Date(input.endDate),
        startDate: new Date(input.startDate),
        title: title,
        travelSize: travelSize,
        travelerCount: travelerCount,
        isAccommodationIncluded: isAccommodationIncluded,
        isFoodIncluded: isFoodIncluded,
        isTransportationIncluded: isTransportationIncluded,
        startingLocation: input.startingLocation,
        timeSlots: input.timeSlots,
        daily_itineraries: {
          create: dailyPlans.map((dailyPlan, index) => ({
            dayIndex: index,
            accommodationCost: dailyPlan.chrom.accommodationCost(),
            foodCost: multiplyRangeByPeople(
              dailyPlan.chrom.foodCostRange(),
              travelerCount,
            ),
            attractionCost: dailyPlan.chrom.attractionCost() * travelerCount,
            transportationCost: dailyPlan.travelExpenses,
            dailyItineraryPois: {
              create: dailyPlan.chrom.genes.map((gene, index) => ({
                order: index,
                duration: dailyPlan.travelDurations[index]!,
                distance: dailyPlan.travelDistances[index]!,
                poi: {
                  connect: {
                    id: gene.id as string,
                  },
                },
              })),
            },
          })),
        },
        user: {
          connect: {
            id: userId,
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
  await ctx.prisma.expense.deleteMany({
    where: {
      tripId: id,
    },
  });

  await ctx.prisma.dailyItineraryPoi.deleteMany({
    where: {
      dailyItinerary: {
        tripId: id,
      },
    },
  });

  await ctx.prisma.dailyItinerary.deleteMany({
    where: {
      tripId: id,
    },
  });

  return await ctx.prisma.trip.delete({
    where: {
      id: id,
    },
  });
};
