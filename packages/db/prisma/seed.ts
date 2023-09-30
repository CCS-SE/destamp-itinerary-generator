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
  if (timeString.toLowerCase() === 'open 24 hours') {
    // Handle "Open 24 hours" case
    return { hour: 0, minute: 0 }; // 24-hour format for midnight
  }

  const [time, period] = timeString.split(' ');

  const [hours, minutes] = time!.split(':');

  let hour = hours ? parseInt(hours, 10) : 0;
  let minute = minutes ? parseInt(minutes, 10) : 0;

  if (period === 'PM' && hour !== 12) {
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

const createDestination = async () => {
  await db.destination.create({
    data: {
      name: 'Iloilo City',
      image: {
        create: {
          url: 'https://www.allproperties.com.ph/wp-content/uploads/2022/01/House-and-Lot-for-sale-in-Iloilo-Photo-Credit-Scholarris20-scaled-1.jpg',
          name: 'iloilo-city',
        },
      },
    },
  });
};

const createAttractions = async () => {
  for (const attraction of attractions) {
    await db.place.create({
      data: {
        id: attraction.placeId,
        address: attraction.address,
        name: attraction.title,
        type: 'ATTRACTION',
        visitDuration: attraction.visitDuration,
        contactNumber: attraction.phone,
        description: attraction.description,
        price: attraction.price.toString(),
        latitude: attraction.location.lat,
        longitude: attraction.location.lng,
        isClaimed: false,
        images: {
          createMany: {
            data: attraction.imageUrls.map((url) => {
              return {
                url: url,
              };
            }),
          },
        },
        url: attraction.url,
        website: attraction.website,
        categories: {
          connectOrCreate: attraction.categories.map((cat) => ({
            where: { name: cat },
            create: { name: cat },
          })),
        },
        openingHours: {
          createMany: {
            data: (attraction.openingHours || []).map((openingHour) => {
              const [openingTime, closingTime] = openingHour.hours
                .split(' to ')
                .map(convertTo24HourFormat);

              const isClosed =
                openingHour.hours.trim().toLowerCase() === 'closed';

              return isClosed
                ? {
                    day: days[openingHour.day as Day],
                    closeTime: null,
                    openTime: null,
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
    });
  }
};

const createAccommodations = async () => {
  for (const accommodation of accommodations) {
    const dollarRate = 55;
    const priceNumeric = parseFloat(accommodation.price!.replace('$', ''));

    await db.place.create({
      data: {
        address: accommodation.address,
        latitude: accommodation.latitude,
        longitude: accommodation.longitude,
        name: accommodation.title,
        price: (priceNumeric * dollarRate).toString(),
        type: 'ACCOMMODATION',
        isClaimed: accommodation.isClaimed,
        categories: {
          connectOrCreate: accommodation.categories.map((cat) => ({
            where: { name: cat },
            create: { name: cat },
          })),
        },
        images: {
          createMany: {
            data: accommodation.imageUrls.map((url) => {
              return {
                url: url,
              };
            }),
          },
        },
        amenities: {
          connectOrCreate: accommodation.amenities.map((amenity) => ({
            where: { name: amenity },
            create: { name: amenity },
          })),
        },
        visitDuration: 24 * 60,
      },
    });
  }
};

const createRestaurants = async () => {
  for (const restaurant of restaurants) {
    await db.place.create({
      data: {
        address: restaurant.address,
        isClaimed: restaurant.isClaimed,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        name: restaurant.title,
        price: restaurant.price,
        type: 'RESTAURANT',
        visitDuration: 90,
        amenities: {
          connectOrCreate: restaurant.amenities.map((amenity) => ({
            where: {
              name: amenity,
            },
            create: {
              name: amenity,
            },
          })),
        },
        diningAtmospheres: {
          connectOrCreate: restaurant.diningAtmospheres.map((atmosphere) => ({
            where: {
              name: atmosphere,
            },
            create: {
              name: atmosphere,
            },
          })),
        },
        diningOfferings: {
          connectOrCreate: restaurant.diningOfferings.map((offering) => ({
            where: {
              name: offering,
            },
            create: {
              name: offering,
            },
          })),
        },
        diningOptions: {
          connectOrCreate: restaurant.diningOptions.map((option) => ({
            where: {
              name: option,
            },
            create: {
              name: option,
            },
          })),
        },
        images: {
          createMany: {
            data: restaurant.imageUrls.map((url) => {
              return {
                url: url,
              };
            }),
          },
        },
      },
    });
  }
};

clearDb()
  .then(() => createDestination())
  .then(() => createAttractions())
  .then(() => createAccommodations())
  .then(() => createRestaurants())
  .catch((err) => console.log(err));
