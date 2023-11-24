import { list, nonNull, queryField, stringArg } from 'nexus';

import { queryPoi, queryPois } from './poi.resolver';

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

export default [Poi, Pois];
