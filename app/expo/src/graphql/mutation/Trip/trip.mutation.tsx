import { gql } from '@apollo/client';

export const CreateTrip = gql(
  `mutation CreateTrip($data: CreateTripInput!, $locationData: CreateDepartingLocationInput!) {
        createTrip(data: $data, locationData: $locationData) {
          id
          itinerary {
            id
            dailyItineraries {
              id
              destinations {
                id
              }
            }
          }
        }
      }`,
);

export const DeleteTrip = gql(
  `mutation DeleteTrip($deleteTripId: Int!) {
        deleteTrip(id: $deleteTripId) {
          id
          title
        }
      }`,
);
