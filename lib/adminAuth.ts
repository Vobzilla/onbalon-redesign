import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "onbalon_admin";
const SESSION_HOURS = 12;

export type AdminSession = { sub: string; email: string };

// Kept as a function (not a module-level const) so a missing secret fails at
// request time with a clear message instead of breaking the whole build.
function secretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET is missing or shorter than 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(session: AdminSession): Promise<string> {
  return new SignJWT({ email: session.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(secretKey());
}

// Used by both the Edge middleware and Node route handlers, so it must stay
// free of Node-only APIs (jose uses Web Crypto on both).
export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.sub || typeof payload.email !== "string") return null;
    return { sub: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = SESSION_HOURS * 60 * 60;
