import { intArg, mutationField, nonNull } from 'nexus';

import CreateDepartingLocationInput from '../../input/DepartingLocation.input';
import CreateTripInput from '../../input/Trip.input';
import { createTrip, deleteTrip } from './Trip.resolver';

export const CreateTrip = mutationField('createTrip', {
  type: 'Trip',
  args: {
    data: nonNull(CreateTripInput),
    locationData: nonNull(CreateDepartingLocationInput),
  },
  resolve: (_, args, ctx) => createTrip(args.data, args.locationData, ctx),
});

export const DeleteTrip = mutationField('deleteTrip', {
  type: 'Trip',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => deleteTrip(args.id, ctx),
});
