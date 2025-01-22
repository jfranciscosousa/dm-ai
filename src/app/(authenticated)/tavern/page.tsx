import GeneratorShell from "@/components/GeneratorShell";
import Tavern from "@/components/Tavern";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TavernPage({ searchParams }: Props) {
  const searchUnparsed = (await searchParams).search;
  const uuidUnparsed = (await searchParams).uuid;
  const search =
    typeof searchUnparsed === "string" ? searchUnparsed : undefined;
  const uuid = typeof uuidUnparsed === "string" ? uuidUnparsed : undefined;

  return (
    <GeneratorShell
      search={search}
      title="Tavern generator"
      placeholder="A beautiful elven inn..."
    >
      {search && uuid && <Tavern prompt={search} uuid={uuid} />}
    </GeneratorShell>
  );
}
