import Tavern from "@/components/Tavern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function TavernPage({ searchParams }: Props) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const uuid =
    typeof searchParams.uuid === "string" ? searchParams.uuid : undefined;
  const newUuid = crypto.randomUUID();

  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="font-bold text-2xl mb-4">Tavern generator</h1>

      <form className="mb-8 flex gap-2">
        <Input
          name="search"
          defaultValue={search}
          className="flex-grow"
          placeholder="A beautiful inn in lazy elvish town..."
        />

        <input type="hidden" defaultValue={newUuid} name="uuid" />

        <Button>Generate</Button>
      </form>

      <div className="flex-grow">
        {search && uuid && <Tavern prompt={search} uuid={uuid} />}
      </div>
    </div>
  );
}
