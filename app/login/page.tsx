import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { APP_LOGIN_ENABLED } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Client Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-ink px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-cream/15 bg-ink-soft/40 p-8">
        <Logo onDark />
        <h1 className="mt-8 text-2xl text-cream">Sign in</h1>
        {APP_LOGIN_ENABLED ? (
          <LoginForm />
        ) : (
          <>
            <p className="mt-3 text-cream/80">
              The client portal is not open yet. Current clients: we will send your login when the portal launches.
            </p>
            <fieldset disabled className="mt-6 space-y-3 opacity-50">
              <label className="block text-sm font-semibold text-cream" htmlFor="email">
                Email
              </label>
              <input id="email" type="email" className="w-full rounded-md border border-cream/20 bg-ink px-3 py-2.5 text-cream" />
              <label className="block text-sm font-semibold text-cream" htmlFor="password">
                Password
              </label>
              <input id="password" type="password" className="w-full rounded-md border border-cream/20 bg-ink px-3 py-2.5 text-cream" />
              <button type="button" className="w-full rounded-md bg-brand px-4 py-3 font-bold text-white">
                Sign in
              </button>
            </fieldset>
          </>
        )}
        <p className="mt-6 text-sm text-cream/60">
          Not a client yet?{" "}
          <Link href="/free-build" className="font-semibold text-brand underline underline-offset-4">
            Get your free build
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
