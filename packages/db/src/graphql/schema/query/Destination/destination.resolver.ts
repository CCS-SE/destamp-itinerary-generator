import { Context } from '../../../context';

export const queryDestinations = (ctx: Context) => {
  return ctx.prisma.destination.findMany();
};
