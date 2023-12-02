import { gql } from '@apollo/client';

export const CreateUser = gql(
  `mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }`,
);

export const EditUser = gql(
  `mutation EditUser($userId: String!, $input: EditUserInput!) {
    editUser(userId: $userId, input: $input) {
      id
    }
  }`,
);
