import { list, objectType } from 'nexus';

const Itinerary = objectType({
  name: 'Itinerary',
  definition(t) {
    t.int('id');
    t.string('url');
    t.float('totalCost');
    t.float('totalDuration');
    t.field('dailyItineraries', {
      type: list('DailyItinerary'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.itinerary
          .findUniqueOrThrow({
            where: {
              id: id as number,
            },
          })
          .dailyItineraries();
      },
    });
    t.field('expenses', {
      type: list('Expense'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.itinerary
          .findUniqueOrThrow({
            where: {
              id: id as number,
            },
          })
          .expenses();
      },
    });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Itinerary;
