import { objectType } from 'nexus';

const Image = objectType({
  name: 'Image',
  definition(t) {
    t.id('id');
    t.nullable.string('name');
    t.string('url');
    t.nullable.int('size');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Image;
