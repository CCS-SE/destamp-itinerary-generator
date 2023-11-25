import { objectType } from 'nexus';

const Expense = objectType({
  name: 'Expense',
  definition(t) {
    t.int('id');
    t.float('amount');
    t.field('dateSpent', { type: 'DateTime' });
    t.field('category', { type: 'ExpenseCategory' });
    t.string('note');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Expense;
