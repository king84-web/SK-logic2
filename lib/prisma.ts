import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma?: any }

let prisma: any

try {
  if (globalForPrisma.prisma) {
    prisma = globalForPrisma.prisma
  } else {
    prisma = new PrismaClient({ log: ['error'] })
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prisma
    }
  }
} catch (e) {
  // Prisma failed to initialize (likely invalid/missing DATABASE_URL).
  // Export a proxy that rejects on any model access so imports don't crash the app.
  console.error('Prisma Client initialization failed:', e)
  const err = new Error(String((e as any)?.message || e))
  err.name = 'PrismaClientInitializationError'

  const createRejecting = () => {
    const fn = (..._args: any[]) => Promise.reject(err)
    return new Proxy(fn, {
      get: () => createRejecting(),
      apply: () => Promise.reject(err),
    })
  }

  prisma = new Proxy({}, {
    get: () => createRejecting(),
  })
}

export { prisma }
