import { list, objectType } from 'nexus';

const ItineraryDay = objectType({
  name: 'ItineraryDay',
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
        return ctx.prisma.itineraryDay
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

export default ItineraryDay;
