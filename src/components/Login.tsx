"use client";

import { loginAction } from "@/actions/login";
import { Button } from "./ui/button";
import { useFormState, useFormStatus } from "react-dom";

function FormContent({ error }: { error?: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="password"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            autoComplete="current-password"
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-500"
            id="password"
            name="password"
            required
            type="password"
          />

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
      </div>

      <div>
        <Button type="submit" loading={pending}>
          Sign in
        </Button>
      </div>
    </>
  );
}

export default function Login() {
  const [state, formAction] = useFormState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <form action={formAction} className="space-y-6">
          <FormContent error={state?.error} />
        </form>
      </div>
    </div>
  );
}
