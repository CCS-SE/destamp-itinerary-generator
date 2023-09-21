import { Context } from '../../../context';

export const queryAllPlaces = async (ctx: Context) => {
  return await ctx.prisma.place.findMany();
};
