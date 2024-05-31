import { createClient } from "redis";

async function buildClient() {
  const redis = createClient({
    url: process.env.REDIS_URL,
  });
  await redis.connect();

  return redis;
}

export async function redisGet<T>(key: string): Promise<T | undefined> {
  const client = await buildClient();
  const value = await client.get(key);
  await client.disconnect();

  if (!value) return undefined;

  try {
    return JSON.parse(value) as T;
  } catch {
    client.del(key);
    return undefined;
  }
}

export async function redisSet(key: string, value: unknown): Promise<void> {
  const client = await buildClient();
  await client.set(key, JSON.stringify(value));
  await client.disconnect();
}
