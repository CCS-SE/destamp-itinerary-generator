import { objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('email');
    t.string('password');
    t.string('firstName');
    t.string('lastName');
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
  },
});

export default User;
