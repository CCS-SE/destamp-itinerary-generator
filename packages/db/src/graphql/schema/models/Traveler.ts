import { objectType } from 'nexus';

const Traveler = objectType({
  name: 'Traveler',
  definition(t) {
    t.string('id');
    t.string('userId');
    t.int('tripCount');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
    t.list.field('trips', {
      type: 'Trip',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.traveler
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .trips();
      },
    });
    t.list.field('stamps', {
      type: 'Stamp',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.traveler
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .stamps();
      },
    });
    t.nullable.field('subscription', {
      type: 'Subscription',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.traveler
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .subscription();
      },
    });
  },
});

export default Traveler;
