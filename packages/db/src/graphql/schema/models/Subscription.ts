import { objectType } from 'nexus';

const Subscription = objectType({
  name: 'Subscription',
  definition(t) {
    t.string('id');
    t.string('travelerId');
    t.float('amount');
    t.field('status', { type: 'SubscriptionStatus' });
    t.field('startDate', { type: 'DateTime' });
    t.field('endDate', { type: 'DateTime' });
  },
});

export default Subscription;
