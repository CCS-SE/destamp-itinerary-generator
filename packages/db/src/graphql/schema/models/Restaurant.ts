import { objectType } from 'nexus';

const Restaurant = objectType({
  name: 'Restaurant',
  definition(t) {
    t.int('id');
    t.string('poiId');
    t.list.string('atmospheres');
  },
});

export default Restaurant;
