"use server";

import { authenticate } from "@/brains/authentication";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(currentState: unknown, formData: FormData) {
  const password = formData.get("password") || "";

  if (typeof password !== "string" || !authenticate(password)) {
    return { error: "Invalid password" };
  }

  (await cookies()).set("auth", password, {
    secure: true,
    httpOnly: true,
    maxAge: 31_556_926,
  });
  redirect("/");
}
