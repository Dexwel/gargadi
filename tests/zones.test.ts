import { describe, expect, it } from "vitest";
import { simulatedZones } from "@/lib/zones";

describe("simulated map zones", () => {
  it("provides labelled examples for both risk types and all levels", () => {
    expect(simulatedZones).toHaveLength(6);
    expect(new Set(simulatedZones.map((zone) => zone.kind))).toEqual(new Set(["flood", "disease"]));
    expect(new Set(simulatedZones.map((zone) => zone.level))).toEqual(new Set(["low", "medium", "high"]));
    expect(simulatedZones.every((zone) => zone.name.includes("(simulated)"))).toBe(true);
  });
});
