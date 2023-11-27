import { gql } from '@apollo/client';

export const CreateTrip = gql(
  `mutation CreateTrip($userId: String!, $data: CreateTripInput!) {
    createTrip(userId: $userId, data: $data) {
      id
    }
  }`,
);

export const DeleteTrip = gql(
  `mutation DeleteTrip($tripId: Int!) {
    deleteTrip(id: $tripId) {
      id
    }
  }
  `,
);
