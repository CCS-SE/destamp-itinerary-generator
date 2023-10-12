import { gql } from '@apollo/client';

export const GetTravelerInfo = gql(
  `query GetTravelerInfo($userId: String!) {
      traveler(userId: $userId) {
        id
        firstName
        lastName
      }
    
      user(id: $userId) {
        email
      }
    }`,
);
