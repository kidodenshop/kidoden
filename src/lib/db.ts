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
    // 1. Create a connection pool configured for Supabase Transaction Pooler
    const pool = new Pool({ 
      connectionString,
      max: 10, // Increased from 2 to 10 to prevent connection starvation during interactive transactions
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
      connectionTimeoutMillis: 10000, // Timeout after 10 seconds if connection cannot be established
    });
    globalThis.pgPoolGlobal = pool;
    
    // 2. Wrap the pool in Prisma Pg adapter
    const adapter = new PrismaPg(pool);
    globalThis.prismaGlobal = new PrismaClient({ 
      adapter,
      transactionOptions: {
        maxWait: 15000, // 15s to acquire a connection from the pool (prevents P2028 on remote poolers)
        timeout: 30000, // 30s transaction execution timeout
      },
    });
  }
  prisma = globalThis.prismaGlobal;
}

export default prisma;

