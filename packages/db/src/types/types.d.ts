import { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
import { Context } from '../context';

declare interface MockContext {
  prisma: DeepMockProxy<PrismaClient>;
}

export { Context, MockContext };
