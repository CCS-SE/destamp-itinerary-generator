import { nullable, objectType } from 'nexus';

import { TravelSize } from '../enum';

const Trip = objectType({
  name: 'Trip',
  definition(t) {
    t.int('id');
    t.string('title');
    t.float('budget');
    t.nullable.field('destination', {
      type: nullable('Destination'),
      resolve: (parent, _, ctx) => {
        return ctx.prisma.trip
          .findUnique({ where: { id: parent.id } })
          .destination();
      },
    });
    t.nullable.field('departingLocation', {
      type: nullable('DepartingLocation'),
      resolve: (parent, _, ctx) => {
        return ctx.prisma.trip
          .findUnique({ where: { id: parent.id } })
          .departingLocation();
      },
    });
    t.nullable.field('itinerary', {
      type: nullable('Itinerary'),
      resolve: (parent, _, ctx) => {
        return ctx.prisma.trip
          .findUnique({ where: { id: parent.id } })
          .itinerary();
      },
    });
    t.field('travelSize', { type: TravelSize });
    t.nullable.int('adultCount');
    t.nullable.int('childCount');
    t.boolean('isAccommodationIncluded');
    t.boolean('isFoodIncluded');
    t.boolean('isTransportationIncluded');
    t.field('startDate', { type: 'DateTime' });
    t.field('endDate', { type: 'DateTime' });
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
  },
});

export default Trip;
