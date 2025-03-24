"use client";

import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";

interface Props extends Omit<ButtonProps, "title" | "onClick"> {
  value: string;
}

export default function CopyToClipboard({ value, ...props }: Props) {
  const { toast } = useToast();
  const timeout = useRef<NodeJS.Timeout>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  async function handleClick() {
    await navigator.clipboard.writeText(value);
    toast({ title: "Content copied to clipboard!" });
    setDone(true);
    timeout.current = setTimeout(() => setDone(false), 1000);
  }

  return (
    <Button {...props} title="Copy to clipboard" onClick={handleClick}>
      Copy
      {done && <ClipboardCheckIcon className="ml-2 w-4 h-4" />}
      {!done && <ClipboardIcon className="ml-2 w-4 h-4" />}
    </Button>
  );
}
