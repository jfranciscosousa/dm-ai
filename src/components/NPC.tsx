import { generateNpc } from "@/brains/npc";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import CopyToClipboard from "./CopyToClipboard";

type Props = {
  uuid: string;
  prompt: string;
};

async function InnerNPC({ uuid, prompt }: Props) {
  const npc = await generateNpc(uuid, prompt);

  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <h2 className="font-bold text-2xl">
        {npc.name} ({npc.race} - {npc.class})
      </h2>

      <p>{npc.description}</p>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Backstory</h3>

        <p>{npc.backstory}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Secret</h3>

        <p>{npc.secret}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Traits</h3>

        <ul className="list-disc pl-4">
          {npc.personalyTraits.map((v, idx) => (
            <li key={idx}>{v}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Ideals</h3>

        <ul className="list-disc pl-4">
          {npc.ideals.map((v, idx) => (
            <li key={idx}>{v}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Bonds</h3>

        <ul className="list-disc pl-4">
          {npc.bonds.map((v, idx) => (
            <li key={idx}>{v}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Flaws</h3>

        <ul className="list-disc pl-4">
          {npc.flaws.map((v, idx) => (
            <li key={idx}>{v}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Roleplaying tips</h3>

        <p>{npc.dmRoleplayInfo}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex gap-4">
          <h3 className="text-xl font-bold">Image prompt</h3>
          <CopyToClipboard value={npc.imagePrompt} size="sm" />
        </div>

        <p>{npc.imagePrompt}</p>
      </div>
    </div>
  );
}

export default async function NPC(props: Props) {
  return (
    <Suspense
      key={props.uuid}
      fallback={
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Loader2 className="w-48 h-48 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <InnerNPC {...props} />
    </Suspense>
  );
}
