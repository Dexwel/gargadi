import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { isAdmin } from "@/lib/adminGuard";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sql = getSql();
  const [byCommunity, byLanguage, byChannel, volunteers, communities, perDay] = await Promise.all([
    sql`SELECT c.id, c.name, c.lat, c.lng, COUNT(h.id)::int AS households FROM communities c LEFT JOIN households h ON h.community_id = c.id GROUP BY c.id ORDER BY c.id`,
    sql`SELECT language AS label, COUNT(*)::int AS value FROM households GROUP BY language ORDER BY value DESC`,
    sql`SELECT channel AS label, COUNT(*)::int AS value FROM households GROUP BY channel ORDER BY value DESC`,
    sql`SELECT v.id, v.name, v.role, c.name AS community FROM volunteers v LEFT JOIN communities c ON c.id = v.community_id ORDER BY v.id`,
    sql`SELECT id, name FROM communities ORDER BY id`,
    sql`SELECT to_char(date_trunc('day', consent_at), 'DD Mon') AS label, COUNT(*)::int AS value FROM households WHERE consent_at > now() - interval '14 days' GROUP BY date_trunc('day', consent_at) ORDER BY date_trunc('day', consent_at)`,
  ]);
  return NextResponse.json({ byCommunity, byLanguage, byChannel, volunteers, communities, perDay });
}
