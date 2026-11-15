import { getSql } from "./db";
import { getSender } from "./senders";
import { renderMessage, renderWhatsApp, renderSms, type Lang, type Level, type RiskType } from "./messages";

type Household = { id: string; phone: string; language: Lang; format: "text" | "audio"; channel: "sms" | "whatsapp" };

/** Live mode only sends languages listed in REVIEWED_LANGUAGES (default "en"). Others fall back to English. */
export function effectiveLang(lang: Lang, mode: "mock" | "twilio"): Lang {
  if (mode === "mock") return lang;
  const reviewed = (process.env.REVIEWED_LANGUAGES ?? "en").split(",").map((s) => s.trim());
  return reviewed.includes(lang) ? lang : "en";
}

export async function dispatchAlert(alertId: number) {
  const sql = getSql();
  const [alert] = await sql`SELECT a.*, c.name AS community_name FROM alerts a JOIN communities c ON c.id = a.community_id WHERE a.id = ${alertId}`;
  if (!alert) throw new Error("Alert not found");
  if (alert.status === "sent") return { sent: 0, failed: 0 };
  const sender = getSender();
  const people = (await sql`SELECT id, phone, language, format, channel FROM households WHERE community_id = ${alert.community_id}`) as unknown as Household[];

  let sent = 0, failed = 0;
  for (const h of people) {
    const lang = effectiveLang(h.language, sender.mode);
    const input = { lang, risk: alert.risk_type as RiskType, level: alert.level as Level, community: alert.community_name as string };
    const body = h.channel === "whatsapp" ? renderWhatsApp(input) : renderSms(input);
    const r = await sender.send({ to: h.phone, body: alert.message_override ?? body, channel: h.channel, audio: h.format === "audio" });
    if (r.ok) sent++; else failed++;
  }
  await sql`UPDATE alerts SET status = ${failed > 0 && sent === 0 ? "failed" : "sent"}, sent_at = now(), recipients = ${sent}, sender_mode = ${sender.mode} WHERE id = ${alertId}`;
  return { sent, failed };
}

export async function dispatchDueAlerts() {
  const sql = getSql();
  const due = await sql`SELECT id FROM alerts WHERE status = 'scheduled' AND scheduled_for <= now()`;
  let total = 0;
  for (const a of due) total += (await dispatchAlert(a.id)).sent;
  return { alerts: due.length, messages: total };
}

export { renderMessage };
