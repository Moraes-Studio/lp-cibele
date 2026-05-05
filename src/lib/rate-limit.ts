import { LRUCache } from 'lru-cache';

const tokenCache = new LRUCache<string, number[]>({
  max: 500,
  ttl: 60 * 1000, // 1 minuto
});

export function rateLimit(identifier: string): { success: boolean } {
  const tokenCount = tokenCache.get(identifier) ?? [0];

  if (tokenCount[0] === 0) {
    tokenCache.set(identifier, [1]);
  }

  tokenCount[0] += 1;

  const isRateLimited = tokenCount[0] > 3; // máximo 3 por minuto

  return { success: !isRateLimited };
}
