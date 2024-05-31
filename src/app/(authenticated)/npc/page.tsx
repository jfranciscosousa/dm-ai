import NPC from "@/components/NPC";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect, RedirectType } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function NpcPage({ searchParams }: Props) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const uuid =
    typeof searchParams.uuid === "string"
      ? searchParams.uuid
      : crypto.randomUUID();

  async function action(formData: FormData) {
    "use server";

    const search = formData.get("search") as string;
    const uuid = crypto.randomUUID();

    redirect(`/npc?search=${search}&uuid=${uuid}`);
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="font-bold text-2xl mb-4">NPC generator</h1>

      <form action={action} className="mb-8 flex gap-2">
        <Input
          name="search"
          defaultValue={search}
          className="flex-grow"
          placeholder="A strong dwarf warrior..."
        />

        <Button>Generate</Button>
      </form>

      <div className="flex-grow">
        {search && <NPC prompt={search} uuid={uuid} />}
      </div>
    </div>
  );
}
