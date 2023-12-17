import { objectType } from 'nexus';

const Account = objectType({
  name: 'Account',
  definition(t) {
    t.field('user', { type: 'User' });
    t.boolean('isPremium');
  },
});

export default Account;
