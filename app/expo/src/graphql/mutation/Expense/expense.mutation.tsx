import { gql } from '@apollo/client';

export const createExpense = gql(
  `mutation CreateExpense($tripId: Int!, $data: CreateExpenseInput!) {
    createExpense(tripId: $tripId, data: $data) {
      id
    }
  }`,
);

export const UpdateExpense = gql(
  `mutation UpdateExpense($expenseId: Int!, $data: UpdateExpenseInput!) {
    updateExpense(id: $expenseId, data: $data) {
      id
    }
  }`,
);

export const DeleteExpense = gql(
  `mutation DeleteExpense($expenseId: Int!) {
    deleteExpense(id: $expenseId) {
      id
    }
  }`,
);
