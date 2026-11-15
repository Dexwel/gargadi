"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setError("");
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }).catch(() => null);
    if (res?.ok) { router.push("/admin"); router.refresh(); }
    else { const j = res ? await res.json().catch(() => ({})) : {}; setError(j.error ?? "Could not log in."); setBusy(false); }
  }
  return (
    <div className="container-x py-16">
      <form onSubmit={onSubmit} className="card mx-auto max-w-sm space-y-4" aria-label="Admin login">
        <h1 className="text-3xl">Admin login</h1>
        <div><label className="label" htmlFor="pw">Password</label><input id="pw" name="password" type="password" required autoComplete="current-password" className="field" /></div>
        <button className="btn-primary w-full" disabled={busy}>{busy ? "Checking…" : "Log in"}</button>
        <p role="alert" className="font-bold text-clay-dark">{error}</p>
      </form>
    </div>
  );
}
