import { objectType } from 'nexus';

const DiningAtmosphere = objectType({
  name: 'DiningAtmosphere',
  definition(t) {
    t.int('id');
    t.string('name');
  },
});

export default DiningAtmosphere;
