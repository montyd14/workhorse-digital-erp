import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

/** Server-action login form. Only rendered when ENABLE_APP_LOGIN=true. */
export function LoginForm() {
  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/dashboard",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(`/login/team?error=${err.type === "CredentialsSignin" ? "CredentialsSignin" : "Unknown"}`);
      }
      throw err;
    }
  }

  return (
    <form action={login} className="mt-6 space-y-3">
      <label className="block text-sm font-semibold text-cream" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="w-full rounded-md border border-cream/20 bg-ink px-3 py-2.5 text-cream"
      />
      <label className="block text-sm font-semibold text-cream" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="w-full rounded-md border border-cream/20 bg-ink px-3 py-2.5 text-cream"
      />
      <button type="submit" className="w-full rounded-md bg-brand-text px-4 py-3 font-bold text-white hover:bg-brand-dark">
        Sign in
      </button>
    </form>
  );
}
