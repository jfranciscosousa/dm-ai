"use client";

import { generateShop } from "@/brains/shop";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import useStoragedValue from "@/hooks/useStoragedValue";
import { useGeneratorShellStore } from "./GeneratorShell";

export default function Shop() {
  const { uuid, prompt } = useGeneratorShellStore();
  const { data, isLoading } = useSWR(
    ["shop", uuid, prompt],
    ([_, uuid, prompt]) => (uuid && prompt ? generateShop(uuid, prompt) : null)
  );
  const shop = useStoragedValue("shop", data);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Loader2 className="w-48 h-48 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!shop) return null;

  return (
    <div className="flex flex-col gap-3 max-w-3xl">
      <h2 className="font-bold text-2xl">{shop.name}</h2>

      <p>{shop.longDescription}</p>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Secret</h3>

        <p>{shop.secret}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Food</h3>

        <ul className="pl-4 flex flex-col gap-2">
          {shop.items.map((i, idx) => (
            <li key={idx} className="list-disc">
              <p>
                {i.name} - {i.price}
              </p>

              <p>{i.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Owner</h3>

        <div>
          <p className="text-lg font-medium">
            {shop.shopOwner.name} ({shop.shopOwner.race} -{" "}
            {shop.shopOwner.class})
          </p>

          <div>
            <span className="font-medium">Description: </span>
            <span className="font-light">
              {shop.shopOwner.physicalDescription}
            </span>
          </div>

          <div>
            <span className="font-medium">Backstory: </span>
            <span className="font-light">{shop.shopOwner.backstory}</span>
          </div>

          <div>
            <span className="font-medium">Role play info: </span>
            <span className="font-light">{shop.shopOwner.dmRoleplayInfo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
