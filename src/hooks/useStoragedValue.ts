"use client";

import ls from "localstorage-slim";
import { useEffect } from "react";

export default function useStoragedValue<T>(
  storageKey: string,
  val?: T
): T | undefined | null {
  const key = `${storageKey}:${process.env.COMMIT_HASH}`;
  const storedValue = ls.get<T>(key);

  useEffect(() => {
    if (val) ls.set(key, val);
  }, []);

  return val || storedValue;
}
