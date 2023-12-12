import { gql } from '@apollo/client';

export const CreateTrip = gql(
  `mutation CreateTrip($isPremium: Boolean!, $userId: String!, $tripInput: CreateTripInput!, $tripPreferenceInput: CreateTripPreferenceInput!) {
    createTrip(isPremium: $isPremium, userId: $userId, tripInput: $tripInput, tripPreferenceInput: $tripPreferenceInput) {
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

export const RegenerateTrip = gql(
  `mutation RegenerateTrip($isPremium: Boolean!, $regenerateTripId: Int!) {
    regenerateTrip(isPremium: $isPremium, id: $regenerateTripId) {
      id
    }
  }`,
);
