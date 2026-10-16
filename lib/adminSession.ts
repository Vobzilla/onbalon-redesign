import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken, type AdminSession } from "./adminAuth";

// Server-side session read for Server Components and route handlers.
// The middleware is the actual gate; this is used for defence in depth and to
// show who is signed in.
export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// Returns a 401 response when there is no valid admin session, otherwise null.
// /api/admin/* handlers call it first so they don't depend on middleware alone.
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getAdminSession();
  if (session) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
