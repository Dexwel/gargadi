import { z } from "zod";
import { normalizeNgPhone } from "./phone";

export const CONSENT_VERSION = "v1";

export const signupSchema = z.object({
  name: z.string().trim().max(80).optional().transform((v) => (v ? v : undefined)),
  phone: z.string().trim().transform((v, ctx) => {
    const n = normalizeNgPhone(v);
    if (!n) ctx.addIssue({ code: "custom", message: "Enter a valid Nigerian phone number" });
    return n ?? "";
  }),
  communityId: z.coerce.number().int().positive(),
  language: z.enum(["en", "ha", "kr"]),
  format: z.enum(["text", "audio"]),
  channel: z.enum(["sms", "whatsapp"]),
  consent: z.literal(true, { message: "Consent is required to register" }),
  website: z.string().max(200).optional(), // honeypot: real users leave it empty; routes silently drop filled ones
});
export type SignupInput = z.infer<typeof signupSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(5).max(2000),
  website: z.string().max(0).optional(),
});

export const alertSchema = z.object({
  riskType: z.enum(["flood", "malaria"]),
  level: z.enum(["medium", "high"]),
  communityId: z.coerce.number().int().positive(),
  scheduledFor: z.string().datetime({ offset: true }).optional().or(z.literal("").transform(() => undefined)),
});

export const deleteSchema = z.object({
  phone: z.string().trim(),
  token: z.string().trim().min(10).max(100),
});
