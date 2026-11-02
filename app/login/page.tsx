import type { Metadata } from "next";
import { LoginShell } from "./login-shell";

export const metadata: Metadata = {
  title: "Client Login",
  robots: { index: false, follow: false },
};

/** Client portal login. The portal opens in Phase 2; until then this is a styled placeholder. */
export default function ClientLoginPage() {
  return (
    <LoginShell mode="client" title="Client portal" blurb="Track your build, review previews, and see invoices.">
      <p className="mt-3 text-cream/80">
        The client portal is not open yet. Current clients will get their login by email when it launches.
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
        <button type="button" className="w-full rounded-md bg-brand-text px-4 py-3 font-bold text-white">
          Sign in
        </button>
      </fieldset>
    </LoginShell>
  );
}
