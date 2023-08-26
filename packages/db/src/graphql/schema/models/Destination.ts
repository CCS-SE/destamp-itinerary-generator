import { nullable, objectType } from 'nexus';
import { Context } from '../../context';
import Image from './Image';

const Destination = objectType({
  name: 'Destination',
  definition(t) {
    t.int('id'), 
    t.string('name');
    t.nullable.field('image', {
      type: nullable(Image),
      resolve: (parent, _, ctx: Context) => {
        return ctx.prisma.destination
          .findUnique({ where: { id: parent.id } })
          .image();
      },
    });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Destination;
