import GeneratorShell from "@/components/GeneratorShell";
import NPC from "@/components/NPC";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function NpcPage({ searchParams }: Props) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const uuid =
    typeof searchParams.uuid === "string" ? searchParams.uuid : undefined;

  return (
    <GeneratorShell
      search={search}
      title="NPC generator"
      placeholder="A strong dwarf warrior..."
    >
      {search && uuid && <NPC prompt={search} uuid={uuid} />}
    </GeneratorShell>
  );
}
