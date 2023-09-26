import { intArg, list, nonNull, queryField } from 'nexus';

import { Context } from '../../../context';

export const Transaction = queryField('getTransaction', {
  type: list('Expense'),
  args: {
    itineraryId: nonNull(intArg()),
  },
  resolve: (_, args, ctx: Context) => {
    return ctx.prisma.expense.findMany({
      where: {
        itineraryId: args.itineraryId as number,
      },
    });
  },
});
