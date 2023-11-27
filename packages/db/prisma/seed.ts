import { PrismaClient } from '@prisma/client';
import set from 'date-fns/set';

import accommodations from './accommodationsv3.json';
import attractions from './attractions.json';
import restaurants from './restaurantsv3.json';

const db = new PrismaClient();

type Day =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';
type DayValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const days: Record<Day, DayValue> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const convertTo24HourFormat = (timeString: string) => {
  const [time, period] = timeString.split(' ');

  const [hours, minutes] = time!.split(':');

  let hour = hours ? parseInt(hours, 10) : 0;
  let minute = minutes ? parseInt(minutes, 10) : 0;

  if (period === 'PM' && hour < 12) {
    hour += 12;
  }

  return { hour, minute };
};

const clearDb = async () => {
  await db.trip.count().then(async (count) => {
    if (count > 1) {
      await db.trip.deleteMany();
    }
  });
};

const createAttractions = async () => {
  for (const attraction of attractions) {
    await db.pointOfInterest.create({
      data: {
        address: attraction.address,
        name: attraction.title,
        visitDuration: attraction.visitDuration,
        contactNumber: attraction.phone || '',
        description: attraction.description || '',
        price: attraction.price.toString(),
        latitude: attraction.location.lat,
        longitude: attraction.location.lng,
        isAttraction: true,
        poiImages: {
          create: attraction.imageUrls.map((url) => {
            return {
              image: {
                create: {
                  url: url,
                },
              },
            };
          }),
        },
        categories: {
          connectOrCreate: attraction.categories.map((cat) => ({
            where: { name: cat },
            create: { name: cat },
          })),
        },
        operatingHours: {
          createMany: {
            data: (attraction.openingHours || []).map((openingHour) => {
              const [openingTime, closingTime] = openingHour.hours
                .split(' to ')
                .map(convertTo24HourFormat);

              const isClosed =
                openingHour.hours.trim().toLowerCase() === 'closed';

              const is24Hours =
                openingHour.hours.trim().toLowerCase() === 'open 24 hours';

              return isClosed
                ? {
                    day: days[openingHour.day as Day],
                    closeTime: null,
                    openTime: null,
                    isClosed: true,
                  }
                : is24Hours
                ? {
                    day: days[openingHour.day as Day],
                    closeTime: null,
                    openTime: null,
                    is24Hours: true,
                  }
                : {
                    day: days[openingHour.day as Day],
                    closeTime: set(new Date(), {
                      hours: closingTime?.hour,
                      minutes: closingTime?.minute,
                    }),
                    openTime: set(new Date(), {
                      hours: openingTime?.hour,
                      minutes: openingTime?.minute,
                    }),
                  };
            }),
          },
        },
      },
      include: {
        accommodation: true,
        categories: true,
        poiImages: true,
        operatingHours: true,
        restaurant: true,
      },
    });
  }
};

const createAccommodations = async () => {
  for (const accommodation of accommodations) {
    const dollarRate = 55;
    const priceNumeric = parseFloat(accommodation.price!.replace('$', ''));

    await db.accommodation.create({
      data: {
        amenities: {
          connectOrCreate: accommodation.amenities.map((amenity) => ({
            where: { name: amenity },
            create: { name: amenity },
          })),
        },
        poi: {
          create: {
            address: accommodation.address,
            latitude: accommodation.latitude,
            longitude: accommodation.longitude,
            name: accommodation.title,
            price: (priceNumeric * dollarRate).toString(),
            contactNumber: accommodation.contctNumber || '',
            isAttraction: false,
            categories: {
              connectOrCreate: accommodation.categories.map((cat) => ({
                where: { name: cat },
                create: { name: cat },
              })),
            },
            poiImages: {
              create: accommodation.imageUrls.map((url) => {
                return {
                  image: {
                    create: {
                      url: url,
                    },
                  },
                };
              }),
            },
            visitDuration: 24 * 60,
          },
        },
      },
      include: {
        amenities: true,
      },
    });
  }
};

const createRestaurants = async () => {
  for (const restaurant of restaurants) {
    await db.restaurant.create({
      data: {
        atmospheres: {
          set: restaurant.diningAtmospheres,
        },
        poi: {
          create: {
            address: restaurant.address,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            name: restaurant.title,
            price: restaurant.price,
            visitDuration: restaurant.visitDuration || 90,
            contactNumber: restaurant.contctNumber || '',
            description: restaurant.description || '',
            isAttraction: false,
            categories: {
              connectOrCreate: restaurant.categories.map((cat) => ({
                where: { name: cat },
                create: { name: cat },
              })),
            },
            poiImages: {
              create: restaurant.imageUrls.map((url) => {
                return {
                  image: {
                    create: {
                      url: url,
                    },
                  },
                };
              }),
            },
            operatingHours: {
              createMany: {
                data: (restaurant.openingHours || []).map((openingHour) => {
                  const [openingTime, closingTime] = openingHour.hours
                    .split(' to ')
                    .map(convertTo24HourFormat);

                  const isClosed =
                    openingHour.hours.trim().toLowerCase() === 'closed';

                  const is24Hours =
                    openingHour.hours.trim().toLowerCase() === 'open 24 hours';

                  return isClosed
                    ? {
                        day: days[openingHour.day as Day],
                        closeTime: null,
                        openTime: null,
                        isClosed: true,
                      }
                    : is24Hours
                    ? {
                        day: days[openingHour.day as Day],
                        closeTime: null,
                        openTime: null,
                        is24Hours: true,
                      }
                    : {
                        day: days[openingHour.day as Day],
                        closeTime: set(new Date(), {
                          hours: closingTime?.hour,
                          minutes: closingTime?.minute,
                        }),
                        openTime: set(new Date(), {
                          hours: openingTime?.hour,
                          minutes: openingTime?.minute,
                        }),
                      };
                }),
              },
            },
          },
        },
      },
    });
  }
};

clearDb()
  .then(() => createAccommodations())
  .then(() => createRestaurants())
  .then(() => createAttractions())
  .catch((err) => console.log(err));
