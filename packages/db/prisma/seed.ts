import { PrismaClient, TravelSize } from '@prisma/client';
import { faker } from '@faker-js/faker';

const db = new PrismaClient();

const getRandomInt = (max: number, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const clearDb = async () => {
  await db.trip.count().then(async (count) => {
    if (count > 1) {
      await db.trip.deleteMany();
    }
  });
};

const createDestination = async (count: number) => {
  const { location, image } = faker;

  const trips = await db.trip.findMany({ select: { id: true } });
  const tripIds = trips.map((trip) => trip.id);

  for (let i = 0; i < count; i++) {
    const randomTrip = tripIds[getRandomInt(tripIds.length)];

    await db.trip.update({
      where: {
        id: randomTrip
      },
      data: {
        destination: {
          create: {
            name: location.city(),
            image: {
              create: {
                url: image.url()
              }
            }
          }
        }
      },
    });
  }
};

const createTrip = async (count: number) => {
  const { word, finance, date } = faker;
  const travelSize = Object.values(TravelSize);

  for (let i = 0; i < count; i++) {
    const startDate = date.between({ from: '2023-08-20', to: '2023-08-31' });
    const endDate = date.between({ from: startDate, to: '2023-09-01' });
    const randomTravelSize = travelSize[getRandomInt(travelSize.length)];

    await db.trip.create({
      data: {
        budget: parseInt(finance.amount()),
        endDate: endDate,
        startDate: startDate,
        title: `${word.noun()} trip`,
        travelSize: randomTravelSize!,
      },
    });
  }
};

clearDb()
  .then(() => createTrip(20))
  .then(() => createDestination(20))
  .catch((err) => console.log(err));
