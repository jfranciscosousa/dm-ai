import GeneratorShell from "@/components/GeneratorShell";
import Shop from "@/components/Shop";

export default async function ShopPage() {
  return (
    <GeneratorShell
      title="Shop generator"
      placeholder="A mysterious alchemical shop in the middle of a forest"
    >
      <Shop />
    </GeneratorShell>
  );
}
