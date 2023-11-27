import { list, nonNull, queryField, stringArg } from 'nexus';

import {
  queryAllCategories,
  queryAllPlaces,
  queryPlace,
} from './places.resolver';

const Places = queryField('places', {
  type: nonNull(list('Place')),
  resolve: (_, __, ctx) => queryAllPlaces(ctx),
});

const Place = queryField('place', {
  type: nonNull('Place'),
  args: {
    placeId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => queryPlace(args.placeId, ctx),
});

const Category = queryField('categories', {
  type: nonNull(list('Category')),
  resolve: (_, __, ctx) => queryAllCategories(ctx),
});

export default [Places, Place, Category];
