import { mutationField, nonNull, stringArg } from 'nexus';

import { createPoi } from './PointOfInterest.resolver';

export const CreatePoi = mutationField('createMutation', {
  type: 'Poi',
  args: {
    userId: nonNull(stringArg()),
    input: nonNull('CreatePoiInput'),
  },
  resolve: (_, args, ctx) => createPoi(args.userId, args.input, ctx),
});
