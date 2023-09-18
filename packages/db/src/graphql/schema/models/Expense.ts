import { objectType } from 'nexus';

import { ExpenseCategory } from '../enum';

const Expense = objectType({
  name: 'Expense',
  definition(t) {
    t.float('amount');
    t.field('date', { type: 'DateTime' });
    t.field('category', { type: ExpenseCategory });
    t.nullable.string('note');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Expense;
