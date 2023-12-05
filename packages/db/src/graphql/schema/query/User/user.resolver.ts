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
