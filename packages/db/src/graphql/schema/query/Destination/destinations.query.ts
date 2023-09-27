import { list, nonNull, queryField } from 'nexus';

import { queryDestinations } from './destination.resolver';

const Destination = queryField('destinations', {
  type: list(nonNull('Destination')),
  resolve: (_, __, ctx) => queryDestinations(ctx),
});

export default [Destination];
