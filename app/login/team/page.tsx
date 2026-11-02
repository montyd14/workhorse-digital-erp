import type { Metadata } from "next";
import { APP_LOGIN_ENABLED } from "@/lib/auth";
import { LoginForm } from "../login-form";
import { LoginShell } from "../login-shell";

export const metadata: Metadata = {
  title: "Team Login",
  robots: { index: false, follow: false },
};

/** Backend login for the Workhorse team (ERP / company manager). Enabled by ENABLE_APP_LOGIN. */
export default function TeamLoginPage() {
  return (
    <LoginShell mode="team" title="Team sign in" blurb="Leads, clients, projects, and billing. Staff only.">
      {APP_LOGIN_ENABLED ? (
        <LoginForm />
      ) : (
        <>
          <p className="mt-3 text-cream/80">The company manager is being set up. Sign-in opens with Phase 2.</p>
          <fieldset disabled className="mt-6 space-y-3 opacity-50">
            <label className="block text-sm font-semibold text-cream" htmlFor="email">
              Work email
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
        </>
      )}
    </LoginShell>
  );
}
