import { gql } from '@apollo/client';

export const GetOperatorInfoQuery = gql(
  `query GetOperatorInfo($userId: String!) {
    user(id: $userId) {
      id
      email
      firstName
      lastName
    }
  }
   `,
);

export const GetTravelerInfoQuery = gql(
  `query GetTravelerInfo($userId: String!) {
    user(id: $userId) {
      id
      email
      firstName
      lastName
      traveler {
        stamps {
          id
          title
          image {
            url
          }
        }
      }
    }
  }
   `,
);

export const GetUnclaimedStampsQuery = gql(
  `query GetUnclaimedStamps($userId: String!) {
    unclaimedStamps(userId: $userId) {
      id
      title
      image {
        id
        url
      }
    }
  }
  `,
);
