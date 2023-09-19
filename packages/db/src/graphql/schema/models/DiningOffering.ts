import { objectType } from 'nexus';

const DiningOffering = objectType({
  name: 'DiningOffering',
  definition(t) {
    t.int('id');
    t.string('name');
  },
});

export default DiningOffering;
