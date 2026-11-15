import { describe, it, expect } from "vitest";
import { scryptSync } from "crypto";
import { createSessionValue, verifySessionValue } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { effectiveLang } from "@/lib/dispatch";

const SECRET = "x".repeat(40);

describe("admin session", () => {
  it("verifies a fresh session", async () => expect(await verifySessionValue(await createSessionValue(SECRET), SECRET)).toBe(true));
  it("rejects tampering, wrong secret, expiry, empty", async () => {
    const v = await createSessionValue(SECRET);
    expect(await verifySessionValue(v + "0", SECRET)).toBe(false);
    expect(await verifySessionValue(v, "y".repeat(40))).toBe(false);
    expect(await verifySessionValue(v, SECRET, Date.now() + 9 * 3600 * 1000)).toBe(false);
    expect(await verifySessionValue(undefined, SECRET)).toBe(false);
    expect(await verifySessionValue(v, undefined)).toBe(false);
  });
  it("checks scrypt password hashes", () => {
    const salt = "ab".repeat(8);
    const stored = `${salt}:${scryptSync("correct-horse-1", salt, 32).toString("hex")}`;
    expect(verifyPassword("correct-horse-1", stored)).toBe(true);
    expect(verifyPassword("wrong", stored)).toBe(false);
    expect(verifyPassword("x", undefined)).toBe(false);
  });
});

describe("live-mode language safety", () => {
  it("mock mode keeps every language", () => expect(effectiveLang("kr", "mock")).toBe("kr"));
  it("live mode falls back to English for unreviewed languages", () => {
    delete process.env.REVIEWED_LANGUAGES;
    expect(effectiveLang("ha", "twilio")).toBe("en");
    expect(effectiveLang("kr", "twilio")).toBe("en");
    process.env.REVIEWED_LANGUAGES = "en,ha";
    expect(effectiveLang("ha", "twilio")).toBe("ha");
    expect(effectiveLang("kr", "twilio")).toBe("en");
  });
});
