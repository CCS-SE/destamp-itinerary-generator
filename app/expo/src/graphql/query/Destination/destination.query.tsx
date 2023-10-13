import { gql } from '@apollo/client';

export const GetDestinationsQuery = gql(
  `query GetDestinationsQuery {
        destinations {
          id
          name
        }
      }`,
);
