import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: undefined | PrismaClient;
  var pgPoolGlobal: undefined | Pool;
}

const connectionString = process.env.DATABASE_URL;
const isMock = !connectionString || connectionString.includes("localhost:5432") || connectionString === "";

let prisma: PrismaClient;

if (isMock) {
  if (!globalThis.prismaGlobal) {
    const dummyPool = new Pool({ connectionString: "postgresql://postgres:postgres@localhost:5432/dummy" });
    const adapter = new PrismaPg(dummyPool);
    globalThis.prismaGlobal = new PrismaClient({ adapter });
  }
  prisma = globalThis.prismaGlobal;
} else {
  if (!globalThis.prismaGlobal) {
    // 1. Create a single pool with limited connections to prevent Supabase connection exhaustion
    const pool = new Pool({ 
      connectionString,
      max: 2, // Limit pool size to 2 connections per instance to avoid exhausting Supabase limits in dev mode
      idleTimeoutMillis: 15000, // Close idle connections after 15 seconds
      connectionTimeoutMillis: 5000, // Timeout after 5 seconds if connection cannot be made
    });
    globalThis.pgPoolGlobal = pool;
    
    // 2. Wrap the pool in Prisma Pg adapter
    const adapter = new PrismaPg(pool);
    globalThis.prismaGlobal = new PrismaClient({ adapter });
  }
  prisma = globalThis.prismaGlobal;
}

export default prisma;

