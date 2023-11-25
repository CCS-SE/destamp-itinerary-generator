import { gql } from '@apollo/client';

export const GetBusinessesQuery = gql(
  `query GetBusinesses($userId: String!) {
    user(id: $userId) {
      pois {
        id
        name
        address
        images {
          image {
            id
            url
          }
        }
      }
    }
  }  
  `,
);

export const GetBusinessDetailsQuery = gql(
  `query GetBusinessDetails($poiId: String!) {
    poi(poiId: $poiId) {
      id
      name
      address
      contactNumber
      description
      price
      visitDuration
      accommodation {
        id
        amenities {
          name
        }
      }
      restaurant {
        id
        atmospheres
      }
      categories {
        name
      }
      images {
        image {
          id
          url
        }
      }
      operatingHours {
        id
        day
        closeTime
        openTime
      }
    }
  }  
  `,
);
