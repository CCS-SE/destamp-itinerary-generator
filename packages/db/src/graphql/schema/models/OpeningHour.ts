import { objectType } from 'nexus';

const OpeningHour = objectType({
  name: 'OpeningHour',
  definition(t) {
    t.int('id');
    t.int('day');
    t.field('openTime', { type: 'DateTime' });
    t.field('closeTime', { type: 'DateTime' });
  },
});

export default OpeningHour;
