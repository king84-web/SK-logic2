import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

let prismaInstance: PrismaClient | undefined

// Only instantiate PrismaClient when the DATABASE_URL appears to be a sqlite file URL.
// This avoids Prisma validating the datasource during builds where a different
// DATABASE_URL (e.g., a Postgres URL) may be present in .env.local.
if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:')) {
  prismaInstance = globalForPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance
} else {
  // Provide a safe fallback during build or when DATABASE_URL is not a sqlite file URL.
  // We cast to PrismaClient to satisfy imports; runtime calls will throw or be caught
  // by callers' try/catch blocks if the DB is unavailable during build-time.
  prismaInstance = {} as unknown as PrismaClient
}

export const prisma = prismaInstance
