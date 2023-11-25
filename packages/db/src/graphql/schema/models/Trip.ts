import { objectType } from 'nexus';

import { TravelSize } from '../enum';

const Trip = objectType({
  name: 'Trip',
  definition(t) {
    t.int('id');
    t.string('title');
    t.float('budget');
    t.field('travelSize', { type: TravelSize });
    t.int('travelerCount');
    t.boolean('isAccommodationIncluded');
    t.boolean('isFoodIncluded');
    t.boolean('isTransportationIncluded');
    t.field('startingLocation', { type: 'JSON' });
    t.field('timeSlots', { type: 'JSON' });
    t.field('startDate', { type: 'DateTime' });
    t.field('endDate', { type: 'DateTime' });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
    t.list.field('expenses', {
      type: 'Expense',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.trip
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .expenses();
      },
    });
    t.list.field('dailyItineraries', {
      type: 'DailyItinerary',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.trip
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .daily_itineraries()
          .then((item) => item.sort((a, b) => a.dayIndex - b.dayIndex));
      },
    });
  },
});

export default Trip;
