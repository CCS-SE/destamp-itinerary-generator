import { inputObjectType } from 'nexus';

const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.string('id');
    t.string('email');
    t.string('password');
    t.string('firstName');
    t.string('lastName');
    t.field('type', { type: 'UserType' });
  },
});

export default CreateUserInput;
