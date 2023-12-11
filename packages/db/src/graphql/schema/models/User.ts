import { objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('email');
    t.string('password');
    t.string('firstName');
    t.string('lastName');
    t.int('tripCount');
    t.field('type', { type: 'UserType' });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
    t.list.field('trips', {
      type: 'Trip',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.user
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .trips();
      },
    });
    t.list.field('pois', {
      type: 'Poi',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.user
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .pois();
      },
    });
    t.list.field('stamps', {
      type: 'Stamp',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.user
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
        return ctx.prisma.user
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

export default User;
