import { PrismaClient } from "@prisma/client";

// Avoids exhausting the connection pool from a new PrismaClient on every
// hot-reload in dev (standard Next.js App Router pattern).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
