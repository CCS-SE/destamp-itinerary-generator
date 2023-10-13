import { inputObjectType } from 'nexus';

const CreateTravelerInput = inputObjectType({
  name: 'CreateTravelerInput',
  definition(t) {
    t.string('firstName');
    t.string('lastName');
  },
});

export default CreateTravelerInput;
