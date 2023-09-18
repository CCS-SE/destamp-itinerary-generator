import { objectType } from 'nexus';

const DepartingLocation = objectType({
  name: 'DepartingLocation',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('address');
    t.float('latitude');
    t.float('longitude');
  },
});

export default DepartingLocation;
