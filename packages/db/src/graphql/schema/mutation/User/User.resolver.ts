import bcrypt from 'bcrypt';

import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateUserInput = NexusGenInputs['CreateUserInput'];

export const createUser = async (input: CreateUserInput, ctx: Context) => {
  // encrypt user’s password
  const saltRounds = 10;
  const hashedPassword = (await bcrypt.hash(
    input.password,
    saltRounds,
  )) as string;

  return await ctx.prisma.user.create({
    data: {
      id: input.id,
      email: input.email,
      password: hashedPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      type: input.type,
    },
  });
};
