import { inputObjectType } from 'nexus';

export const CreateSubscriptionInput = inputObjectType({
  name: 'CreateSubscriptionInput',
  definition(t) {
    t.float('amount');
    t.field('startDate', { type: 'DateTime' });
    t.field('endDate', { type: 'DateTime' });
  },
});
