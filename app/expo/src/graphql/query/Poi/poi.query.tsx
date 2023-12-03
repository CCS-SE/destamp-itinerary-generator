import { gql } from '@apollo/client';

export const GetPoiFeaturesQuery = gql(
  `query GetPoiFeatures {
    amenities {
      id
      name
    }
    restaurantCategoriesMoreThanFive {
      id
      name
    }
  }
  `,
);
