"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CoverageRow } from "./AdminMap";

const AdminMap = dynamic(() => import("./AdminMap"), { ssr: false, loading: () => <div className="h-[320px] rounded-card bg-river-light" /> });

type Stats = {
  byCommunity: CoverageRow[]; byLanguage: { label: string; value: number }[]; byChannel: { label: string; value: number }[];
  volunteers: { id: number; name: string; role: string; community: string | null }[]; communities: { id: number; name: string }[];
  perDay: { label: string; value: number }[];
};
type Alert = { id: number; risk_type: string; level: string; status: string; scheduled_for: string | null; sent_at: string | null; recipients: number; sender_mode: string; is_simulated: boolean; community: string };
type Household = { id: string; name: string | null; phone: string; language: string; format: string; channel: string; consent_at: string; is_simulated: boolean; community: string };

const LANG_NAME: Record<string, string> = { en: "English", ha: "Hausa", kr: "Kanuri" };

function Bars({ data, label, format = (l: string) => l }: { data: { label: string; value: number }[]; label: string; format?: (l: string) => string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <figure>
      <figcaption className="mb-2 font-bold">{label}</figcaption>
      <ul className="space-y-2">
        {data.length === 0 && <li className="text-mist">No data yet.</li>}
        {data.map((d) => (
          <li key={d.label} className="grid grid-cols-[90px_1fr_36px] items-center gap-2 text-sm">
            <span>{format(d.label)}</span>
            <span className="h-4 rounded bg-river-light"><span className="block h-4 rounded bg-river" style={{ width: `${(d.value / max) * 100}%` }} /></span>
            <span className="text-right font-bold">{d.value}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export default function AdminDashboard({ senderMode }: { senderMode: string }) {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [households, setHouseholds] = useState<Household[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [s, a, h] = await Promise.all([fetch("/api/admin/stats"), fetch("/api/admin/alerts"), fetch("/api/admin/households")]);
    if (s.status === 401) { router.push("/admin/login"); return; }
    if (s.ok) setStats(await s.json());
    if (a.ok) setAlerts((await a.json()).alerts);
    if (h.ok) setHouseholds((await h.json()).households);
  }, [router]);
  useEffect(() => { load(); }, [load]);

  async function createAlert(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const f = new FormData(e.currentTarget);
    const when = f.get("scheduledFor") as string;
    const payload = { riskType: f.get("riskType"), level: f.get("level"), communityId: f.get("communityId"), scheduledFor: when ? new Date(when).toISOString() : "" };
    const res = await fetch("/api/admin/alerts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const j = await res.json().catch(() => ({}));
    setMsg(res.ok ? (j.status === "scheduled" ? "Alert scheduled." : `Alert sent via ${j.mode} sender to ${j.sent} household(s).${j.mode === "mock" ? " (Mock: nothing actually left the server.)" : ""}`) : j.error ?? "Failed");
    setBusy(false);
    load();
  }
  async function processDue() {
    const res = await fetch("/api/admin/alerts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "process-due" }) });
    const j = await res.json().catch(() => ({}));
    setMsg(res.ok ? `Processed ${j.alerts} due alert(s), ${j.messages} message(s).` : j.error ?? "Failed");
    load();
  }
  async function del(id: string) {
    if (!confirm("Delete this household record permanently?")) return;
    await fetch(`/api/admin/households?id=${id}`, { method: "DELETE" });
    load();
  }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); router.push("/admin/login"); router.refresh(); }

  const total = stats?.byCommunity.reduce((n, r) => n + r.households, 0) ?? 0;

  return (
    <div className="container-x space-y-8 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl">Admin dashboard</h1>
        <button onClick={logout} className="btn-secondary">Log out</button>
      </div>
      <p role="note" className={`rounded-xl p-3 font-bold ${senderMode === "mock" ? "bg-sun-light text-sun-dark" : "bg-clay-light text-clay-dark"}`}>
        Alert sender: {senderMode === "mock" ? "MOCK. Nothing is really sent." : "LIVE (Twilio). Alerts will reach real phones."} Rows labelled “simulated” are demo data.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card"><p className="text-sm text-mist">Registered households</p><p className="font-display text-4xl font-bold">{total}</p></div>
        <div className="card"><p className="text-sm text-mist">Communities</p><p className="font-display text-4xl font-bold">{stats?.communities.length ?? 0}</p></div>
        <div className="card"><p className="text-sm text-mist">Alerts sent</p><p className="font-display text-4xl font-bold">{alerts.filter((a) => a.status === "sent").length}</p></div>
      </div>

      <section className="grid gap-6 md:grid-cols-2" aria-label="Charts">
        <div className="card"><Bars label="Households by community" data={(stats?.byCommunity ?? []).map((r) => ({ label: r.name, value: r.households }))} /></div>
        <div className="card space-y-6">
          <Bars label="By language" data={stats?.byLanguage ?? []} format={(l) => LANG_NAME[l] ?? l} />
          <Bars label="By channel" data={stats?.byChannel ?? []} format={(l) => (l === "sms" ? "SMS" : "WhatsApp")} />
        </div>
        <div className="card md:col-span-2"><Bars label="Registrations, last 14 days" data={stats?.perDay ?? []} /></div>
      </section>

      <section><h2 className="mb-3 text-2xl">Coverage map</h2><AdminMap rows={stats?.byCommunity ?? []} /></section>

      <section className="grid gap-6 md:grid-cols-2">
        <form onSubmit={createAlert} className="card space-y-4" aria-label="Create alert">
          <h2 className="text-2xl">Create or schedule an alert</h2>
          <div><label className="label" htmlFor="a-risk">Risk type</label><select id="a-risk" name="riskType" className="field"><option value="flood">Flood</option><option value="malaria">Malaria</option></select></div>
          <div><label className="label" htmlFor="a-level">Level</label><select id="a-level" name="level" className="field"><option value="high">High</option><option value="medium">Medium</option></select></div>
          <div><label className="label" htmlFor="a-comm">Community</label><select id="a-comm" name="communityId" className="field">{stats?.communities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className="label" htmlFor="a-when">Send at (leave empty to send now)</label><input id="a-when" name="scheduledFor" type="datetime-local" className="field" /></div>
          <button className="btn-primary" disabled={busy}>{busy ? "Working…" : "Send / schedule"}</button>
          <button type="button" className="btn-secondary ml-2" onClick={processDue}>Process due alerts</button>
          <p role="status" className="font-bold text-river-dark">{msg}</p>
          <p className="text-sm text-mist">Each household gets the message in its own language and channel. Scheduled alerts also go out via the daily cron job.</p>
        </form>
        <div className="card">
          <h2 className="text-2xl">Volunteers</h2>
          <ul className="mt-3 divide-y divide-ink/10">
            {stats?.volunteers.map((v) => <li key={v.id} className="py-2"><strong>{v.name}</strong> · {v.role}<span className="text-mist"> · {v.community ?? "all"}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="card overflow-x-auto">
        <h2 className="text-2xl">Alert history</h2>
        <table className="mt-3 w-full text-left text-sm">
          <caption className="sr-only">Alert history</caption>
          <thead><tr className="border-b border-ink/20"><th className="py-2 pr-3">When</th><th className="pr-3">Type</th><th className="pr-3">Level</th><th className="pr-3">Community</th><th className="pr-3">Status</th><th className="pr-3">Recipients</th><th>Sender</th></tr></thead>
          <tbody>
            {alerts.map((a) => (
              <tr key={a.id} className="border-b border-ink/10">
                <td className="py-2 pr-3">{new Date(a.sent_at ?? a.scheduled_for ?? Date.now()).toLocaleString()}</td>
                <td className="pr-3">{a.risk_type}</td><td className="pr-3">{a.level}</td><td className="pr-3">{a.community}</td>
                <td className="pr-3">{a.status}{a.is_simulated ? " (simulated)" : ""}</td><td className="pr-3">{a.recipients}</td><td>{a.sender_mode}</td>
              </tr>
            ))}
            {alerts.length === 0 && <tr><td colSpan={7} className="py-3 text-mist">No alerts yet.</td></tr>}
          </tbody>
        </table>
      </section>

      <section className="card overflow-x-auto">
        <h2 className="text-2xl">Registered households (latest 200, numbers masked)</h2>
        <table className="mt-3 w-full text-left text-sm">
          <caption className="sr-only">Registered households</caption>
          <thead><tr className="border-b border-ink/20"><th className="py-2 pr-3">Phone</th><th className="pr-3">Community</th><th className="pr-3">Language</th><th className="pr-3">Type</th><th className="pr-3">Channel</th><th className="pr-3">Consent given</th><th><span className="sr-only">Actions</span></th></tr></thead>
          <tbody>
            {households.map((h) => (
              <tr key={h.id} className="border-b border-ink/10">
                <td className="py-2 pr-3">{h.phone}{h.is_simulated ? " (sim)" : ""}</td><td className="pr-3">{h.community}</td><td className="pr-3">{LANG_NAME[h.language]}</td><td className="pr-3">{h.format}</td><td className="pr-3">{h.channel}</td>
                <td className="pr-3">{new Date(h.consent_at).toLocaleDateString()}</td>
                <td><button onClick={() => del(h.id)} className="font-bold text-clay-dark underline">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
