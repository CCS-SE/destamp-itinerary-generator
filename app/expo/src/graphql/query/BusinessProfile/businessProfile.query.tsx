import { gql } from '@apollo/client';

export const GetBusinessInformationQuery = gql(
  `query GetBusinessInformation($placeId: String!){
    place(placeId: $placeId) {
    name
    address
    contactNumber
    description
    website
    type
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
  }`,
);

export const GetBusinessListQuery = gql(
  `query GetBusinessList($placeId: String!) {
      place(placeId: $placeId) {
        id
        name
        address
        images {
          url
        }
      }
    }`,
);
