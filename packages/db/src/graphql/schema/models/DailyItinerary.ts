import { objectType } from 'nexus';

const DailyItinerary = objectType({
  name: 'DailyItinerary',
  definition(t) {
    t.int('id');
    t.float('accommodationCost');
    t.string('foodCost');
    t.float('attractionCost');
    t.float('transportationCost');
    t.int('dayIndex');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
    t.list.field('dailyItineraryPois', {
      type: 'DailyItineraryPoi',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.dailyItinerary
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .dailyItineraryPois()
          .then((items) => items.sort((a, b) => a.order - b.order));
      },
    });
  },
});

export default DailyItinerary;
