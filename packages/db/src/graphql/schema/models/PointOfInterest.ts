import { objectType } from 'nexus';

const PointOfInterest = objectType({
  name: 'Poi',
  definition(t) {
    t.string('id');
    t.nullable.string('userId');
    t.string('name');
    t.string('address');
    t.nullable.string('description');
    t.string('price');
    t.string('contactNumber');
    t.float('latitude');
    t.float('longitude');
    t.float('visitDuration');
    t.boolean('isAttraction');
    t.boolean('isVerified');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
    t.list.field('categories', {
      type: 'Category',
      resolve: ({ id }, __, ctx) => {
        return ctx.prisma.pointOfInterest
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .categories();
      },
    });
    t.list.field('operatingHours', {
      type: 'OperatingHour',
      resolve: ({ id }, __, ctx) => {
        return ctx.prisma.pointOfInterest
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .operatingHours()
          .then((item) => item.sort((a, b) => a.day - b.day));
      },
    });
    t.list.field('images', {
      type: 'PoiImage',
      resolve: ({ id }, __, ctx) => {
        return ctx.prisma.pointOfInterest
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .poiImages();
      },
    });
    t.nullable.field('restaurant', {
      type: 'Restaurant',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.pointOfInterest
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .restaurant();
      },
    });
    t.nullable.field('accommodation', {
      type: 'Accommodation',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.pointOfInterest
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .accommodation();
      },
    });
  },
});

export default PointOfInterest;
