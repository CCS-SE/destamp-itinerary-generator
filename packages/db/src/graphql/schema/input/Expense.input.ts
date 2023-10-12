import { inputObjectType } from 'nexus';

export const CreateExpenseInput = inputObjectType({
  name: 'CreateExpenseInput',
  definition(t) {
    t.field('itineraryId', { type: 'Int' });
    t.float('amount');
    t.field('category', { type: 'ExpenseCategory' });
    t.date('date');
    t.nullable.string('note');
  },
});

export const UpdateExpenseInput = inputObjectType({
  name: 'UpdateExpenseInput',
  definition(t) {
    t.nullable.float('amount');
    t.nullable.field('category', { type: 'ExpenseCategory' });
    t.nullable.date('date');
    t.nullable.string('note');
  },
});
