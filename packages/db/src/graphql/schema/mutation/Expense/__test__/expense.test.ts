import { ExpenseCategory } from '@prisma/client';

import { MockContext } from '../../../../../types/types';
import { Context, createMockContext } from '../../../../context';
import {
  createExpense,
  deleteExpense,
  updateExpense,
} from '../Expense.resolver';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('createExpense mutation', () => {
  it('should create a new expense', async () => {
    const tripId = 1;
    const input = {
      amount: 100,
      category: ExpenseCategory.FOOD,
      dateSpent: new Date(),
      note: 'Test note',
      createdAt: new Date('2023-10-8'),
      updatedAt: new Date('2023-10-8'),
    };
    const ctx = {
      userId: 'user1',
      req: '',
      prisma: mockContext.prisma,
    };

    mockContext.prisma.trip.findUniqueOrThrow.mockResolvedValue({
      id: tripId,
      traveler: {
        userId: ctx.userId,
      },
    });
    mockContext.prisma.expense.create.mockResolvedValue({
      id: 1,
      ...input,
      tripId,
    });

    const result = await createExpense(tripId, input, ctx);

    expect(result).toEqual({
      id: 1,
      ...input,
      tripId,
    });
  });
});

describe('editExpense mutation', () => {
  it('should edit an expense', async () => {
    const updatedExpense = {
      id: 1,
      amount: 250,
      category: ExpenseCategory.FOOD,
      dateSpent: new Date('2022-10-12'),
      note: 'Jabee',
      tripId: 1,
      createdAt: new Date('2022-10-12'),
      updatedAt: new Date('2022-10-15'),
    };

    mockContext.prisma.expense.update.mockResolvedValue(updatedExpense);

    const mockArgs = {
      expenseId: 1,
      data: {
        amount: 250,
        category: ExpenseCategory.FOOD,
        note: 'Jabee',
      },
    };

    const result = updateExpense(mockArgs.expenseId, mockArgs.data, context);

    await expect(result).resolves.toEqual(updatedExpense);
  });
});

describe('deleteExpense mutation', () => {
  it('should delete an expense', async () => {
    const expense = {
      id: 2,
      amount: 100,
      category: ExpenseCategory.OTHER,
      dateSpent: new Date('2022-10-12'),
      note: 'Test expense',
      tripId: 2,
      createdAt: new Date('2022-10-12'),
      updatedAt: new Date('2022-10-12'),
    };

    mockContext.prisma.expense.delete.mockResolvedValue(expense);

    const mockArgs = {
      id: 2,
    };

    const result = deleteExpense(mockArgs.id, context);

    await expect(result).resolves.toEqual(expense);
  });
});
