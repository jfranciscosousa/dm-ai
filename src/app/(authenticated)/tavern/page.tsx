import GeneratorShell from "@/components/GeneratorShell";
import Tavern from "@/components/Tavern";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function TavernPage({ searchParams }: Props) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const uuid =
    typeof searchParams.uuid === "string" ? searchParams.uuid : undefined;

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
