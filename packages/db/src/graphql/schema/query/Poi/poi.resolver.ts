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
    throw new Error('An error occurred while fetching point of interest.');
  }
};

export const queryAllCategories = (ctx: Context) => {
  return ctx.prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

export const queryAllAmenities = (ctx: Context) => {
  return ctx.prisma.amenity.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

export const queryRestaurantCategoriesMoreThanFive = async (ctx: Context) => {
  const categories = await ctx.prisma.category.findMany({
    where: {
      name: {
        notIn: [
          'Family restaurant',
          'Buffet restaurant',
          'Fast food restaurant',
          'Restaurant',
        ],
      },
    },
    include: {
      pois: {
        where: {
          isAttraction: false,
          restaurant: {
            isNot: null,
          },
          accommodation: {
            is: null,
          },
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return categories.filter((category) => category.pois.length >= 5);
};

export const queryRestaurantCategories = async (ctx: Context) => {
  return await ctx.prisma.category.findMany({
    where: {
      pois: {
        every: {
          restaurant: {
            isNot: null,
          },
          isAttraction: false,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export const queryAttractionCategories = async (ctx: Context) => {
  return await ctx.prisma.category.findMany({
    where: {
      pois: {
        every: {
          isAttraction: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export const queryAccommodationCategories = async (ctx: Context) => {
  return await ctx.prisma.category.findMany({
    where: {
      pois: {
        every: {
          isAttraction: false,
          accommodation: {
            isNot: null,
          },
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
};
