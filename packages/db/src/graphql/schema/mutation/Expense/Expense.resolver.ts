import { ExpenseCategory } from '@prisma/client';

import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateExpenseInput = NexusGenInputs['CreateExpenseInput'];

export const createExpense = (args: CreateExpenseInput, ctx: Context) => {
  return ctx.prisma.expense.create({
    data: {
      amount: args.amount as number,
      category: args.category as ExpenseCategory,
      date: args.date as Date,
      itineraryId: args.itineraryId as number,
      note: args.note as string,
    },
  });
};
