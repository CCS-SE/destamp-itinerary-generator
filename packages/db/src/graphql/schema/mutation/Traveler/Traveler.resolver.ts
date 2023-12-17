import { Context } from '../../../context';

export const claimStamp = async (
  userId: string,
  stampId: number,
  ctx: Context,
) => {
  return await ctx.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      traveler: {
        update: {
          stamps: {
            connect: {
              id: stampId,
            },
          },
        },
      },
    },
  });
};
