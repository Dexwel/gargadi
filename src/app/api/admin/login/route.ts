import { NextResponse } from "next/server";
import { z } from "zod";
import { createSessionValue, SESSION_COOKIE, sessionMaxAge } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { rateLimit, clientIp } from "@/lib/ratelimit";

export async function POST(req: Request) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32 || !process.env.ADMIN_PASSWORD_HASH) {
    return NextResponse.json({ error: "Admin login is not configured. Set ADMIN_PASSWORD_HASH and SESSION_SECRET." }, { status: 503 });
  }
  const rl = await rateLimit("login", clientIp(req), 8, 900).catch(() => ({ ok: true }));
  if (!rl.ok) return NextResponse.json({ error: "Too many attempts. Wait 15 minutes." }, { status: 429 });
  const parsed = z.object({ password: z.string().min(1).max(200) }).safeParse(await req.json().catch(() => null));
  if (!parsed.success || !verifyPassword(parsed.data.password, process.env.ADMIN_PASSWORD_HASH)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionValue(secret), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: sessionMaxAge,
  });
  return res;
}
