import { gql } from '@apollo/client';

export const GetAmenitiesQuery = gql(
  `query GetAmenities {
    amenities {
      id
      name
    }
  }
  `,
);
