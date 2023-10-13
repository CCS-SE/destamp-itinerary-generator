import { gql } from '@apollo/client';

export const GetBusinessDetailsQuery = gql(
  `query GetBusinessDetails($placeId: String!){
        place(placeId: $placeId) {
          name
          address
          contactNumber
          description
          website
          categories {
            id
            name
          }
          price
          images {
            url
          }
          openingHours {
            closeTime
            day
            openTime
      
          }
          amenities {
            id
            name
          }
          diningAtmospheres {
            id
            name
          }
          diningCuisines {
            id
            name
          }
          diningOfferings {
            id
            name
          }
          diningOptions {
            id
            name
          }
          visitDuration
        } 
      }
  `,
);

export const GetBusinessListQuery = gql(
  `query GetBusinessList($placeId: String!) {
      place(placeId: $placeId) {
        name
        address
      }
    }`,
);
