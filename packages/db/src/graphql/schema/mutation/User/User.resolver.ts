import bcrypt from 'bcrypt';

import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateUserInput = NexusGenInputs['CreateUserInput'];
type CreateTravelerInput = NexusGenInputs['CreateTravelerInput'];

export const createUser = async (
  userInput: CreateUserInput,
  travelerInput: CreateTravelerInput,
  ctx: Context,
) => {
  // encrypt user’s password
  const saltRounds = 10;
  const hashedPassword = (await bcrypt.hash(
    userInput.password,
    saltRounds,
  )) as string;

  return await ctx.prisma.user.create({
    data: {
      id: userInput.id,
      email: userInput.email,
      password: hashedPassword,
      userType: userInput.userType,
      traveler: {
        connectOrCreate: {
          create: {
            firstName: travelerInput.firstName as string,
            lastName: travelerInput.lastName as string,
          },
          where: {
            userId: userInput.id,
          },
        },
      },
    },
  });
};
