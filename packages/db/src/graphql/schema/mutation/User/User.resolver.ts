import bcrypt from 'bcrypt';

import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateUserInput = NexusGenInputs['CreateUserInput'];
type EditUserInput = NexusGenInputs['EditUserInput'];

export const createUser = async (
  type: string,
  input: CreateUserInput,
  ctx: Context,
) => {
  // encrypt user’s password
  const saltRounds = 10;
  const hashedPassword = (await bcrypt.hash(
    input.password,
    saltRounds,
  )) as string;

  const user = await ctx.prisma.user.create({
    data: {
      id: input.id,
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
    },
  });

  let userTypePromise;
  if (type === 'TRAVELER') {
    userTypePromise = ctx.prisma.traveler.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  if (userTypePromise) {
    await userTypePromise;
  }

  return user;
};

export const editUser = async (
  userId: string,
  input: EditUserInput,
  ctx: Context,
) => {
  return await ctx.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: input.firstName as string,
      lastName: input.lastName as string,
    },
  });
};
