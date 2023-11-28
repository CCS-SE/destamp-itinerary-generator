import { mutationField, nonNull, stringArg } from 'nexus';

import { createPoi, deletePoi } from './PointOfInterest.resolver';

export const CreatePoi = mutationField('createMutation', {
  type: 'Poi',
  args: {
    userId: nonNull(stringArg()),
    input: nonNull('CreatePoiInput'),
  },
  resolve: (_, args, ctx) => createPoi(args.userId, args.input, ctx),
});

export const DeletePoi = mutationField('deletePoi', {
  type: 'Poi',
  args: {
    poiId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => deletePoi(args.poiId, ctx),
});
