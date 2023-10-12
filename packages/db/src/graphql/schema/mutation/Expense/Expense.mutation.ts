import { intArg, mutationField, nonNull } from 'nexus';

import {
  CreateExpenseInput,
  UpdateExpenseInput,
} from '../../input/Expense.input';
import {
  createExpense,
  deleteExpense,
  updateExpense,
} from './Expense.resolver';

export const CreateExpense = mutationField('createExpense', {
  type: 'Expense',
  args: {
    data: nonNull(CreateExpenseInput),
  },
  resolve: (_, args, ctx) => createExpense(args.data, ctx),
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
    data: nonNull(UpdateExpenseInput),
  },
  resolve: (_, args, ctx) => updateExpense(args.id, args.data, ctx),
});
