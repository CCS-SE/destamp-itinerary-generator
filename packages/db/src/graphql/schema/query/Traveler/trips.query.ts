import { list, nonNull, queryField, stringArg } from 'nexus';

import { queryTravelerTrips } from './trips.resolver';

const TravelerTrips = queryField('travelerTrips', {
  type: nonNull(list('Trip')),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => queryTravelerTrips(args.userId, ctx),
});

export default [TravelerTrips];
