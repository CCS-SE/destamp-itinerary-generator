import { intArg, mutationField, nonNull, stringArg } from 'nexus';

import { createTrip, deleteTrip } from './Trip.resolver';

export const CreateTrip = mutationField('createTrip', {
  type: 'Trip',
  args: {
    userId: nonNull(stringArg()),
    tripInput: nonNull('CreateTripInput'),
    tripPreferenceInput: nonNull('CreateTripPreferenceInput'),
  },
  resolve: (_, args, ctx) =>
    createTrip(args.userId, args.tripInput, args.tripPreferenceInput, ctx),
});

export const DeleteTrip = mutationField('deleteTrip', {
  type: 'Trip',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => deleteTrip(args.id, ctx),
});
