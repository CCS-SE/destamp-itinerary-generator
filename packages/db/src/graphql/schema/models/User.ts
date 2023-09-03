import { nullable, objectType } from 'nexus';

import { UserType } from '../enum';
import Traveler from './Traveler';

const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('email');
    t.string('password');
    t.field('userType', { type: UserType });
    t.nullable.field('traveler', {
      type: nullable(Traveler),
      resolve: (parent, _, ctx) => {
        return ctx.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .traveler();
      },
    });
  },
});

export default User;
