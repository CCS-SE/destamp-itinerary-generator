import { intArg, list, nonNull, queryField, stringArg } from 'nexus';

import { queryTrip, queryTrips } from './trip.resolver';

const Trip = queryField('trip', {
  type: 'Trip',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, ctx, info) => queryTrip(args.id, ctx, info),
});

const Trips = queryField('trips', {
  type: nonNull(list('Trip')),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx, info) => queryTrips(args.userId, ctx, info),
});

export default [Trip, Trips];
