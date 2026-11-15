import type { Channel } from "./messages";

export interface SendResult { ok: boolean; id?: string; error?: string }
export interface Sender {
  mode: "mock" | "twilio";
  send(args: { to: string; body: string; channel: Channel; audio: boolean }): Promise<SendResult>;
}

/** Default. Sends nothing. Safe for demos. */
export const mockSender: Sender = {
  mode: "mock",
  async send({ to }) {
    return { ok: true, id: `mock-${Date.now()}-${to.slice(-4)}` };
  },
};

/**
 * Real SMS + WhatsApp through Twilio's REST API.
 * Audio: WhatsApp can carry a recorded voice note via MediaUrl. That needs native-speaker recordings
 * hosted at a public URL. Until you have them, audio households receive the text version.
 */
export const twilioSender: Sender = {
  mode: "twilio",
  async send({ to, body, channel }) {
    const sid = process.env.TWILIO_ACCOUNT_SID, token = process.env.TWILIO_AUTH_TOKEN;
    const from = channel === "whatsapp" ? process.env.TWILIO_WHATSAPP_FROM : process.env.TWILIO_SMS_FROM;
    if (!sid || !token || !from) return { ok: false, error: "Twilio env vars missing" };
    const params = new URLSearchParams({
      To: channel === "whatsapp" ? `whatsapp:${to}` : to,
      From: from,
      Body: body,
    });
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: { Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"), "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const json = (await res.json().catch(() => ({}))) as { sid?: string; message?: string };
    return res.ok ? { ok: true, id: json.sid } : { ok: false, error: json.message ?? `HTTP ${res.status}` };
  },
};

export function getSender(): Sender {
  return process.env.ALERT_SENDER === "twilio" ? twilioSender : mockSender;
}
