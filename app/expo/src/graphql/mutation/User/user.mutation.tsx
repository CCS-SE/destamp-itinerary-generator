import { gql } from '@apollo/client';

export const CreateUser = gql(
  `mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }`,
);
