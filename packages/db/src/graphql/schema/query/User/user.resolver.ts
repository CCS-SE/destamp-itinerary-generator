import { GraphQLResolveInfo } from 'graphql';

import { Context } from '../../../context';
import getFieldsFromInfo from '../../../info';

const isValidId = (userId: string) => {
  if (typeof userId !== 'string') {
    return false;
  }
  return true;
};

export const queryUser = (
  id: string,
  ctx: Context,
  info: GraphQLResolveInfo,
) => {
  const includedFields = getFieldsFromInfo(info);

  try {
    if (!isValidId(id)) {
      throw new Error('Invalid User ID');
    }
    return ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        ...includedFields,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching user.');
  }
};

export const queryStamp = (stampId: number, ctx: Context) => {
  try {
    return ctx.prisma.stamp.findUniqueOrThrow({
      where: {
        id: stampId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching stamp.');
  }
};
