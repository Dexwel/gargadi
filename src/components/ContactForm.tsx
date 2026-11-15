"use client";
import { useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(f)) }).catch(() => null);
    const json = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) { setState("done"); (e.target as HTMLFormElement).reset(); }
    else { setState("error"); setMsg(json.error ?? "Could not send. Please try again."); }
  }
  return (
    <form onSubmit={onSubmit} className="card space-y-4" noValidate>
      <div><label className="label" htmlFor="c-name">Your name</label><input id="c-name" name="name" required maxLength={100} className="field" autoComplete="name" /></div>
      <div><label className="label" htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" required className="field" autoComplete="email" /></div>
      <div><label className="label" htmlFor="c-msg">Message</label><textarea id="c-msg" name="message" required minLength={5} maxLength={2000} rows={5} className="field" /></div>
      <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
      <p role="status" aria-live="polite" className={state === "error" ? "font-bold text-clay-dark" : "font-bold text-leaf-dark"}>
        {state === "done" && "Thank you. Your message was sent."}{state === "error" && msg}
      </p>
    </form>
  );
}
