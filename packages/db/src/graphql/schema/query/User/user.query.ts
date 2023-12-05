import { list, nonNull, queryField, stringArg } from 'nexus';

import { queryUnclaimedStamps, queryUser } from './user.resolver';

const User = queryField('user', {
  type: 'User',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: (_, args, ctx, info) => queryUser(args.id, ctx, info),
});

const UnclaimedStamps = queryField('unclaimedStamps', {
  type: list('Stamp'),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => queryUnclaimedStamps(args.userId, ctx),
});

export default [User, UnclaimedStamps];
