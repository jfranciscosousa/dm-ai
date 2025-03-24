import GeneratorShell from "@/components/GeneratorShell";
import NPC from "@/components/NPC";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function NpcPage({ searchParams }: Props) {
  const searchUnparsed = (await searchParams).search;
  const uuidUnparsed = (await searchParams).uuid;
  const search =
    typeof searchUnparsed === "string" ? searchUnparsed : undefined;
  const uuid = typeof uuidUnparsed === "string" ? uuidUnparsed : undefined;

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
