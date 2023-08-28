import { nullable, objectType } from 'nexus';

import { TravelSize } from '../enum';
import Destination from './Destination';

const Trip = objectType({
  name: 'Trip',
  definition(t) {
    t.int('id'), t.string('title');
    t.float('budget');
    t.nullable.field('destination', {
      type: nullable(Destination),
      resolve: (parent, _, ctx) => {
        return ctx.prisma.trip
          .findUnique({ where: { id: parent.id } })
          .destination();
      },
    });
    t.field('travelSize', { type: TravelSize });
    t.nullable.int('adultCount');
    t.nullable.int('childCount');
    t.field('startDate', { type: 'DateTime' });
    t.field('endDate', { type: 'DateTime' });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Trip;
