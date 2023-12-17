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
    const expense = {
      id: 1,
      amount: 100,
      category: ExpenseCategory.OTHER,
      dateSpent: new Date('2022-10-12'),
      note: 'Test expense',
      tripId: 1,
      createdAt: new Date('2022-10-12'),
      updatedAt: new Date('2022-10-12'),
    };

    mockContext.prisma.expense.create.mockResolvedValue(expense);

    const mockArgs = {
      tripId: 1,
      data: {
        amount: 100,
        category: ExpenseCategory.OTHER,
        dateSpent: new Date('2022-10-12'),
        note: 'Test expense',
      },
    };

    await expect(
      createExpense(mockArgs.tripId, mockArgs.data, context),
    ).resolves.toEqual(expense);
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
