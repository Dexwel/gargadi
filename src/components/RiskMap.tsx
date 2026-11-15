"use client";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup, CircleMarker } from "react-leaflet";
import { site } from "@/config/site";

type Zone = { id: number; kind: "flood" | "disease"; level: "low" | "medium" | "high"; name: string; lat: number; lng: number; radius_m: number };
const COLORS = { low: "#2F7D4F", medium: "#F2A93B", high: "#C2410C" } as const;
const LABEL = { low: "Low", medium: "Medium", high: "High" } as const;

export default function RiskMap({ height = 420 }: { height?: number }) {
  const [zones, setZones] = useState<Zone[]>([]);
  const [kind, setKind] = useState<"flood" | "disease">("flood");

  useEffect(() => {
    fetch("/api/zones").then((r) => r.json()).then((j) => setZones(j.zones ?? [])).catch(() => setZones([]));
  }, []);
  const shown = useMemo(() => zones.filter((z) => z.kind === kind), [zones, kind]);

  return (
    <div>
      <div role="tablist" aria-label="Risk type" className="mb-3 flex gap-2">
        {(["flood", "disease"] as const).map((k) => (
          <button key={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)} className={kind === k ? "btn-primary" : "btn-secondary"}>
            {k === "flood" ? "🌊 Flood risk" : "🦟 Disease risk"}
          </button>
        ))}
      </div>
      <div style={{ height }} className="overflow-hidden rounded-card border border-ink/10" role="region" aria-label="Simulated risk map">
        <MapContainer center={[site.pilot.lat, site.pilot.lng]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CircleMarker center={[site.pilot.lat, site.pilot.lng]} radius={6} pathOptions={{ color: "#0B2A3A", fillColor: "#0B2A3A", fillOpacity: 1 }}>
            <Popup>{site.pilot.name} (placeholder centre)</Popup>
          </CircleMarker>
          {shown.map((z) => (
            <Circle key={z.id} center={[z.lat, z.lng]} radius={z.radius_m} pathOptions={{ color: COLORS[z.level], fillColor: COLORS[z.level], fillOpacity: 0.35, weight: 2, dashArray: z.level === "low" ? "4 6" : z.level === "medium" ? "10 4" : undefined }}>
              <Popup><strong>{LABEL[z.level]} {z.kind} risk</strong><br />{z.name}<br /><em>Simulated data</em></Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
      <ul className="mt-3 flex flex-wrap gap-3 text-sm" aria-label="Legend">
        {(["low", "medium", "high"] as const).map((l) => (
          <li key={l} className="flex items-center gap-2"><span className="inline-block h-4 w-4 rounded-full border-2" style={{ background: COLORS[l] + "66", borderColor: COLORS[l] }} aria-hidden="true" />{LABEL[l]}</li>
        ))}
        <li className="text-mist">Zones are simulated. Boundaries are placeholders.</li>
      </ul>
    </div>
  );
}
