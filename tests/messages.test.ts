import { describe, it, expect } from "vitest";
import { renderMessage, renderSms, renderWhatsApp, smsSegments, NEEDS_REVIEW } from "@/lib/messages";

const base = { risk: "flood" as const, level: "high" as const, community: "Testville" };

describe("alert simulator messages", () => {
  it("renders English with community and level", () => {
    const m = renderSms({ ...base, lang: "en" });
    expect(m).toContain("Testville");
    expect(m).toContain("HIGH flood risk");
    expect(m).not.toContain("{");
  });
  it("renders all risk/level/language combinations without leftover placeholders", () => {
    for (const lang of ["en", "ha", "kr"] as const)
      for (const risk of ["flood", "malaria"] as const)
        for (const level of ["medium", "high"] as const)
          expect(renderMessage({ lang, risk, level, community: "X" })).not.toMatch(/\{(community|helpline)\}/);
  });
  it("marks Kanuri as needing translation and never pretends it is translated", () => {
    expect(renderMessage({ ...base, lang: "kr" })).toContain("KANURI TRANSLATION NEEDED");
    expect(NEEDS_REVIEW.kr).toBe(true);
    expect(NEEDS_REVIEW.ha).toBe(true);
    expect(NEEDS_REVIEW.en).toBe(false);
  });
  it("formats WhatsApp with bold header, icon and opt-out", () => {
    const w = renderWhatsApp({ ...base, lang: "en" });
    expect(w).toMatch(/^🌊 \*Gargadi · HIGH\*/);
    expect(w).toContain("Reply STOP");
  });
  it("detects Unicode SMS for Hausa hooked letters and counts parts", () => {
    expect(smsSegments("Hello").unicode).toBe(false);
    expect(smsSegments("ƙaƙa").unicode).toBe(true);
    expect(smsSegments("a".repeat(161)).segments).toBe(2);
    expect(smsSegments("ɗ".repeat(71)).segments).toBe(2);
  });
});
