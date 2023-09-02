import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import { mutationField, nonNull } from 'nexus';

import CreateUserInput from '../../input/User.input';
import { createUser } from './User.resolver';

export const CreateUser = mutationField('createUser', {
  type: 'User',
  args: {
    data: nonNull(CreateUserInput),
  },
  validate: async (_, args, context) => {
    const { email } = args.data;

    // check if email already exist
    const existingUser = await context.prisma.user.findFirst({
      where: {
        email: email as string,
      },
    });

    // throw error if user exists
    if (existingUser) {
      throw new GraphQLError('Email is already taken.', {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      });
    }
  },
  resolve: (_, args, context) => createUser(args.data, context),
});
