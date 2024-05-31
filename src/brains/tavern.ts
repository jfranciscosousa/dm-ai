import { redisGet, redisSet } from "@/brains/redis";
import { openai as OpenAIVercel } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const openaiVercel = OpenAIVercel("gpt-4o");
const SCHEMA_VERSION = 1;
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
  version: z
    .literal(SCHEMA_VERSION)
    .describe("Just put the literal value there."),
});

export type Tavern = z.infer<typeof schema>;

export async function generateTavern(
  uuid: string,
  prompt: string
): Promise<Tavern> {
  const cachedTavern = await redisGet<Tavern>(uuid);

  if (cachedTavern && cachedTavern.version === SCHEMA_VERSION) {
    console.log("CACHE HIT");
    return cachedTavern;
  }

  const { object } = await generateObject({
    model: openaiVercel,
    schema,
    prompt: `Generate me a tavern for a tabletop roleplaying game following this prompt: ${prompt}.

    Please provide as much detail as you can.
    `,
  });

  console.log("CACHE MISS");
  await redisSet(uuid, object);

  return object;
}
