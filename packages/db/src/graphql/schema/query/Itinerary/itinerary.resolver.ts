import { Context } from '../../../context';

export const queryItinerary = (tripId: number, ctx: Context) => {
  return ctx.prisma.itinerary.findUniqueOrThrow({
    where: {
      tripId: tripId,
    },
  });
};
