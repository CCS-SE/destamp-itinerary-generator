import { inputObjectType } from 'nexus';

const CreateTripInput = inputObjectType({
  name: 'CreateTripInput',
  definition(t) {
    t.field('destinationId', { type: 'Int' });
    t.field('travelerId', { type: 'Int' });
    t.string('title');
    t.float('budget');
    t.field('travelSize', { type: 'TravelSize' });
    t.nullable.int('adultCount');
    t.nullable.int('childCount');
    t.field('startDate', { type: 'DateTime' });
    t.field('endDate', { type: 'DateTime' });
    t.boolean('isAccommodationIncluded');
    t.boolean('isFoodIncluded');
    t.boolean('isTransportationIncluded');
    t.list.field('preferredTime', {
      type: 'JSON',
    });
  },
});

export default CreateTripInput;
