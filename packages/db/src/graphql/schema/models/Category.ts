import { objectType } from 'nexus';

const Category = objectType({
  name: 'Category',
  definition(t) {
    t.int('id');
    t.string('name');
  },
});

export default Category;
