import { objectType } from 'nexus';

const PoiImage = objectType({
  name: 'PoiImage',
  definition(t) {
    t.int('id');
    t.string('imageId');
    t.string('poiId');
    t.field('image', {
      type: 'Image',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.poiImage
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

export default PoiImage;
