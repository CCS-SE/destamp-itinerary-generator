import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import { intArg, mutationField, nonNull, stringArg } from 'nexus';

import { claimStamp, createUser, editUser } from './User.resolver';

export const CreateUser = mutationField('createUser', {
  type: 'User',
  args: {
    input: nonNull('CreateUserInput'),
  },
  validate: async (_, args, context) => {
    const { email } = args.input;

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
  resolve: (_, args, context) => createUser(args.input, context),
});

export const EditUser = mutationField('editUser', {
  type: 'User',
  args: {
    userId: nonNull(stringArg()),
    input: nonNull('EditUserInput'),
  },
  resolve: (_, args, context) => editUser(args.userId, args.input, context),
});

export const ClaimStamp = mutationField('claimStamp', {
  type: 'User',
  args: {
    userId: nonNull(stringArg()),
    stampId: nonNull(intArg()),
  },
  validate: async (_, args, context) => {
    // check if user exists
    const user = await context.prisma.user.findUnique({
      where: { id: args.userId },
    });

    if (!user) {
      throw new GraphQLError('User does not exist.', {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      });
    }

    // check if stamp exists
    const stamp = await context.prisma.stamp.findUnique({
      where: { id: args.stampId },
    });

    if (!stamp) {
      throw new GraphQLError('Stamp does not exist.', {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
        },
      });
    }
  },

  resolve: (_, args, context) => claimStamp(args.userId, args.stampId, context),
});
