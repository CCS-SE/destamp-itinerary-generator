import { gql } from '@apollo/client';

export const deletePoi = gql(
  `mutation DeletePoi($poiId: String!) {
        deletePoi(poiId: $poiId) {
          id
        }
      }`,
);
