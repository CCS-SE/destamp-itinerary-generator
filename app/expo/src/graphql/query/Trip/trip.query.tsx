import { gql } from '@apollo/client';

export const GetTravelerTripsQuery = gql(
  `query GetTravelerTrips($userId: String!) {
        travelerTrips(userId: $userId) {
          id
          title
          budget
          destination {
            name
            image {
              url
            }
          }
          travelSize
          startDate
          endDate
          adultCount
          childCount
        }
      }
  `,
);
