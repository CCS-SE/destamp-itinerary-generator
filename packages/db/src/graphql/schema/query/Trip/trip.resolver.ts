import { Context } from '../../../context';

export const queryTrip = (id: number, ctx: Context) => {
  return ctx.prisma.trip.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
};
