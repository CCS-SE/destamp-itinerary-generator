import { intArg, mutationField, nonNull, stringArg } from 'nexus';

import { claimStamp } from './Traveler.resolver';

export const ClaimStamp = mutationField('claimStamp', {
  type: 'User',
  args: {
    userId: nonNull(stringArg()),
    stampId: nonNull(intArg()),
  },
  resolve: (_, args, context) => claimStamp(args.userId, args.stampId, context),
});
