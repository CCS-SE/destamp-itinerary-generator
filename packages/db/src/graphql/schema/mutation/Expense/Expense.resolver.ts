import { ExpenseCategory } from '@prisma/client';

import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateExpenseInput = NexusGenInputs['CreateExpenseInput'];
type UpdateExpenseInput = NexusGenInputs['UpdateExpenseInput'];

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

export const deleteExpense = async (id: number, ctx: Context) => {
  return await ctx.prisma.expense.delete({
    where: {
      id: id,
    },
  });
};

export const updateExpense = async (
  id: number,
  input: UpdateExpenseInput,
  ctx: Context,
) => {
  return await ctx.prisma.expense.update({
    where: {
      id: id,
    },
    data: {
      amount: input.amount as number,
      category: input.category as ExpenseCategory,
      date: input.date as Date,
      note: input.note as string,
    },
  });
};
