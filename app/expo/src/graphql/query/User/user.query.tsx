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

export const GetStampQuery = gql(
  `query GetStamp($stampId: Int!) {
    stamp(stampId: $stampId) {
      id
      title
      dateCollected
      image {
        url
      }
    }
  }`,
);
