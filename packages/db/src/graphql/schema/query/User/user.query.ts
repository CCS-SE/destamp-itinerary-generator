import { list, nonNull, queryField, stringArg } from 'nexus';

import {
  queryTravelerAccount,
  queryUnclaimedStamps,
  queryUser,
  queryUserPois,
} from './user.resolver';

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

const Account = queryField('travelerAccount', {
  type: 'Account',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => queryTravelerAccount(args.id, ctx),
});

const UserPois = queryField('userPois', {
  type: nonNull(list('Poi')),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => queryUserPois(args.userId, ctx),
});

export default [User, UnclaimedStamps, Account, UserPois];
