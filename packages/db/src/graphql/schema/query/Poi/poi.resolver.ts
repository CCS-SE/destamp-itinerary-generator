import { GraphQLResolveInfo } from 'graphql';

import { Context } from '../../../context';
import getFieldsFromInfo from '../../../info';

const isValidId = (poiId: string) => {
  if (typeof poiId !== 'string') {
    return false;
  }
  return true;
};

export const queryPoi = async (
  poiId: string,
  ctx: Context,
  info: GraphQLResolveInfo,
) => {
  const includedFields = getFieldsFromInfo(info);
  try {
    if (!isValidId(poiId)) {
      throw new Error('Invalid POI ID');
    }

    return await ctx.prisma.pointOfInterest.findUniqueOrThrow({
      where: {
        id: poiId,
      },
      include: {
        ...includedFields,
      },
    });
  } catch (error) {
    throw new Error('An error occurred while fetching point interest.');
  }
};

export const queryPois = async (
  userId: string,
  ctx: Context,
  info: GraphQLResolveInfo,
) => {
  const includedFields = getFieldsFromInfo(info);
  try {
    if (!isValidId(userId)) {
      throw new Error('Invalid User ID');
    }

    return await ctx.prisma.pointOfInterest.findMany({
      where: {
        userId: userId,
      },
      include: {
        ...includedFields,
      },
    });
  } catch (error) {
    throw new Error('An error occurred while fetching point of interests.');
  }
};

export const queryAllCategories = (ctx: Context) => {
  return ctx.prisma.category.findMany();
};
