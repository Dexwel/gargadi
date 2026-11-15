import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { alertSchema } from "@/lib/validation";
import { dispatchAlert, dispatchDueAlerts } from "@/lib/dispatch";
import { isAdmin } from "@/lib/adminGuard";
import { getSender } from "@/lib/senders";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const alerts = await getSql()`
    SELECT a.id, a.risk_type, a.level, a.status, a.scheduled_for, a.sent_at, a.recipients, a.sender_mode, a.is_simulated, a.created_at, c.name AS community
    FROM alerts a JOIN communities c ON c.id = a.community_id ORDER BY a.created_at DESC LIMIT 100`;
  return NextResponse.json({ alerts, senderMode: getSender().mode });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (body?.action === "process-due") return NextResponse.json(await dispatchDueAlerts());
  const parsed = alertSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  const d = parsed.data;
  const scheduled = d.scheduledFor ? new Date(d.scheduledFor) : null;
  const later = scheduled && scheduled.getTime() > Date.now() + 30_000;
  const sql = getSql();
  const [row] = await sql`INSERT INTO alerts (risk_type, level, community_id, status, scheduled_for)
    VALUES (${d.riskType}, ${d.level}, ${d.communityId}, 'scheduled', ${later ? scheduled : null}) RETURNING id`;
  if (later) return NextResponse.json({ ok: true, id: row.id, status: "scheduled" });
  const result = await dispatchAlert(row.id);
  return NextResponse.json({ ok: true, id: row.id, status: "sent", ...result, mode: getSender().mode });
}
