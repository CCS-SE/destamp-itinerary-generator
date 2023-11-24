import { objectType } from 'nexus';

const Stamp = objectType({
  name: 'Stamp',
  definition(t) {
    t.int('id');
    t.string('title');
    t.field('dateCollected', { type: 'DateTime' });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Stamp;
