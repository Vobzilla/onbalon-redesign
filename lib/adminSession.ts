import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken, type AdminSession } from "./adminAuth";

// Server-side session read for Server Components and route handlers.
// The middleware is the actual gate; this is used for defence in depth and to
// show who is signed in.
export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
