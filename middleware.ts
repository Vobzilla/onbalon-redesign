import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminAuth";

// Runs on the Edge runtime, so it only verifies the signed session cookie —
// no DB access here.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  if (isLoginApi) return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (isLoginPage) {
    // Already signed in — skip the form.
    if (session) {
      return NextResponse.redirect(new URL("/admin/products", request.url));
    }
    return NextResponse.next();
  }

  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
