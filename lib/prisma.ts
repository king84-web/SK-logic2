import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

let prismaInstance: PrismaClient | undefined

if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:')) {
  prismaInstance = globalForPrisma.prisma || new PrismaClient({
    log: ['error'],
  })
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance
} else {
  // Fallback during builds when DATABASE_URL doesn't point to a sqlite file.
  prismaInstance = {} as unknown as PrismaClient
}

export const prisma = prismaInstance
