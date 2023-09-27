import { list, objectType } from 'nexus';

const DailyItinerary = objectType({
  name: 'DailyItinerary',
  definition(t) {
    t.int('id');
    t.float('accommodationCost');
    t.float('foodCost');
    t.float('attractionCost');
    t.float('transportationCost');
    t.int('dayIndex');
    t.field('destinations', {
      type: list('Place'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.dailyItinerary
          .findUniqueOrThrow({
            where: {
              id: id as number,
            },
          })
          .destinations();
      },
    });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default DailyItinerary;
