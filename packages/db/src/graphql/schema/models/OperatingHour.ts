import { objectType } from 'nexus';

const OperatingHour = objectType({
  name: 'OperatingHour',
  definition(t) {
    t.int('id');
    t.int('day');
    t.nullable.field('openTime', { type: 'DateTime' });
    t.nullable.field('closeTime', { type: 'DateTime' });
    t.boolean('isClosed');
    t.boolean('is24Hours');
  },
});

export default OperatingHour;
