import {
  contentBasedFiltering,
  Preference,
} from '../../../../utils/content-based filtering';
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
  isPremium: boolean,
  userId: string,
  tripInput: CreateTripInput,
  tripPreferenceInput: CreateTripPreferenceInput,
  ctx: Context,
) => {
  const {
    budget,
    isAccommodationIncluded,
    destination,
    isFoodIncluded,
    isTransportationIncluded,
    title,
    travelSize,
    travelerCount,
  } = tripInput;
  try {
    const pois = await ctx.prisma.pointOfInterest.findMany({
      where: {
        OR: [
          {
            user: {
              isNot: null,
            },
            businessPermit: {
              isVerified: true,
            },
          }, // newly added place that is not yet verified must not be included
          {
            user: {
              is: null,
            },
            businessPermit: {
              is: null,
            },
          }, // include all scraped data
        ],
      },
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

    const pointOfInterests = isPremium
      ? contentBasedFiltering(pois, tripPreferenceInput)
      : pois;

    console.log(pointOfInterests.length);

    const suggestedItineraries = await generateItinerary(
      isPremium,
      tripInput,
      pointOfInterests,
      duration,
      desiredTravelHours,
    );

    const dailyItineraries = await Promise.all(
      assignAccommodation(
        suggestedItineraries,
        tripInput,
        pointOfInterests,
        duration,
      ).map(async (itinerary) => {
        const dailyItinerary = await createDailyItinerary(
          isPremium,
          itinerary,
          tripInput,
        );
        return dailyItinerary;
      }),
    );

    const trip = await ctx.prisma.trip.create({
      data: {
        budget: budget,
        endDate: new Date(tripInput.endDate),
        startDate: new Date(tripInput.startDate),
        destination: destination,
        title: title,
        travelSize: travelSize,
        travelerCount: travelerCount,
        isAccommodationIncluded: isAccommodationIncluded,
        isFoodIncluded: isFoodIncluded,
        isTransportationIncluded: isTransportationIncluded,
        startingLocation: tripInput.startingLocation,
        timeSlots: tripInput.timeSlots as [number, number][],
        tripPreference: isPremium
          ? {
              create: {
                accommodationType: tripPreferenceInput.accommodationType,
                activities: tripPreferenceInput.activities,
                amenities: tripPreferenceInput.amenities,
                cuisines: tripPreferenceInput.cuisines,
                diningStyles: tripPreferenceInput.diningStyles,
              },
            }
          : undefined,
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

    if (trip && !isPremium) {
      await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          tripCount: {
            increment: 1,
          },
        },
      });
    }

    return trip;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

export const deleteTrip = async (id: number, ctx: Context) => {
  try {
    const trip = await ctx.prisma.trip.findUnique({
      where: {
        id: id,
      },
      include: {
        tripPreference: true,
      },
    });

    if (trip?.tripPreference) {
      await ctx.prisma.tripPreference.delete({
        where: {
          tripId: id,
        },
      });
    }

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
  } catch (error) {
    console.log(error);
  }
};

export const regenerateTrip = async (
  isPremium: boolean,
  id: number,
  ctx: Context,
) => {
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

    const trip = await ctx.prisma.trip
      .findUnique({
        where: {
          id: id,
        },
        include: {
          tripPreference: true,
        },
      })
      .then((trip) => {
        if (!trip) throw new Error('Trip not found');
        return trip;
      });

    const duration = tripDuration(trip.startDate, trip.endDate);

    const desiredTravelHours = JSON.parse(JSON.stringify(trip.timeSlots)).map(
      (time: [number, number]) => getDesiredTravelHour(time),
    ) as number[];

    const filteredPois = contentBasedFiltering(
      pois,
      trip.tripPreference as Preference,
      true,
    );

    console.log(filteredPois.length);

    const suggestedItineraries = await generateItinerary(
      isPremium,
      trip,
      filteredPois,
      duration,
      desiredTravelHours,
    );

    const dailyItineraries = await Promise.all(
      assignAccommodation(
        suggestedItineraries,
        trip,
        filteredPois,
        duration,
      ).map(async (itinerary) => {
        const dailyItinerary = await createDailyItinerary(
          isPremium,
          itinerary,
          trip,
        );
        return dailyItinerary;
      }),
    );

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

    return await ctx.prisma.trip.update({
      where: {
        id: id,
      },
      data: {
        dailyItineraries: {
          create: dailyItineraries.map((dailyItinerary, index) => ({
            dayIndex: index,
            accommodationCost: dailyItinerary.chrom.accommodationCost(),
            foodCost: multiplyRangeByPeople(
              dailyItinerary.chrom.foodCostRange(),
              trip?.travelerCount,
            ),
            attractionCost:
              dailyItinerary.chrom.attractionCost() * trip?.travelerCount,
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
      },
    });
  } catch (error) {
    console.error('Error regenerating trip:', error);
    throw error;
  }
};
