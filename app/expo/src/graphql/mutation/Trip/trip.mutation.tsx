import { gql } from '@apollo/client';

export const CreateTrip = gql(
  `mutation CreateTrip($userId: String!, $tripInput: CreateTripInput!, $tripPreferenceInput: CreateTripPreferenceInput!) {
    createTrip(userId: $userId, tripInput: $tripInput, tripPreferenceInput: $tripPreferenceInput) {
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
