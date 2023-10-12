import { gql } from '@apollo/client';

export const GetTransactionsQuery = gql(
  `query GetTransactions($itineraryId: Int!){
        getTransaction(itineraryId: $itineraryId) {
          id
          amount
          category
          date
          note
        }
      }`,
);
