import { list, nonNull, queryField } from 'nexus';

import { queryAllPlaces } from './places.resolver';

const Places = queryField('places', {
  type: nonNull(list('Place')),
  resolve: (_, __, ctx) => queryAllPlaces(ctx),
});

export default [Places];
