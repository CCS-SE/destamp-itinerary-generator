import { intArg, mutationField, nonNull, stringArg } from 'nexus';

import { createTrip, deleteTrip } from './Trip.resolver';

export const CreateTrip = mutationField('createTrip', {
  type: 'Trip',
  args: {
    userId: nonNull(stringArg()),
    data: nonNull('CreateTripInput'),
  },
  resolve: (_, args, ctx) => createTrip(args.userId, args.data, ctx),
});

export const DeleteTrip = mutationField('deleteTrip', {
  type: 'Trip',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => deleteTrip(args.id, ctx),
});
