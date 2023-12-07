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

export const GetPoiFacilitiesQuery = gql(
  `query GetPoiFacilities {
    restaurantCategoires {
      id
      name
    }
    attractionCategoires {
      id
      name
    }
    accommodationCategoires {
      id
      name
    }
    amenities {
      id
      name
    }
  }
  `,
);
