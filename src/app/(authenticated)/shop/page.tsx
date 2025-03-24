import GeneratorShell from "@/components/GeneratorShell";
import Shop from "@/components/Shop";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const searchUnparsed = (await searchParams).search;
  const uuidUnparsed = (await searchParams).uuid;
  const search =
    typeof searchUnparsed === "string" ? searchUnparsed : undefined;
  const uuid = typeof uuidUnparsed === "string" ? uuidUnparsed : undefined;

  return (
    <GeneratorShell
      search={search}
      title="Shop generator"
      placeholder="A mysterious alchemical shop in the middle of a forest"
    >
      {search && uuid && <Shop prompt={search} uuid={uuid} />}
    </GeneratorShell>
  );
}
