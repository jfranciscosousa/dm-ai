import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

export async function redisGet<T>(key: string): Promise<T | undefined> {
  const value = await redis.get<T>(key);

  if (!value) return undefined;

  return value as T;
}

export async function redisSet(key: string, value: unknown): Promise<void> {
  await redis.set(key, JSON.stringify(value));
}
