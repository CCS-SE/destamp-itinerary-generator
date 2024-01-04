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

    if (ctx.userId !== id) {
      throw new Error('Unauthorized access.');
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

export const queryTravelerAccount = async (userId: string, ctx: Context) => {
  if (ctx.userId !== userId) {
    throw new Error('Unauthorized access.');
  }

  return await ctx.prisma.user
    .findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        traveler: {
          include: {
            subscription: true,
          },
        },
      },
    })
    .then((user) => {
      const isPremium =
        user.traveler?.subscription !== null &&
        user.traveler?.subscription.status === SubscriptionStatus.ACTIVE;

      return { user: user, isPremium: isPremium };
    });
};

export const queryUnclaimedStamps = async (userId: string, ctx: Context) => {
  try {
    if (ctx.userId !== userId) {
      throw new Error('Unauthorized access.');
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        traveler: {
          include: {
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
        },
      },
    });

    if (!user) {
      throw new Error('Sorry, no user found with given id.');
    }

    const unclaimedStamps = user?.traveler?.trips
      .filter((trip) =>
        // get trips with end date is before current date
        moment(new Date(trip.endDate as Date)).isBefore(new Date()),
      )
      .map((trip) => trip.destination)
      .filter(
        (destination) =>
          // get destinations that are no stamps claimed yet
          !user?.traveler?.stamps
            .map((stamp) => stamp.title)
            .includes(destination),
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

export const queryUserPois = async (userId: string, ctx: Context) => {
  try {
    if (ctx.userId !== userId) {
      throw new Error('Unauthorized access.');
    }

    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        pointOfInterests: true,
      },
    });

    if (!user) {
      throw new Error('Sorry, no user found with given id.');
    }

    return user.pointOfInterests;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching user pois.');
  }
};
