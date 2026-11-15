import { site } from "@/config/site";

export type Zone = {
  id: number;
  kind: "flood" | "disease";
  level: "low" | "medium" | "high";
  name: string;
  lat: number;
  lng: number;
  radius_m: number;
};

export const simulatedZones: Zone[] = [
  { id: 1, kind: "flood", level: "high", name: "Low-lying area near seasonal stream (simulated)", lat: site.pilot.lat - 0.004, lng: site.pilot.lng + 0.006, radius_m: 450 },
  { id: 2, kind: "flood", level: "medium", name: "Market road drainage (simulated)", lat: site.pilot.lat + 0.005, lng: site.pilot.lng - 0.004, radius_m: 380 },
  { id: 3, kind: "flood", level: "low", name: "Higher ground, north (simulated)", lat: site.pilot.lat + 0.012, lng: site.pilot.lng + 0.008, radius_m: 500 },
  { id: 4, kind: "disease", level: "high", name: "Standing-water pocket (simulated)", lat: site.pilot.lat - 0.008, lng: site.pilot.lng - 0.006, radius_m: 350 },
  { id: 5, kind: "disease", level: "medium", name: "Dense housing cluster (simulated)", lat: site.pilot.lat + 0.002, lng: site.pilot.lng + 0.002, radius_m: 420 },
  { id: 6, kind: "disease", level: "low", name: "Clinic catchment edge (simulated)", lat: site.pilot.lat + 0.011, lng: site.pilot.lng - 0.009, radius_m: 450 },
];
