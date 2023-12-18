import { objectType } from 'nexus';

const BusinessOperatorBusiness = objectType({
  name: 'BusinessOperatorBusiness',
  definition(t) {
    t.field('poi', { type: 'Poi' });
    t.boolean('isVerified');
  },
});

export default BusinessOperatorBusiness;
