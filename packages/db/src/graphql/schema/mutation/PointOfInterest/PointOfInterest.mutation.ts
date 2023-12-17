import { mutationField, nonNull, stringArg } from 'nexus';

import { createPoi, deletePoi, editPoi } from './PointOfInterest.resolver';

export const CreatePoi = mutationField('createPoi', {
  type: 'Poi',
  args: {
    type: nonNull(stringArg()),
    userId: nonNull(stringArg()),
    input: nonNull('CreatePoiInput'),
  },
  resolve: (_, args, ctx) => createPoi(args.type, args.userId, args.input, ctx),
});

export const EditPoi = mutationField('editPoi', {
  type: 'Poi',
  args: {
    type: nonNull(stringArg()),
    poiId: nonNull(stringArg()),
    input: nonNull('EditPoiInput'),
  },
  resolve: (_, args, ctx) => editPoi(args.type, args.poiId, args.input, ctx),
});

export const DeletePoi = mutationField('deletePoi', {
  type: 'Poi',
  args: {
    poiId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => deletePoi(args.poiId, ctx),
});
