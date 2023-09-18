import { list, objectType } from 'nexus';

const Traveler = objectType({
  name: 'Traveler',
  definition(t) {
    t.int('id');
    t.nullable.string('firstName');
    t.nullable.string('lastName');
    t.nullable.string('contactNumber');
    t.field('trips', {
      type: list('Trip'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.traveler
          .findUniqueOrThrow({
            where: { id: id as number },
          })
          .trips();
      },
    });
  },
});

export default Traveler;
