import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { isAdmin } from "@/lib/adminGuard";
import { maskPhone } from "@/lib/phone";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await getSql()`SELECT h.id, h.name, h.phone, h.language, h.format, h.channel, h.consent_at, h.is_simulated, c.name AS community
    FROM households h JOIN communities c ON c.id = h.community_id ORDER BY h.created_at DESC LIMIT 200`;
  return NextResponse.json({ households: rows.map((r) => ({ ...r, phone: maskPhone(r.phone as string) })) });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  await getSql()`DELETE FROM households WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
