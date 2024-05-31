"use client";
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { useEffect, useRef, useState } from "react";

interface Props extends Omit<ButtonProps, "title" | "onClick"> {
  value: string;
}

export default function CopyToClipboard({ value, ...props }: Props) {
  const timeout = useRef<NodeJS.Timeout | undefined>();
  const [done, setDone] = useState(false);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  async function handleClick() {
    await navigator.clipboard.writeText(value);
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
