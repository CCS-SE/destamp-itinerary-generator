import { list, nullable, objectType } from 'nexus';

const Traveler = objectType({
  name: 'Traveler',
  definition(t) {
    t.int('id');
    t.nullable.string('firstName');
    t.nullable.string('lastName');
    t.nullable.string('contactNumber');
    t.nullable.field('image', {
      type: nullable('Image'),
      resolve: (parent, _, ctx) => {
        return ctx.prisma.destination
          .findUnique({ where: { id: parent.id as number } })
          .image();
      },
    });
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
