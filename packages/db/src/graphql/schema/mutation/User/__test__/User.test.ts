import { UserType } from '@prisma/client';
import bcrypt from 'bcrypt';

import { MockContext } from '../../../../../types/types';
import { Context, createMockContext } from '../../../../context';
import { createUser } from '../User.resolver';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('createUser mutation', () => {
  it('should create a user with valid input', async () => {
    const user = {
      email: 'test@yahoo.com',
      password: 'testing',
      userType: UserType.TRAVELER,
    };

    const userInput = {
      id: 'testing',
      email: 'test@yahoo.com',
      password: 'testing',
      userType: UserType.TRAVELER,
      traveler: {
        create: {},
      },
    };

    const saltRounds = 10;
    const expectedHashedPassword = 'hashed_password'; // mock hashed password

    bcrypt.hash = jest.fn().mockResolvedValue(expectedHashedPassword);

    mockContext.prisma.user.create.mockResolvedValue({
      id: 'testing',
      ...user,
    });

    const expectedResult = {
      id: 'testing',
      ...user,
    };

    const result = await createUser(userInput, context);

    expect(bcrypt.hash).toHaveBeenCalledWith(userInput.password, saltRounds);

    expect(mockContext.prisma.user.create).toBeCalledWith({
      data: {
        ...userInput,
        password: expectedHashedPassword,
      },
    });

    expect(result).toEqual(expectedResult);
  });
});
