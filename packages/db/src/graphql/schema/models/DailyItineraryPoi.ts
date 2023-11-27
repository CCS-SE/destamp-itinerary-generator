import { objectType } from 'nexus';

const DailyItineraryPoi = objectType({
  name: 'DailyItineraryPoi',
  definition(t) {
    t.int('id');
    t.int('dailyItineraryId');
    t.int('order');
    t.float('distance');
    t.float('duration');
    t.field('poi', {
      type: 'Poi',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.dailyItineraryPoi
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .poi();
      },
    });
  },
});

export default DailyItineraryPoi;
