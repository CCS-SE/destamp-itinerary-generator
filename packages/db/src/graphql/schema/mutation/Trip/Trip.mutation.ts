import { mutationField, nonNull } from 'nexus';

import createTripInput from '../../input/Trip.input';
import { createTrip } from './Trip.resolver';

export const CreateTrip = mutationField('createTrip', {
  type: 'Trip',
  args: {
    data: nonNull(createTripInput),
  },
  resolve: (_, args, ctx) => createTrip(args.data, ctx),
});
