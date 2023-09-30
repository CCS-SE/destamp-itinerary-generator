import { list, objectType } from 'nexus';

import { BusinessOwnerRole } from '../enum';

const BusinessOwner = objectType({
  name: 'BusinessOwner',
  definition(t) {
    t.int('id');
    t.string('firstName');
    t.string('lastName');
    t.field('role', { type: BusinessOwnerRole });
    t.field('listings', {
      type: list('Place'),
      resolve: ({ id }, _, ctx) =>
        ctx.prisma.businessOwner
          .findUniqueOrThrow({
            where: {
              id: id as number,
            },
          })
          .listings(),
    });
  },
});

export default BusinessOwner;
