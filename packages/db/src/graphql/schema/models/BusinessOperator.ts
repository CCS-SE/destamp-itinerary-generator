import { objectType } from 'nexus';

const BusinessOperator = objectType({
  name: 'BusinessOperator',
  definition(t) {
    t.string('id');
    t.string('userId');
    t.field('createdAt', { type: 'DateTime' });
    t.field('updatedAt', { type: 'DateTime' });
    t.list.field('businesses', {
      type: 'Poi',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.businessOperator
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .businesses();
      },
    });
    t.list.field('business_permits', {
      type: 'BusinessPermit',
      resolve: ({ id }, _, ctx) => {
        return ctx.prisma.businessOperator
          .findUniqueOrThrow({
            where: {
              id: id,
            },
          })
          .businessPermits();
      },
    });
  },
});

export default BusinessOperator;
