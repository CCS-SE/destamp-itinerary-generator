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

export const ClaimStamp = gql(
  `mutation ClaimStamp($userId: String!, $stampId: Int!) {
    claimStamp(userId: $userId, stampId: $stampId) {
      id
    }
  }`,
);
