import { intArg, mutationField, nonNull, stringArg } from 'nexus';

import {
  cancelSubscription,
  claimStamp,
  subscribeToPremium,
} from './Traveler.resolver';

export const ClaimStamp = mutationField('claimStamp', {
  type: 'User',
  args: {
    userId: nonNull(stringArg()),
    stampId: nonNull(intArg()),
  },
  resolve: (_, args, context) => claimStamp(args.userId, args.stampId, context),
});

export const SubscribeToPremium = mutationField('subscribeToPremium', {
  type: 'Subscription',
  args: {
    userId: nonNull(stringArg()),
    input: nonNull('CreateSubscriptionInput'),
  },
  resolve: (_, args, context) =>
    subscribeToPremium(args.userId, args.input, context),
});

export const CancelSubscription = mutationField('cancelSubscription', {
  type: 'Subscription',
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: (_, args, context) => cancelSubscription(args.userId, context),
});
