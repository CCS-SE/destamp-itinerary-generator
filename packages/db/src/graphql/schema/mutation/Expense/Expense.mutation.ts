import { intArg, mutationField, nonNull } from 'nexus';

import CreateExpenseInput from '../../input/Expense.input';
import { createExpense, deleteExpense } from './Expense.resolver';

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
