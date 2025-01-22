import { openai as OpenAIVercel } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const openaiVercel = OpenAIVercel("gpt-4o");
const schema = z.object({
  name: z.string(),
  longDescription: z.string().describe("To be read out loud to the players"),
  secret: z.string(),
  items: z
    .array(
      z.object({
        price: z.string().describe("Try to balance the price for 5e rules."),
        name: z.string(),
        description: z.string().describe("Stats, effects, etc"),
      })
    )
    .describe("At least some 6 items"),
  shopOwner: z.object({
    name: z.string(),
    race: z.string(),
    class: z.string(),
    physicalDescription: z.string(),
    backstory: z.string(),
    dmRoleplayInfo: z.string(),
  }),
  imagePrompt: z
    .string()
    .describe(
      "Prompt that will be used to generate image with DALL E 3. Put both the shop and the owner in focus"
    ),
});

export type Shop = z.infer<typeof schema>;

export async function generateShop(
  uuid: string,
  prompt: string
): Promise<Shop> {
  const { object } = await generateObject({
    model: openaiVercel,
    schema,
    prompt: `Generate me a shop for a tabletop roleplaying game following this prompt: ${prompt}.

    Please provide as much detail as you can.
    `,
  });

  return object;
}
