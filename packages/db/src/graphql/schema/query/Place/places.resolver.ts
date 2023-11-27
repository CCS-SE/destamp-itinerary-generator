import { Context } from '../../../context';

export const queryAllPlaces = async (ctx: Context) => {
  return await ctx.prisma.place.findMany();
};

export const queryPlace = (placeId: string, ctx: Context) => {
  return ctx.prisma.place.findUniqueOrThrow({
    where: {
      id: placeId,
    },
  });
};

export const queryAllCategories = (ctx: Context) => {
  return ctx.prisma.category.findMany();
};
