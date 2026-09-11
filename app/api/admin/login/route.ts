import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  verifyPassword,
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Podaj e-mail i hasło" }, { status: 400 });
  }

  const user = await prisma.adminUser.findUnique({ where: { email } });
  // Same response whether the account or the password is wrong.
  const valid = user ? await verifyPassword(password, user.passwordHash) : false;

  if (!user || !valid) {
    return NextResponse.json({ error: "Nieprawidłowy e-mail lub hasło" }, { status: 401 });
  }

  const token = await createSessionToken({ sub: String(user.id), email: user.email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
