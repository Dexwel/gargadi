import { NextResponse } from "next/server";
import { getSql, dbConfigured } from "@/lib/db";
import { site } from "@/config/site";

export const dynamic = "force-dynamic";

/** Falls back to built-in simulated zones if no database is connected, so the public demo never breaks. */
function fallbackZones() {
  const { lat, lng } = site.pilot;
  return [
    { id: 1, community_id: 1, kind: "flood", level: "high", name: "Low-lying area near seasonal stream (simulated)", lat: lat - 0.004, lng: lng + 0.006, radius_m: 450 },
    { id: 2, community_id: 1, kind: "flood", level: "medium", name: "Market road drainage (simulated)", lat: lat + 0.005, lng: lng - 0.004, radius_m: 380 },
    { id: 3, community_id: 1, kind: "flood", level: "low", name: "Higher ground, north (simulated)", lat: lat + 0.012, lng: lng + 0.008, radius_m: 500 },
    { id: 4, community_id: 1, kind: "disease", level: "high", name: "Standing-water pocket (simulated)", lat: lat - 0.008, lng: lng - 0.006, radius_m: 350 },
    { id: 5, community_id: 1, kind: "disease", level: "medium", name: "Dense housing cluster (simulated)", lat: lat + 0.002, lng: lng + 0.002, radius_m: 420 },
    { id: 6, community_id: 1, kind: "disease", level: "low", name: "Clinic catchment edge (simulated)", lat: lat + 0.011, lng: lng - 0.009, radius_m: 450 },
  ];
}

export async function GET() {
  if (!dbConfigured()) return NextResponse.json({ zones: fallbackZones(), fallback: true });
  try {
    const zones = await getSql()`SELECT id, community_id, kind, level, name, lat, lng, radius_m FROM risk_zones ORDER BY id`;
    return NextResponse.json({ zones: zones.length ? zones : fallbackZones() });
  } catch {
    return NextResponse.json({ zones: fallbackZones(), fallback: true });
  }
}
