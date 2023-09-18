import { objectType } from 'nexus';

const Amenity = objectType({
  name: 'Amenity',
  definition(t) {
    t.int('id');
    t.string('name');
  },
});

export default Amenity;
