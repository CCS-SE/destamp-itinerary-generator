import { intArg, mutationField, nonNull } from 'nexus';

import {
  createExpense,
  deleteExpense,
  updateExpense,
} from './Expense.resolver';

export const CreateExpense = mutationField('createExpense', {
  type: 'Expense',
  args: {
    tripId: nonNull(intArg()),
    data: nonNull('CreateExpenseInput'),
  },
  resolve: (_, args, ctx) => createExpense(args.tripId, args.data, ctx),
});

export const DeleteExpense = mutationField('deleteExpense', {
  type: 'Expense',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => deleteExpense(args.id, ctx),
});

export const UpdateExpense = mutationField('updateExpense', {
  type: 'Expense',
  args: {
    id: nonNull(intArg()),
    data: nonNull('UpdateExpenseInput'),
  },
  resolve: (_, args, ctx) => updateExpense(args.id, args.data, ctx),
});
