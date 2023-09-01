import { inputObjectType } from 'nexus';

const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.string('id');
    t.string('email');
    t.string('password');
    t.field('userType', { type: 'UserType' });
  },
});

export default CreateUserInput;
