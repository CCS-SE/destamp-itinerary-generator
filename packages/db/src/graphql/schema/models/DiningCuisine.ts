import { objectType } from 'nexus';

const DiningCuisine = objectType({
  name: 'DiningCuisine',
  definition(t) {
    t.int('id');
    t.string('name');
  },
});

export default DiningCuisine;
