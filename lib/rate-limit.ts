import "server-only";

/**
 * In-memory sliding-window rate limiter.
 * Fine for a single Node instance (Hostinger). If the site ever runs on
 * multiple instances, swap this for a DB- or Redis-backed store.
 */
type Entry = { timestamps: number[] };
const store = new Map<string, Entry>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_IN_WINDOW = 5;

export function rateLimit(key: string, max = MAX_IN_WINDOW, windowMs = WINDOW_MS) {
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
  const allowed = entry.timestamps.length < max;
  if (allowed) entry.timestamps.push(now);
  store.set(key, entry);

  // Opportunistic cleanup so the map does not grow forever.
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (v.timestamps.every((t) => now - t >= windowMs)) store.delete(k);
    }
  }
  return { allowed, remaining: Math.max(0, max - entry.timestamps.length) };
}
