import { intArg, mutationField, nonNull, stringArg } from 'nexus';

import { createTrip, createTripPreference, deleteTrip } from './Trip.resolver';

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

export const CreateTripPreference = mutationField('createTripPreference', {
  type: 'TripPreference',
  args: {
    tripId: nonNull(intArg()),
    input: nonNull('CreateTripPreferenceInput'),
  },
  resolve: (_, args, ctx) => createTripPreference(args.tripId, args.input, ctx),
});
