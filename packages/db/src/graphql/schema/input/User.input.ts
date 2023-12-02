import { inputObjectType } from 'nexus';

export const CreateUserInput = inputObjectType({
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

export const EditUserInput = inputObjectType({
  name: 'EditUserInput',
  definition(t) {
    t.string('firstName');
    t.string('lastName');
  },
});
