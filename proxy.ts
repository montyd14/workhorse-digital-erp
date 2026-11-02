import { NextResponse, type NextRequest } from "next/server";

/**
 * Protects the private (app) routes. In Next.js 16 this file replaces
 * middleware.ts; the behaviour is the same.
 *
 * It does an optimistic check for the Auth.js session cookie so no database
 * call runs here. Real authorization (and role checks) happen in the page or
 * action with requireRole() from lib/auth.ts.
 */
const PROTECTED_PREFIXES = ["/dashboard", "/crm", "/erp"];

const SESSION_COOKIES = ["__Secure-authjs.session-token", "authjs.session-token"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (!isProtected) return NextResponse.next();

  const loginEnabled = process.env.ENABLE_APP_LOGIN === "true";
  const hasSession = SESSION_COOKIES.some((name) => request.cookies.has(name));

  if (!loginEnabled || !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login/team";
    url.search = loginEnabled ? `?next=${encodeURIComponent(pathname)}` : "";
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/crm/:path*", "/erp/:path*"],
};
