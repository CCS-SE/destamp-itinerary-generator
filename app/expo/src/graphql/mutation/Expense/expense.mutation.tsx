import { gql } from '@apollo/client';

export const createExpense = gql(
  `mutation CreateExpense($data: CreateExpenseInput!) {
        createExpense(data: $data) {
          amount,
          category,
          date,
          note,
        }
      }`,
);

export const UpdateExpense = gql(
  `mutation UpdateExpense($updateExpenseId: Int!, $data: UpdateExpenseInput!) {
        updateExpense(id: $updateExpenseId, data: $data) {
          id
        }
      }`,
);

export const DeleteExpense = gql(
  `mutation DeleteExpense($deleteExpenseId: Int!) {
        deleteExpense(id: $deleteExpenseId) {
          id
        }
      }`,
);
