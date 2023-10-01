import { inputObjectType } from 'nexus';

const CreateExpenseInput = inputObjectType({
  name: 'CreateExpenseInput',
  definition(t) {
    t.field('itineraryId', { type: 'Int' });
    t.float('amount');
    t.field('category', { type: 'ExpenseCategory' });
    t.date('date');
    t.nullable.string('note');
  },
});

export default CreateExpenseInput;
