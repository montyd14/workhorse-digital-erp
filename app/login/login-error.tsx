"use client";

import { useSearchParams } from "next/navigation";

/** Shows the Auth.js error from the query string after a failed sign-in. */
export function LoginError() {
  const sp = useSearchParams();
  const error = sp.get("error");
  if (!error) return null;
  const msg = error === "CredentialsSignin" ? "That email and password did not match. Try again." : "Sign-in failed. Please try again.";
  return (
    <p role="alert" className="mt-4 rounded-md border border-brand bg-brand/15 px-3 py-2 text-sm font-semibold text-brand-light">
      {msg}
    </p>
  );
}
