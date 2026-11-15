"use client";
import { useEffect, useState } from "react";
import { LANGS, NEEDS_REVIEW, TTS_LANG, renderSms, renderWhatsApp, smsSegments, type Lang, type Level, type RiskType } from "@/lib/messages";
import { site } from "@/config/site";
import { useLang } from "./LangProvider";

export function AlertSimulator() {
  const { lang: uiLang } = useLang();
  const [risk, setRisk] = useState<RiskType>("flood");
  const [level, setLevel] = useState<Level>("high");
  const [lang, setLang] = useState<Lang>("en");
  const [channel, setChannel] = useState<"sms" | "whatsapp">("whatsapp");
  const [note, setNote] = useState("");
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => setLang(uiLang), [uiLang]);
  useEffect(() => () => { if (typeof window !== "undefined") window.speechSynthesis?.cancel(); }, []);

  const input = { lang, risk, level, community: site.pilot.name };
  const sms = renderSms(input);
  const wa = renderWhatsApp(input);
  const body = channel === "sms" ? sms : wa;
  const seg = smsSegments(sms);

  function speak() {
    setNote("");
    if (typeof window === "undefined" || !window.speechSynthesis) { setNote("This browser cannot read text aloud."); return; }
    window.speechSynthesis.cancel();
    const text = sms.replace(/^\[KANURI[^\]]*\]\n/, "");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = TTS_LANG[lang];
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.toLowerCase().startsWith(lang));
    if (match) u.voice = match;
    else if (lang !== "en") setNote(`No ${lang === "ha" ? "Hausa" : "Kanuri"} voice is installed on this device. A native-speaker recording is needed for real audio alerts. The sound you hear may be a different language's voice.`);
    u.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="card space-y-4">
        <fieldset><legend className="label">Risk type</legend>
          <div className="flex gap-2">{([["flood", "🌊 Flood"], ["malaria", "🦟 Malaria"]] as const).map(([v, l]) => <button type="button" key={v} aria-pressed={risk === v} onClick={() => setRisk(v)} className={risk === v ? "btn-primary" : "btn-secondary"}>{l}</button>)}</div>
        </fieldset>
        <fieldset><legend className="label">Level</legend>
          <div className="flex gap-2">{(["medium", "high"] as const).map((v) => <button type="button" key={v} aria-pressed={level === v} onClick={() => setLevel(v)} className={level === v ? "btn-primary" : "btn-secondary"}>{v === "high" ? "High" : "Medium"}</button>)}</div>
        </fieldset>
        <fieldset><legend className="label">Language</legend>
          <div className="flex flex-wrap gap-2">{LANGS.map((l) => <button type="button" key={l.code} aria-pressed={lang === l.code} onClick={() => setLang(l.code)} className={lang === l.code ? "btn-primary" : "btn-secondary"}>{l.label}</button>)}</div>
        </fieldset>
        <fieldset><legend className="label">Channel</legend>
          <div className="flex gap-2">{([["whatsapp", "WhatsApp"], ["sms", "SMS"]] as const).map(([v, l]) => <button type="button" key={v} aria-pressed={channel === v} onClick={() => setChannel(v)} className={channel === v ? "btn-primary" : "btn-secondary"}>{l}</button>)}</div>
        </fieldset>
        {NEEDS_REVIEW[lang] && (
          <p role="note" className="rounded-xl bg-sun-light p-3 text-sun-dark"><strong>Translation not final.</strong> {lang === "ha" ? "This Hausa text is a draft. A native speaker must review it before any real use." : "Kanuri translation is still needed. The English message is shown with a placeholder."}</p>
        )}
        <div>
          <button type="button" onClick={speak} className="btn-sun">{speaking ? "🔊 Playing…" : "▶ Listen (audio)"}</button>
          <p className="mt-2 text-sm text-mist" aria-live="polite">{note || "Audio uses your browser's text-to-speech. Real Hausa and Kanuri audio needs native-speaker recordings."}</p>
        </div>
        {channel === "sms" && (
          <p className="text-sm text-mist">SMS: {seg.chars} characters, {seg.segments} message part{seg.segments > 1 ? "s" : ""}.{seg.unicode ? " Hausa special letters (ɗ, ƙ, ɓ) switch SMS to Unicode, so each part holds fewer characters and costs more. WhatsApp has no such limit." : ""}</p>
        )}
      </div>

      <div aria-label="Phone preview (simulated)" className="mx-auto w-full max-w-[300px]">
        <div className="rounded-[36px] bg-ink p-3 shadow-lg">
          <div className={`min-h-[380px] rounded-[26px] p-3 ${channel === "whatsapp" ? "bg-[#E7DDD0]" : "bg-white"}`}>
            <p className="mb-3 text-center text-xs font-bold text-mist">{channel === "whatsapp" ? "WhatsApp" : "Messages"} · Gargadi</p>
            <div className={`max-w-[92%] whitespace-pre-wrap rounded-2xl p-3 text-[15px] leading-snug ${channel === "whatsapp" ? "rounded-tl-sm bg-white" : "rounded-tl-sm bg-river-light"}`}>
              {body}
              <p className="mt-1 text-right text-[11px] text-mist">{channel === "whatsapp" ? "08:15 ✓✓" : "08:15"}</p>
            </div>
            <p className="mt-4 text-center text-xs font-bold text-clay-dark">SIMULATED. Nothing was sent.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
