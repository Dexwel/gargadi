"use client";
import { useEffect, useState } from "react";
import { LANGS } from "@/lib/messages";
import { useT } from "./LangProvider";
import Link from "next/link";

type Community = { id: number; name: string; lga: string };

export function SignupForm() {
  const t = useT();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => { fetch("/api/communities").then((r) => r.json()).then((j) => setCommunities(j.communities ?? [])).catch(() => {}); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending"); setError("");
    const f = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(f), consent: f.get("consent") === "on" };
    const res = await fetch("/api/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => null);
    const json = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) { setToken(json.deleteToken ?? ""); setState("done"); }
    else { setState("error"); setError(json.error ?? "Could not register. Please try again."); }
  }

  if (state === "done") {
    return (
      <div className="card border-leaf" role="status">
        <h3 className="text-leaf-dark">You are registered.</h3>
        <p className="mt-2">Thank you. You will only get alerts you agreed to. (In this prototype, no real messages are sent.)</p>
        {token && (
          <div className="mt-4 rounded-xl bg-sun-light p-4 text-sun-dark">
            <p className="font-bold">Your deletion code. Save it now. We show it once.</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-wider">{token}</p>
            <p className="mt-1 text-sm">Use it with your phone number in &ldquo;Delete my record&rdquo; below to remove your data any time.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4" noValidate aria-label={t("signup.title")}>
      <div><label className="label" htmlFor="s-name">{t("signup.name")}</label><input id="s-name" name="name" className="field" maxLength={80} autoComplete="name" /></div>
      <div><label className="label" htmlFor="s-phone">{t("signup.phone")}</label><input id="s-phone" name="phone" type="tel" inputMode="tel" required className="field" placeholder="0803 000 0000" autoComplete="tel" aria-describedby="s-phone-h" /><p id="s-phone-h" className="mt-1 text-sm text-mist">Nigerian number, for example 0803 000 0000.</p></div>
      <div><label className="label" htmlFor="s-community">{t("signup.community")}</label>
        <select id="s-community" name="communityId" required className="field">{communities.map((c) => <option key={c.id} value={c.id}>{c.name}, {c.lga}</option>)}</select></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><label className="label" htmlFor="s-lang">{t("signup.language")}</label><select id="s-lang" name="language" className="field">{LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}</select></div>
        <div><label className="label" htmlFor="s-format">{t("signup.format")}</label><select id="s-format" name="format" className="field"><option value="text">Text</option><option value="audio">Audio</option></select></div>
        <div><label className="label" htmlFor="s-channel">{t("signup.channel")}</label><select id="s-channel" name="channel" className="field"><option value="whatsapp">WhatsApp</option><option value="sms">SMS</option></select></div>
      </div>
      <div className="rounded-xl bg-river-light p-4 text-sm">
        <p className="font-bold">Before you register</p>
        <p className="mt-1">We keep your number, community, language and message choices. Only to send you flood and health alerts. We never sell it. You can delete it any time. <Link href="/privacy">Read the full privacy notice</Link>.</p>
      </div>
      <div className="flex items-start gap-3"><input id="s-consent" name="consent" type="checkbox" required className="mt-1 h-6 w-6 shrink-0" /><label htmlFor="s-consent">{t("signup.consent")}</label></div>
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="btn-primary w-full sm:w-auto" disabled={state === "sending"}>{state === "sending" ? "Saving…" : t("signup.submit")}</button>
      <p role="alert" className="font-bold text-clay-dark">{state === "error" && error}</p>
    </form>
  );
}

export function DeleteForm() {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/delete-record", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(f)) }).catch(() => null);
    const json = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) { setState("done"); setMsg("Your record has been deleted."); } else { setState("error"); setMsg(json.error ?? "Could not delete."); }
  }
  return (
    <form onSubmit={onSubmit} className="card space-y-4" aria-label="Delete my record">
      <div><label className="label" htmlFor="d-phone">Phone number</label><input id="d-phone" name="phone" type="tel" className="field" required /></div>
      <div><label className="label" htmlFor="d-token">Deletion code</label><input id="d-token" name="token" className="field font-mono" required /></div>
      <button className="btn-secondary">Delete my record</button>
      <p role="status" className={state === "done" ? "font-bold text-leaf-dark" : "font-bold text-clay-dark"}>{state !== "idle" && msg}</p>
    </form>
  );
}
