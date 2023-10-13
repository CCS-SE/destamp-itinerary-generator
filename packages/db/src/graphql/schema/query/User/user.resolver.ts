import { Context } from '../../../context';

export const queryUser = (id: string, ctx: Context) => {
  return ctx.prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
};
