import { NextResponse } from "next/server";
import { getSql, dbConfigured } from "@/lib/db";
import { site } from "@/config/site";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!dbConfigured()) {
    return NextResponse.json({ communities: [{ id: 1, name: site.pilot.name, lga: site.pilot.lga, lat: site.pilot.lat, lng: site.pilot.lng }], fallback: true });
  }
  const rows = await getSql()`SELECT id, name, lga, lat, lng FROM communities ORDER BY id`;
  return NextResponse.json({ communities: rows });
}
