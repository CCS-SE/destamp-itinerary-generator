import { Context } from '../../../context';

export const queryTravelerTrips = async (userId: string, ctx: Context) => {
  return await ctx.prisma.trip.findMany({
    where: {
      traveler: {
        userId: userId,
      },
    },
  });
};
