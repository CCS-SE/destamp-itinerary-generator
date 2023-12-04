import { gql } from '@apollo/client';

export const GetUserInfoQuery = gql(
  `query GetUserInfo($userId: String!) {
    user(id: $userId) {
      id
      email
      firstName
      lastName
      stamps {
        id
        title
        dateCollected
        image {
          url
        }
      }
    }
  } `,
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
  }`,
);
