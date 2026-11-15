import { NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import { getSql } from "@/lib/db";
import { signupSchema, CONSENT_VERSION } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    const rl = await rateLimit("signup", clientIp(req), 5, 3600);
    if (!rl.ok) return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });

    const parsed = signupSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    }
    const d = parsed.data;
    if (d.website) return NextResponse.json({ ok: true }); // honeypot: pretend success

    const sql = getSql();
    const [community] = await sql`SELECT id FROM communities WHERE id = ${d.communityId}`;
    if (!community) return NextResponse.json({ error: "Unknown community" }, { status: 400 });

    const token = randomBytes(9).toString("base64url");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    try {
      await sql`INSERT INTO households (name, phone, community_id, language, format, channel, consent_at, consent_version, delete_token_hash)
        VALUES (${d.name ?? null}, ${d.phone}, ${d.communityId}, ${d.language}, ${d.format}, ${d.channel}, now(), ${CONSENT_VERSION}, ${tokenHash})`;
    } catch (e) {
      if ((e as { code?: string }).code === "23505") {
        return NextResponse.json({ error: "This number is already registered." }, { status: 409 });
      }
      throw e;
    }
    // The delete token is shown once. Only its hash is stored.
    return NextResponse.json({ ok: true, deleteToken: token });
  } catch (e) {
    console.error("signup error", e);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
