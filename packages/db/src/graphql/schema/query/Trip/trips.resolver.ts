import { Context } from '../../../context';

export const queryTrips = (ctx: Context) =>
  ctx.prisma.trip.findMany({
    orderBy: [
      {
        startDate: 'desc',
      },
    ],
  });