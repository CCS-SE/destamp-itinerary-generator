import { objectType } from 'nexus';

const DiningOption = objectType({
  name: 'DiningOption',
  definition(t) {
    t.int('id');
    t.string('name');
  },
});

export default DiningOption;
