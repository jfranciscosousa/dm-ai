import { generateTavern } from "@/brains/tavern";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

type Props = {
  uuid: string;
  prompt: string;
};

async function InnerTavern({ uuid, prompt }: Props) {
  const tavern = await generateTavern(uuid, prompt);

  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <h2 className="font-bold text-2xl">{tavern.name}</h2>

      <p>{tavern.longDescription}</p>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Secret</h3>

        <p>{tavern.secret}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Food</h3>

        {tavern.foods.map((f, idx) => (
          <p key={idx}>
            {f.shortDescription} - {f.price}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Drinks</h3>

        {tavern.drinks.map((d, idx) => (
          <p key={idx}>
            {d.shortDescription} - {d.price}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Interesting characters</h3>

        <ul className="flex flex-col gap-8">
          {tavern.interestingCharacters.map((c, index) => (
            <li key={index}>
              <p className="text-lg font-medium">
                {c.name} ({c.race} - {c.class})
              </p>

              <div className="mb-2">
                <span className="font-light">{c.where}</span>
              </div>

              <div>
                <span className="font-medium">Description: </span>
                <span className="font-light">{c.physicalDescription}</span>
              </div>

              <div>
                <span className="font-medium">Backstory: </span>
                <span className="font-light">{c.backstory}</span>
              </div>

              <div>
                <span className="font-medium">Role play info: </span>
                <span className="font-light">{c.dmRoleplayInfo}</span>
              </div>

              <div>
                <span className="font-medium">Quest: </span>
                <span className="font-light">{c.quest}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function Tavern(props: Props) {
  return (
    <Suspense
      key={props.uuid}
      fallback={
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Loader2 className="w-48 h-48 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <InnerTavern {...props} />
    </Suspense>
  );
}
