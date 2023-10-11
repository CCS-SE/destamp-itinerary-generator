import { objectType } from 'nexus';

const OpeningHour = objectType({
  name: 'OpeningHour',
  definition(t) {
    t.int('id');
    t.int('day');
    t.nullable.field('openTime', { type: 'DateTime' });
    t.nullable.field('closeTime', { type: 'DateTime' });
  },
});

export default OpeningHour;
