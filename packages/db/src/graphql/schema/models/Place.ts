import { list, objectType } from 'nexus';

import { PlaceType } from '../enum';

const Place = objectType({
  name: 'Place',
  definition(t) {
    t.string('id');
    t.nullable.int('businessOwnerId');
    t.string('name');
    t.nullable.string('description');
    t.string('address');
    t.string('price');
    t.field('type', { type: PlaceType });
    t.nullable.string('contactNumber');
    t.float('latitude');
    t.float('longitude');
    t.float('visitDuration');
    t.nullable.string('url');
    t.nullable.string('website');
    t.boolean('isClaimed');
    t.field('images', {
      type: list('Image'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.place
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .images();
      },
    });
    t.field('categories', {
      type: list('Category'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.place
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .categories();
      },
    });
    t.field('openingHours', {
      type: list('OpeningHour'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.place
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .openingHours();
      },
    });
    t.field('diningAtmospheres', {
      type: list('DiningAtmosphere'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.place
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .diningAtmospheres();
      },
    });
    t.field('diningCuisines', {
      type: list('DiningCuisine'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.place
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .diningCuisines();
      },
    });
    t.field('diningOfferings', {
      type: list('DiningOffering'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.place
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .diningOfferings();
      },
    });
    t.field('diningOptions', {
      type: list('DiningOption'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.place
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .diningOptions();
      },
    });
    t.field('amenities', {
      type: list('Amenity'),
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.place
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .amenities();
      },
    });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Place;
