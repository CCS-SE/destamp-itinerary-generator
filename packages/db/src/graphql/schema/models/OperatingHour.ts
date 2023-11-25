import { objectType } from 'nexus';

const OperatingHour = objectType({
  name: 'OperatingHour',
  definition(t) {
    t.int('id');
    t.int('day');
    t.nullable.field('openTime', { type: 'DateTime' });
    t.nullable.field('closeTime', { type: 'DateTime' });
  },
});

export default OperatingHour;
