import GeneratorShell from "@/components/GeneratorShell";
import NPC from "@/components/NPC";

export default async function NpcPage() {
  return (
    <GeneratorShell
      title="NPC generator"
      placeholder="A strong dwarf warrior..."
    >
      <NPC />
    </GeneratorShell>
  );
}
