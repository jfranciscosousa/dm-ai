"use client";

import { generateNpc } from "@/brains/npc";
import useStoragedValue from "@/hooks/useStoragedValue";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import CopyToClipboard from "./CopyToClipboard";
import { useGeneratorShellStore } from "./GeneratorShell";

export default function NPC() {
  const { uuid, prompt } = useGeneratorShellStore();
  const { data, isLoading } = useSWR(
    ["npc", uuid, prompt],
    ([_, uuid, prompt]) => (uuid && prompt ? generateNpc(uuid, prompt) : null)
  );
  const npc = useStoragedValue("npc", data);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Loader2 className="w-48 h-48 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!npc) return null;

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
