import { intArg, nonNull, queryField, stringArg } from 'nexus';

import { queryStamp, queryUser } from './user.resolver';

const User = queryField('user', {
  type: 'User',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: (_, args, ctx, info) => queryUser(args.id, ctx, info),
});

const Stamp = queryField('stamp', {
  type: 'Stamp',
  args: {
    stampId: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => queryStamp(args.stampId, ctx),
});

const IsStampClaimed = queryField('isStampedClaimed', {
  type: 'Boolean',
  args: {
    userId: nonNull(stringArg()),
    stampId: nonNull(intArg()),
  },
  resolve: async (_, args, ctx) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: args.userId,
      },
      include: {
        stamps: {
          where: {
            id: args.stampId,
          },
        },
      },
    });

    const stamp = await ctx.prisma.stamp.findUnique({
      where: {
        id: args.stampId,
      },
    });

    const collectedStamp = user?.stamps.filter(
      (collectedStamp) => collectedStamp.id == stamp?.id,
    );

    return collectedStamp!.length >= 1 ? true : false;
  },
});

export default [User, Stamp, IsStampClaimed];
