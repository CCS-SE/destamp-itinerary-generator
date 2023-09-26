import { list, nonNull, queryField, stringArg } from 'nexus';

import { queryAllPlaces, queryPlace } from './places.resolver';

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

export default [Places, Place];
