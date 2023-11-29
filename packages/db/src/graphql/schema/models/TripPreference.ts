import { objectType } from 'nexus';

const TripPreference = objectType({
  name: 'TripPreference',
  definition(t) {
    t.int('id');
    t.int('tripId');
    t.string('accommodationType');
    t.list.string('amenities');
    t.field('activities', { type: 'JSON' });
    t.list.string('diningStyles');
    t.list.string('cuisines');
  },
});

export default TripPreference;
