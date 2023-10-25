import { PrismaClient } from "@prisma/client";

// we are checking if we arlardey inceatioded prisma with 'globalThis' we are checcking if its there in prsima.
//if not make it
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
//we are checcking if its there in prsima.
//if not make it
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma