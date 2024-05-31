"use server";

import { cookies } from "next/headers";

export type Theme = "dark" | "light";

function parseTheme(unparsedTheme: unknown): Theme {
  if (typeof unparsedTheme !== "string") return "light";

  if (unparsedTheme !== "dark" && unparsedTheme !== "light") return "light";

  return unparsedTheme;
}

export async function setTheme(formData: FormData) {
  const theme = parseTheme(formData.get("theme"));

  cookies().set("theme", theme);
}

export async function getTheme(): Promise<Theme> {
  const unparsedTheme = cookies().get("theme")?.value;

  if (unparsedTheme !== "dark" && unparsedTheme !== "light") {
    return "light";
  }

  return unparsedTheme;
}
