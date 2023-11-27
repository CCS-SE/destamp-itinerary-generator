import { gql } from '@apollo/client';

export const GetUserInfoQuery = gql(
  `query GetUserInfo($userId: String!) {
    user(id: $userId) {
      id
      email
      firstName
      lastName
    }
  } `,
);
