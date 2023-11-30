import { list, nonNull, queryField, stringArg } from 'nexus';

import {
  queryAllAmenities,
  queryAllCategories,
  queryPoi,
  queryPois,
} from './poi.resolver';

const Poi = queryField('poi', {
  type: nonNull('Poi'),
  args: {
    poiId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx, info) => queryPoi(args.poiId, ctx, info),
});

const Pois = queryField('pois', {
  type: nonNull(list('Poi')),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx, info) => queryPois(args.userId, ctx, info),
});

const Categories = queryField('categories', {
  type: nonNull(list('Category')),
  resolve: (_, __, ctx) => queryAllCategories(ctx),
});

const Amenities = queryField('amenities', {
  type: nonNull(list('Amenity')),
  resolve: (_, __, ctx) => queryAllAmenities(ctx),
});

export default [Poi, Pois, Categories, Amenities];
