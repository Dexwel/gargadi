import { describe, it, expect } from "vitest";
import { signupSchema, alertSchema, contactSchema, deleteSchema } from "@/lib/validation";
import { normalizeNgPhone, maskPhone } from "@/lib/phone";

const valid = { phone: "0803 000 0000", communityId: "1", language: "ha", format: "audio", channel: "whatsapp", consent: true };

describe("phone", () => {
  it("normalises Nigerian formats to E.164", () => {
    expect(normalizeNgPhone("08030000000")).toBe("+2348030000000");
    expect(normalizeNgPhone("+234 803 000 0000")).toBe("+2348030000000");
    expect(normalizeNgPhone("2348030000000")).toBe("+2348030000000");
  });
  it("rejects bad numbers", () => {
    expect(normalizeNgPhone("12345")).toBeNull();
    expect(normalizeNgPhone("0603000000")).toBeNull();
  });
  it("masks numbers", () => expect(maskPhone("+2348030000000")).toBe("+234803***00"));
});

describe("sign-up flow validation", () => {
  it("accepts a valid, consented registration and normalises the phone", () => {
    const r = signupSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) { expect(r.data.phone).toBe("+2348030000000"); expect(r.data.communityId).toBe(1); expect(r.data.name).toBeUndefined(); }
  });
  it("REQUIRES explicit consent", () => {
    expect(signupSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(signupSchema.safeParse({ ...valid, consent: undefined }).success).toBe(false);
  });
  it("rejects invalid phone, language, channel", () => {
    expect(signupSchema.safeParse({ ...valid, phone: "abc" }).success).toBe(false);
    expect(signupSchema.safeParse({ ...valid, language: "fr" }).success).toBe(false);
    expect(signupSchema.safeParse({ ...valid, channel: "email" }).success).toBe(false);
  });
  it("name is optional but length-limited", () => {
    expect(signupSchema.safeParse({ ...valid, name: "a".repeat(81) }).success).toBe(false);
  });
  it("passes the honeypot value through so the route can silently drop bots", () => {
    const r = signupSchema.safeParse({ ...valid, website: "spam.com" });
    expect(r.success && r.data.website).toBe("spam.com");
  });
});

describe("alert creation validation", () => {
  it("accepts an immediate alert", () => expect(alertSchema.safeParse({ riskType: "flood", level: "high", communityId: 1 }).success).toBe(true));
  it("accepts a scheduled alert and an empty schedule", () => {
    expect(alertSchema.safeParse({ riskType: "malaria", level: "medium", communityId: "2", scheduledFor: "2030-01-01T08:00:00.000Z" }).success).toBe(true);
    expect(alertSchema.safeParse({ riskType: "malaria", level: "medium", communityId: "2", scheduledFor: "" }).success).toBe(true);
  });
  it("rejects unknown risk types or low level", () => {
    expect(alertSchema.safeParse({ riskType: "fire", level: "high", communityId: 1 }).success).toBe(false);
    expect(alertSchema.safeParse({ riskType: "flood", level: "low", communityId: 1 }).success).toBe(false);
  });
});

describe("other forms", () => {
  it("validates contact", () => {
    expect(contactSchema.safeParse({ name: "A", email: "a@b.co", message: "hello there" }).success).toBe(true);
    expect(contactSchema.safeParse({ name: "A", email: "nope", message: "hello there" }).success).toBe(false);
  });
  it("validates delete request", () => {
    expect(deleteSchema.safeParse({ phone: "0803", token: "short" }).success).toBe(false);
    expect(deleteSchema.safeParse({ phone: "08030000000", token: "abcdefghijkl" }).success).toBe(true);
  });
});
