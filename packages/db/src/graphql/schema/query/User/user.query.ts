import { nonNull, queryField, stringArg } from 'nexus';

import { queryUser } from './user.resolver';

const User = queryField('user', {
  type: 'User',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => queryUser(args.id, ctx),
});

export default [User];
