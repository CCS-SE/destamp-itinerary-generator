import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';

declare type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export { Context, MockContext };
