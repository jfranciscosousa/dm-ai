import GeneratorShell from "@/components/GeneratorShell";
import Tavern from "@/components/Tavern";

export default async function TavernPage() {
  return (
    <GeneratorShell
      title="Tavern generator"
      placeholder="A beautiful elven inn..."
    >
      <Tavern />
    </GeneratorShell>
  );
}
