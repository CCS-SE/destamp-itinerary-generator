import { objectType } from 'nexus';

const Stamp = objectType({
  name: 'Stamp',
  definition(t) {
    t.int('id');
    t.string('title');
    t.field('dateCollected', { type: 'DateTime' });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
    t.field('image', {
      type: 'Image',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.stamp
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

export default Stamp;
