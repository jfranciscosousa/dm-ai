"use server";
import { generateObject } from "ai";
import { z } from "zod";
import { openai as OpenAIVercel } from "@ai-sdk/openai";

import { LRUCache } from "lru-cache";

const cache = new LRUCache({
  max: 1_000_000,
});
const openaiVercel = OpenAIVercel("gpt-4o");

const schema = z.object({
  name: z.string(),
  longDescription: z.string().describe("To be read out loud to the players"),
  secret: z.string(),
  drinks: z.array(
    z.object({ shortDescription: z.string(), price: z.string() })
  ),
  foods: z.array(z.object({ shortDescription: z.string(), price: z.string() })),
  interestingCharacters: z
    .array(
      z.object({
        name: z.string(),
        race: z.string(),
        class: z.string(),
        physicalDescription: z.string(),
        backstory: z.string(),
        dmRoleplayInfo: z.string(),
        quest: z.string(),
        where: z
          .string()
          .describe("What the character is doing inside the tavern"),
      })
    )
    .describe(
      "At least 5 characters, and one of them always has to be the barkeep."
    ),
  imagePrompt: z
    .string()
    .describe("Prompt that will be used to generate image with DALL E 3"),
});

export type Tavern = z.infer<typeof schema>;

export async function generateTavern(prompt: string): Promise<Tavern> {
  if (cache.get(prompt)) return cache.get(prompt) as Tavern;

  const { object } = await generateObject({
    model: openaiVercel,
    schema,
    prompt: `Generate me a tavern for a tabletop roleplaying game following this prompt: ${prompt}.

    Please provide as much detail as you can.
    `,
  });

  cache.set(prompt, object);

  return object;
}
