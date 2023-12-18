import { gql } from '@apollo/client';

export const GetBusinessOperatorBusinessQuery = gql(
  `query GetBusinessOperatorBusiness($userId: String!) {
    businessOperatorBusiness(userId: $userId) {
      isVerified
      poi {
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
      latitude
      longitude
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

export const GetPoiImagesQuery = gql(
  `query GetPoiImages($poiId: String!) {
    poi(poiId: $poiId) {
      images {
        image {
          url
        }
      }
      id
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
