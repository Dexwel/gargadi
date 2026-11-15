import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSql } from "@/lib/db";
import { deleteSchema } from "@/lib/validation";
import { normalizeNgPhone } from "@/lib/phone";
import { rateLimit, clientIp } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    const rl = await rateLimit("delete", clientIp(req), 10, 3600);
    if (!rl.ok) return NextResponse.json({ error: "Too many attempts." }, { status: 429 });
    const parsed = deleteSchema.safeParse(await req.json().catch(() => null));
    const phone = parsed.success ? normalizeNgPhone(parsed.data.phone) : null;
    if (!parsed.success || !phone) return NextResponse.json({ error: "Check the phone number and code." }, { status: 400 });
    const hash = createHash("sha256").update(parsed.data.token).digest("hex");
    const sql = getSql();
    const rows = await sql`DELETE FROM households WHERE phone = ${phone} AND delete_token_hash = ${hash} RETURNING id`;
    if (rows.length === 0) return NextResponse.json({ error: "No matching record. Check the phone number and code." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("delete error", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
