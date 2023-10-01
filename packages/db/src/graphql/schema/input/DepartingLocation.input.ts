import { inputObjectType } from 'nexus';

const CreateDepartingLocationInput = inputObjectType({
  name: 'CreateDepartingLocationInput',
  definition(t) {
    t.string('address');
    t.string('name');
    t.float('latitude');
    t.float('longitude');
  },
});

export default CreateDepartingLocationInput;
