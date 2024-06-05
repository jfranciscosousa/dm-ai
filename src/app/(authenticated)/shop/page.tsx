import GeneratorShell from "@/components/GeneratorShell";
import Shop from "@/components/Shop";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ShopPage({ searchParams }: Props) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const uuid =
    typeof searchParams.uuid === "string" ? searchParams.uuid : undefined;

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
