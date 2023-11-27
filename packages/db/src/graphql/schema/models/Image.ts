import { objectType } from 'nexus';

const Image = objectType({
  name: 'Image',
  definition(t) {
    t.string('id');
    t.string('url');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Image;
