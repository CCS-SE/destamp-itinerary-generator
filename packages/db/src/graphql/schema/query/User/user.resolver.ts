import { SubscriptionStatus } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
import moment from 'moment';

import { Context } from '../../../context';
import getFieldsFromInfo from '../../../info';

const isValidId = (userId: string) => {
  if (typeof userId !== 'string') {
    return false;
  }
  return true;
};

export const queryUser = (
  id: string,
  ctx: Context,
  info: GraphQLResolveInfo,
) => {
  const includedFields = getFieldsFromInfo(info);

  try {
    if (!isValidId(id)) {
      throw new Error('Invalid User ID');
    }
    return ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        ...includedFields,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching user.');
  }
};

export const queryTravelerAccount = async (
  id: string,
  ctx: Context,
  info: GraphQLResolveInfo,
) => {
  const includedFields = getFieldsFromInfo(info);

  try {
    if (!isValidId(id)) {
      throw new Error('Invalid User ID');
    }
    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
        type: 'TRAVELER',
      },
      ...includedFields,
      include: {
        subscription: true,
      },
    });

    if (user) {
      const isPremium =
        user.subscription !== null &&
        user.subscription.status === SubscriptionStatus.ACTIVE;

      return { user: user, isPremium: isPremium };
    }
    return { user: null, isPremium: false };
  } catch (error) {
    console.error(error);
    return { user: null, isPremium: false };
  }
};

export const queryUnclaimedStamps = async (userId: string, ctx: Context) => {
  try {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        trips: {
          select: {
            destination: true,
            endDate: true,
          },
        },
        stamps: {
          select: {
            title: true,
          },
        },
      },
    });

    const unclaimedStamps = user?.trips
      .filter((trip) =>
        // get trips with end date is before current date
        moment(new Date(trip.endDate as Date)).isBefore(new Date()),
      )
      .map((trip) => trip.destination)
      .filter(
        (destination) =>
          // get destinations that are no stamps claimed yet
          !user?.stamps.map((stamp) => stamp.title).includes(destination),
      );

    // return unclaimed stamps
    return await ctx.prisma.stamp.findMany({
      where: {
        title: {
          in: unclaimedStamps,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching unclaimed stamps.');
  }
};
