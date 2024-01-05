import { ExpenseCategory } from '@prisma/client';

import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateExpenseInput = NexusGenInputs['CreateExpenseInput'];
type UpdateExpenseInput = NexusGenInputs['UpdateExpenseInput'];

export const createExpense = async (
  tripId: number,
  input: CreateExpenseInput,
  ctx: Context,
) => {
  const trip = await ctx.prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
    },
    include: {
      traveler: true,
    },
  });

  if (ctx.userId !== trip.traveler.userId) {
    throw new Error('You are not authorized to create this expense.');
  }

  return await ctx.prisma.expense.create({
    data: {
      amount: input.amount as number,
      category: input.category as ExpenseCategory,
      dateSpent: input.dateSpent as Date,
      note: input.note as string,
      trip: {
        connect: {
          id: tripId,
        },
      },
    },
  });
};

export const deleteExpense = async (id: number, ctx: Context) => {
  const expense = await ctx.prisma.expense.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      trip: {
        include: {
          traveler: true,
        },
      },
    },
  });

  if (ctx.userId !== expense?.trip.traveler.userId) {
    throw new Error('You are not authorized to delete this expense.');
  }

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
  const expense = await ctx.prisma.expense.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      trip: {
        include: {
          traveler: true,
        },
      },
    },
  });

  if (ctx.userId !== expense?.trip.traveler.userId) {
    throw new Error('You are not authorized to edit this expense.');
  }

  return await ctx.prisma.expense.update({
    where: {
      id: id,
    },
    data: {
      amount: input.amount as number,
      category: input.category as ExpenseCategory,
      dateSpent: input.dateSpent as Date,
      note: input.note as string,
    },
  });
};
