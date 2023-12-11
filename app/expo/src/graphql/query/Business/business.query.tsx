import { gql } from '@apollo/client';

export const GetBusinessesQuery = gql(
  `query GetBusinesses($userId: String!) {
    pois(userId: $userId) {
      id
      name
      address
      images {
        image {
          id
          url
        }
      }
      businessPermit {
        id
        isVerified
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
      operatingHours {
        id
        day
        closeTime
        openTime
        isClosed
        is24Hours
      }
    }
  }  
  `,
);

export const GetCategoryListQuery = gql(
  `query GetAllCategories {
    categories {
      id
      name
    }
  }
`,
);
