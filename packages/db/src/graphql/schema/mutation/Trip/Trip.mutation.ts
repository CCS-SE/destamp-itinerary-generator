import { intArg, mutationField, nonNull } from 'nexus';

import createTripInput from '../../input/Trip.input';
import { createTrip, deleteTrip } from './Trip.resolver';

export const CreateTrip = mutationField('createTrip', {
  type: 'Trip',
  args: {
    data: nonNull(createTripInput),
  },
  resolve: (_, args, ctx) => createTrip(args.data, ctx),
});

export const DeleteTrip = mutationField('deleteTrip', {
  type: 'Trip',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => deleteTrip(args.id, ctx),
});
