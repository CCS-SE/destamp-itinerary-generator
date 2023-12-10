import { gql } from '@apollo/client';

export const createPoi = gql(
  `mutation CreatePoi($type: String!, $userId: String!, $input: CreatePoiInput!) {
    createPoi(type: $type, userId: $userId, input: $input) {
      id
    }
  }`,
);

export const deletePoi = gql(
  `mutation DeletePoi($poiId: String!) {
        deletePoi(poiId: $poiId) {
          id
        }
      }`,
);
