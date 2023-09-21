import { intArg, nonNull, queryField } from 'nexus';

import { queryTrip } from './trip.resolver';

const Trip = queryField('trip', {
  type: 'Trip',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => queryTrip(args.id, ctx),
});

export default [Trip];
