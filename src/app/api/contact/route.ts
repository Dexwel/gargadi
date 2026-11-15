import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    const rl = await rateLimit("contact", clientIp(req), 5, 3600);
    if (!rl.ok) return NextResponse.json({ error: "Too many messages. Try again later." }, { status: 429 });
    const parsed = contactSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ ok: true });
    const { name, email, message } = parsed.data;
    await getSql()`INSERT INTO contact_messages (name, email, message) VALUES (${name}, ${email}, ${message})`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact error", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
