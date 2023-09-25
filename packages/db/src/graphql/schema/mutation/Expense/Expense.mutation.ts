import { mutationField, nonNull } from 'nexus';

import createExpenseInput from '../../input/Expense.input';
import { createExpense } from './Expense.resolver';

export const CreateExpense = mutationField('createExpense', {
  type: 'Expense',
  args: {
    data: nonNull(createExpenseInput),
  },
  resolve: (_, args, ctx) => createExpense(args.data, ctx),
});
