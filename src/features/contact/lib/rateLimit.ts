interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitEntry>();

export interface RateLimiter {
  isRateLimited(identifier: string, limit?: number, windowMs?: number): Promise<boolean>;
}

export class MemoryRateLimiter implements RateLimiter {
  async isRateLimited(identifier: string, limit = 5, windowMs = 15 * 60 * 1000): Promise<boolean> {
    const now = Date.now();
    const entry = memoryStore.get(identifier);

    if (!entry || now > entry.resetAt) {
      memoryStore.set(identifier, { count: 1, resetAt: now + windowMs });
      return false;
    }

    if (entry.count >= limit) {
      return true;
    }

    entry.count += 1;
    memoryStore.set(identifier, entry);
    return false;
  }
}

export const defaultRateLimiter = new MemoryRateLimiter();
