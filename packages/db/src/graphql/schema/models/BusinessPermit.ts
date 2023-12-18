import { objectType } from 'nexus';

const BusinessPermit = objectType({
  name: 'BusinessPermit',
  definition(t) {
    t.string('id');
    t.string('businessOperatorId');
    t.string('imageId');
    t.string('poiId');
    t.boolean('isVerified');
    t.field('image', {
      type: 'Image',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.businessPermit
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .image();
      },
    });
  },
});

export default BusinessPermit;
