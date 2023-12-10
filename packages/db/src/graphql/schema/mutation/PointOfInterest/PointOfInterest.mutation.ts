import { mutationField, nonNull, stringArg } from 'nexus';

import { createPoi, deletePoi } from './PointOfInterest.resolver';

export const CreatePoi = mutationField('createPoi', {
  type: 'Poi',
  args: {
    type: nonNull(stringArg()),
    userId: nonNull(stringArg()),
    input: nonNull('CreatePoiInput'),
  },
  resolve: (_, args, ctx) => createPoi(args.type, args.userId, args.input, ctx),
});

export const DeletePoi = mutationField('deletePoi', {
  type: 'Poi',
  args: {
    poiId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => deletePoi(args.poiId, ctx),
});
