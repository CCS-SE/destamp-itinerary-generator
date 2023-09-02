import bcrypt from 'bcrypt';

import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateUserInput = NexusGenInputs['CreateUserInput'];

export const createUser = async (args: CreateUserInput, ctx: Context) => {
  // encrypt user’s password
  const saltRounds = 10;
  const hashedPassword = (await bcrypt.hash(
    args.password,
    saltRounds,
  )) as string;

  return await ctx.prisma.user.create({
    data: {
      id: args.id,
      email: args.email,
      password: hashedPassword,
      userType: args.userType,
      traveler: {
        create: {}, // create a record of traveler
      },
    },
  });
};
