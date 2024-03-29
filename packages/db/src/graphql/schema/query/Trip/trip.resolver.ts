import { GraphQLResolveInfo } from 'graphql';

import { Context } from '../../../context';
import getFieldsFromInfo from '../../../info';

export const queryTrip = async (
  id: number,
  ctx: Context,
  info: GraphQLResolveInfo,
) => {
  const includedFields = getFieldsFromInfo(info);

  try {
    const trip = await ctx.prisma.trip.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        ...includedFields,
        traveler: true,
      },
    });

    if (ctx.userId !== trip.traveler.userId) {
      throw new Error('Unauthorized access.');
    }

    return trip;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching trip.');
  }
};

export const queryTrips = (userId: string, ctx: Context) => {
  try {
    if (ctx.userId !== userId) {
      throw new Error('Unauthorized access.');
    }

    return ctx.prisma.trip.findMany({
      where: {
        traveler: {
          userId: userId,
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching trips.');
  }
};
