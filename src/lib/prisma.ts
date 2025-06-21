import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only create Prisma client on server-side
const isServer = typeof window === 'undefined';

export const prisma = isServer 
  ? (globalForPrisma.prisma ?? new PrismaClient())
  : null;

if (process.env.NODE_ENV !== 'production' && isServer) {
  globalForPrisma.prisma = prisma;
} 