import { mutationField, nonNull } from 'nexus';

import CreateExpenseInput from '../../input/Expense.input';
import { createExpense } from './Expense.resolver';

export const CreateExpense = mutationField('createExpense', {
  type: 'Expense',
  args: {
    data: nonNull(CreateExpenseInput),
  },
  resolve: (_, args, ctx) => createExpense(args.data, ctx),
});
