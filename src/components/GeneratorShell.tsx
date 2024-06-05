import { ReactNode } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  title: string;
  search?: string;
  placeholder: string;
  children: ReactNode;
};

export default function GeneratorShell({
  title,
  search,
  placeholder,
  children,
}: Props) {
  const newUuid = crypto.randomUUID();

  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="font-bold text-2xl mb-4">{title}</h1>

      <form className="mb-8 flex gap-2">
        <Input
          name="search"
          defaultValue={search}
          className="flex-grow"
          placeholder={placeholder}
        />

        <input type="hidden" defaultValue={newUuid} name="uuid" />

        <Button>Generate</Button>
      </form>

      <div className="flex-grow">{children}</div>
    </div>
  );
}
