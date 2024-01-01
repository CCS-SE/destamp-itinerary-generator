import { objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('email');
    t.string('password');
    t.string('firstName');
    t.string('lastName');
    t.boolean('isBusinessOperator');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
    t.nullable.field('traveler', {
      type: 'Traveler',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.user
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .traveler();
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
          .pointOfInterests();
      },
    });
  },
});

export default User;
