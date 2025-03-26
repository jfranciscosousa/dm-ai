"use server";

import { LRUCache } from "lru-cache";
import { openai as OpenAIVercel } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const openaiVercel = OpenAIVercel("gpt-4o");
const schema = z.object({
  name: z.string(),
  race: z.string(),
  class: z.string(),
  description: z.string(),
  backstory: z.string(),
  secret: z.string(),
  personalyTraits: z.array(z.string()),
  ideals: z.array(z.string()),
  bonds: z.array(z.string()),
  flaws: z.array(z.string()),
  dmRoleplayInfo: z.string(),
  imagePrompt: z
    .string()
    .describe("Prompt that will be used to generate image with DALL E 3"),
});
const cache = new LRUCache({ max: 1000, ttl: 1000 * 60 * 60 });

export type NPC = z.infer<typeof schema>;

export async function generateNpc(uuid: string, prompt: string): Promise<NPC> {
  if (cache.get(uuid)) return cache.get(uuid) as NPC;

  const { object } = await generateObject({
    model: openaiVercel,
    schema,
    prompt: `Generate me a NPC for a tabletop roleplaying game following this prompt: ${prompt}.

    Please provide as much detail as you can.
    `,
    temperature: 0.8,
  });

  cache.set(uuid, object);

  return object;
}
