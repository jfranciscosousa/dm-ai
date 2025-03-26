"use client";

import { create, StoreApi, useStore } from "zustand";
import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  title: string;
  placeholder: string;
  children: ReactNode;
};

type StoreType = {
  uuid: string;
  prompt: string;
  handleSubmit: (prompt: string) => void;
};

const createGeneratorShellStore = () =>
  create<StoreType>((set, get) => ({
    uuid: "",
    prompt: "",

    handleSubmit: (prompt: string) =>
      set({ uuid: crypto.randomUUID(), prompt }),
  }));

export const GeneratorShellProvider = createContext<StoreApi<StoreType> | null>(
  null
);

export function useGeneratorShellStore() {
  const store = useContext(GeneratorShellProvider);

  if (!store) {
    throw new Error(
      "useGeneratorShellStore must be used within a GeneratorShellProvider"
    );
  }

  return useStore(store);
}

export default function GeneratorShell({
  title,
  placeholder,
  children,
}: Props) {
  const store = useRef(createGeneratorShellStore());
  const [prompt, setPrompt] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    store.current.getState().handleSubmit(prompt);
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="font-bold text-2xl mb-4">{title}</h1>

      <form className="mb-8 flex gap-2" onSubmit={handleSubmit}>
        <Input
          name="search"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow"
          placeholder={placeholder}
        />

        <Button>Generate</Button>
      </form>

      <GeneratorShellProvider value={store.current}>
        <div className="flex-grow">{children}</div>
      </GeneratorShellProvider>
    </div>
  );
}
