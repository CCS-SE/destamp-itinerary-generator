import { list, objectType } from 'nexus';

const Accommodation = objectType({
  name: 'Accommodation',
  definition(t) {
    t.int('id');
    t.string('poiId');
    t.field('amenities', {
      type: list('Amenity'),
      resolve: ({ id }, __, ctx) => {
        return ctx.prisma.accommodation
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .amenities();
      },
    });
  },
});

export default Accommodation;
