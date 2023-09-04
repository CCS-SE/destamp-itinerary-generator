import { inputObjectType } from 'nexus';

const createTripInput = inputObjectType({
  name: 'CreateTripInput',
  definition(t) {
    t.field('destinationId', { type: 'Int' });
    t.string('title');
    t.float('budget');
    t.field('travelSize', { type: 'TravelSize' });
    t.nullable.int('adultCount');
    t.nullable.int('childCount');
    t.field('startDate', { type: 'DateTime' });
    t.field('endDate', { type: 'DateTime' });
  },
});

export default createTripInput;
