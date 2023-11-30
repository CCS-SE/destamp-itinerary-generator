import { contentBasedFiltering } from '../../../../utils/content-based filtering';
import { generateItinerary } from '../../../../utils/ga-operations';
import {
  assignAccommodation,
  createDailyItinerary,
} from '../../../../utils/ga-operations/createDailyItinerary';
import {
  getDesiredTravelHour,
  multiplyRangeByPeople,
} from '../../../../utils/ga-operations/utils';
import { tripDuration } from '../../../../utils/utils';
import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type CreateTripPreferenceInput = NexusGenInputs['CreateTripPreferenceInput'];

const selectedFields = {
  id: true,
  price: true,
  name: true,
  categories: true,
  isAttraction: true,
  visitDuration: true,
  latitude: true,
  longitude: true,
  accommodation: true,
  restaurant: true,
};

export const createTrip = async (
  userId: string,
  tripInput: CreateTripInput,
  tripPreferenceInput: CreateTripPreferenceInput,
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
  } = tripInput;
  try {
    const pois = await ctx.prisma.pointOfInterest.findMany({
      select: {
        ...selectedFields,
        accommodation: {
          include: {
            amenities: true,
          },
        },
      },
    });

    const duration = tripDuration(tripInput.startDate, tripInput.endDate);

    const desiredTravelHours = tripInput.timeSlots.map(
      (time: [number, number]) => getDesiredTravelHour(time),
    ) as number[];

    const filteredPois = contentBasedFiltering(pois, tripPreferenceInput);

    const suggestedItineraries = await generateItinerary(
      tripInput,
      filteredPois,
      duration,
      desiredTravelHours,
    );

    const dailyItineraries = await Promise.all(
      assignAccommodation(
        suggestedItineraries,
        tripInput,
        filteredPois,
        duration,
      ).map(async (itinerary) => {
        const dailyItinerary = await createDailyItinerary(itinerary, tripInput);
        return dailyItinerary;
      }),
    );

    return await ctx.prisma.trip.create({
      data: {
        budget: budget,
        endDate: new Date(tripInput.endDate),
        startDate: new Date(tripInput.startDate),
        title: title,
        travelSize: travelSize,
        travelerCount: travelerCount,
        isAccommodationIncluded: isAccommodationIncluded,
        isFoodIncluded: isFoodIncluded,
        isTransportationIncluded: isTransportationIncluded,
        startingLocation: tripInput.startingLocation,
        timeSlots: tripInput.timeSlots as [number, number][],
        tripPreference: {
          create: {
            accommodationType: tripPreferenceInput.accommodationType,
            activities: tripPreferenceInput.activities,
            amenities: tripPreferenceInput.amenities,
            cuisines: tripPreferenceInput.cuisines,
            diningStyles: tripPreferenceInput.diningStyles,
          },
        },
        dailyItineraries: {
          create: dailyItineraries.map((dailyItinerary, index) => ({
            dayIndex: index,
            accommodationCost: dailyItinerary.chrom.accommodationCost(),
            foodCost: multiplyRangeByPeople(
              dailyItinerary.chrom.foodCostRange(),
              travelerCount,
            ),
            attractionCost:
              dailyItinerary.chrom.attractionCost() * travelerCount,
            transportationCost: dailyItinerary.travelExpenses,
            dailyItineraryPois: {
              create: dailyItinerary.chrom.genes.map((gene, index) => ({
                order: index,
                duration: dailyItinerary.travelDurations[index]!,
                distance: dailyItinerary.travelDistances[index]!,
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
