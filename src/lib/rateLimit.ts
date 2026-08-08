import { NextResponse } from "next/server";

interface RateLimitConfig {
  limit: number;     // max requests in the duration
  duration: number;  // sliding window duration in milliseconds
}

class InMemoryRateLimiter {
  private store: Map<string, number[]>;

  constructor() {
    this.store = new Map();
    // Periodically clean up expired entries to avoid memory leaks
    if (typeof setInterval !== "undefined") {
      setInterval(() => this.cleanup(), 60000); // run cleanup every minute
    }
  }

  public check(key: string, limit: number, durationMs: number): boolean {
    const now = Date.now();
    const timestamps = this.store.get(key) || [];
    
    // Filter out expired timestamps
    const activeTimestamps = timestamps.filter((time) => now - time < durationMs);
    
    if (activeTimestamps.length >= limit) {
      this.store.set(key, activeTimestamps);
      return false; // Rate limit exceeded
    }
    
    activeTimestamps.push(now);
    this.store.set(key, activeTimestamps);
    return true; // Request allowed
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, timestamps] of this.store.entries()) {
      const active = timestamps.filter((time) => now - time < 3600000); // 1 hour max age
      if (active.length === 0) {
        this.store.delete(key);
      } else {
        this.store.set(key, active);
      }
    }
  }
}

// Global instance to persist across HMR reload in dev mode (best effort)
declare global {
  var globalRateLimiter: InMemoryRateLimiter | undefined;
}

const rateLimiter = globalThis.globalRateLimiter || new InMemoryRateLimiter();
if (process.env.NODE_ENV !== "production") {
  globalThis.globalRateLimiter = rateLimiter;
}

export async function rateLimit(
  ip: string,
  endpoint: string,
  limit: number = 10,
  durationSeconds: number = 60
): Promise<NextResponse | null> {
  const key = `${ip}:${endpoint}`;
  const durationMs = durationSeconds * 1000;
  
  const isAllowed = rateLimiter.check(key, limit, durationMs);
  
  if (!isAllowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { 
        status: 429,
        headers: {
          "Retry-After": durationSeconds.toString(),
        }
      }
    );
  }
  
  return null;
}
