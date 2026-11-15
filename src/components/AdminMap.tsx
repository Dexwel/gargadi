"use client";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { site } from "@/config/site";

export type CoverageRow = { id: number; name: string; lat: number; lng: number; households: number };

export default function AdminMap({ rows }: { rows: CoverageRow[] }) {
  return (
    <div className="h-[320px] overflow-hidden rounded-card border border-ink/10" role="region" aria-label="Coverage map (simulated)">
      <MapContainer center={[site.pilot.lat, site.pilot.lng]} zoom={11} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {rows.map((r) => (
          <CircleMarker key={r.id} center={[r.lat, r.lng]} radius={8 + Math.sqrt(r.households) * 3} pathOptions={{ color: "#0A4660", fillColor: "#0E5E7E", fillOpacity: 0.5 }}>
            <Popup><strong>{r.name}</strong><br />{r.households} registered households</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
