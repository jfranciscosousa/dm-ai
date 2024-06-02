import NPC from "@/components/NPC";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function NpcPage({ searchParams }: Props) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const uuid =
    typeof searchParams.uuid === "string" ? searchParams.uuid : undefined;
  const newUuid = crypto.randomUUID();

  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="font-bold text-2xl mb-4">NPC generator</h1>

      <form className="mb-8 flex gap-2">
        <Input
          name="search"
          defaultValue={search}
          className="flex-grow"
          placeholder="A strong dwarf warrior..."
        />

        <input type="hidden" defaultValue={newUuid} name="uuid" />

        <Button>Generate</Button>
      </form>

      <div className="flex-grow">
        {search && uuid && <NPC prompt={search} uuid={uuid} />}
      </div>
    </div>
  );
}
