import { GraphQLResolveInfo } from 'graphql';

import { Context } from '../../../context';
import getFieldsFromInfo from '../../../info';

export const queryTrip = (
  id: number,
  ctx: Context,
  info: GraphQLResolveInfo,
) => {
  const includedFields = getFieldsFromInfo(info);

  try {
    return ctx.prisma.trip.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        ...includedFields,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching trip.');
  }
};

export const queryTrips = (
  userId: string,
  ctx: Context,
  info: GraphQLResolveInfo,
) => {
  const includedFields = getFieldsFromInfo(info);

  try {
    return ctx.prisma.trip.findMany({
      where: {
        userId: userId,
      },
      include: {
        ...includedFields,
      },
      orderBy: {
        startDate: 'asc',
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching trips.');
  }
};
