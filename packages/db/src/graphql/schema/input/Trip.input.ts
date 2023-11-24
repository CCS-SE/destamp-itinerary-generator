import { inputObjectType } from 'nexus';

const CreateTripInput = inputObjectType({
  name: 'CreateTripInput',
  definition(t) {
    t.string('title');
    t.float('budget');
    t.field('travelSize', { type: 'TravelSize' });
    t.int('travelerCount');
    t.field('startDate', { type: 'DateTime' });
    t.nullable.field('endDate', { type: 'DateTime' });
    t.boolean('isAccommodationIncluded');
    t.boolean('isFoodIncluded');
    t.boolean('isTransportationIncluded');
    t.field('startingLocation', { type: 'JSON' });
    t.field('timeSlots', {
      type: 'JSON',
    });
  },
});

export default CreateTripInput;
