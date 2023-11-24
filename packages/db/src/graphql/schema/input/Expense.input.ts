import { inputObjectType } from 'nexus';

export const CreateExpenseInput = inputObjectType({
  name: 'CreateExpenseInput',
  definition(t) {
    t.float('amount');
    t.field('category', { type: 'ExpenseCategory' });
    t.field('dateSpent', { type: 'DateTime' });
    t.nullable.string('note');
  },
});

export const UpdateExpenseInput = inputObjectType({
  name: 'UpdateExpenseInput',
  definition(t) {
    t.nullable.float('amount');
    t.nullable.field('category', { type: 'ExpenseCategory' });
    t.nullable.field('dateSpent', { type: 'DateTime' });
    t.nullable.string('note');
  },
});
