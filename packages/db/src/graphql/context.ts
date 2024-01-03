/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { JwtPayload, verify } from 'jsonwebtoken';

import { MockContext } from '../types/types';

interface Context {
  prisma: PrismaClient;
  req: any;
  userId: string;
}

const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};

const prisma = new PrismaClient();

const context: Context = {
  prisma,
  req: {},
  userId: '',
};

const createContext = (request: any) => {
  try {
    const authHeader = request.req.headers['authorization'] as string;

    if (authHeader !== null) {
      const token = authHeader.split(' ')[1] as string;

      const tokenPayload = verify(
        token,
        process.env.SUPABASE_JWT_SECRET as string,
      ) as JwtPayload;

      const userId = tokenPayload.sub;

      return {
        ...request,
        prisma,
        userId,
      };
    }
  } catch (err) {
    console.error('Failed to verify token', err);
  }

  return {
    ...request,
    prisma,
  };
};

export { context, createMockContext, createContext, prisma };
export type { Context };
