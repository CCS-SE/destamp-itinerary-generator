import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateSubscriptionInput = NexusGenInputs['CreateSubscriptionInput'];

export const claimStamp = async (
  userId: string,
  stampId: number,
  ctx: Context,
) => {
  return await ctx.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      traveler: {
        update: {
          stamps: {
            connect: {
              id: stampId,
            },
          },
        },
      },
    },
  });
};

export const subscribeToPremium = async (
  userId: string,
  input: CreateSubscriptionInput,
  ctx: Context,
) => {
  const traveler = await ctx.prisma.traveler.findFirstOrThrow({
    where: {
      userId: userId,
    },
    include: {
      subscription: true,
    },
  });

  if (traveler.subscription) {
    return await ctx.prisma.subscription.update({
      where: {
        travelerId: traveler.id,
      },
      data: {
        amount: input.amount as number,
        startDate: input.startDate as Date,
        endDate: input.endDate as Date,
        status: 'ACTIVE',
      },
    });
  }

  return await ctx.prisma.subscription.create({
    data: {
      amount: input.amount as number,
      startDate: input.startDate as Date,
      endDate: input.endDate as Date,
      traveler: {
        connect: {
          id: traveler.id,
        },
      },
    },
  });
};

export const cancelSubscription = async (userId: string, ctx: Context) => {
  const traveler = await ctx.prisma.traveler.findFirstOrThrow({
    where: {
      userId: userId,
    },
  });
  return await ctx.prisma.subscription.update({
    where: {
      travelerId: traveler.id,
    },
    data: {
      status: 'CANCELLED',
    },
  });
};
