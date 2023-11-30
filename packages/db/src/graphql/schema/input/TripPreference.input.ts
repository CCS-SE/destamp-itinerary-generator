import { inputObjectType } from 'nexus';

const CreateTripPreferenceInput = inputObjectType({
  name: 'CreateTripPreferenceInput',
  definition(t) {
    t.string('accommodationType');
    t.list.string('amenities');
    t.field('activities', { type: 'JSON' });
    t.list.string('diningStyles');
    t.list.string('cuisines');
  },
});

export default CreateTripPreferenceInput;
