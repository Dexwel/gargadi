import type { Metadata } from "next";
import { PageHero, Section, Cta } from "@/components/Bits";

export const metadata: Metadata = { title: "How it works", description: "Two continuous phases: community awareness and risk communication." };

const steps = [
  { phase: 1, icon: "🗺️", title: "Map", text: "We map the community with local leaders: homes, low ground, water points, clinics." },
  { phase: 1, icon: "🤝", title: "Visit", text: "Volunteers, public health practitioners and modelers visit. They explain risks in simple words." },
  { phase: 1, icon: "✅", title: "Consent", text: "Families who want alerts choose to share a number. They pick language, text or audio, WhatsApp or SMS." },
  { phase: 2, icon: "📡", title: "Alert", text: "When flood or disease risk is high, a short message goes out in the family's language." },
  { phase: 2, icon: "🏃", title: "Act", text: "Families know what to do: move, protect, treat early, report. Then the visits continue." },
];

export default function How() {
  return (
    <>
      <PageHero title="How it works" lead="Two phases that run together. Awareness builds trust. Alerts use it." />
      <Section>
        <ol className="grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className={`card ${s.phase === 1 ? "border-river/40" : "border-sun"}`}>
              <span className={`badge ${s.phase === 1 ? "bg-river text-white" : "bg-sun text-ink"}`}>Phase {s.phase}</span>
              <p className="mt-3 text-3xl" aria-hidden="true">{s.icon}</p>
              <h3 className="mt-1">{i + 1}. {s.title}</h3>
              <p className="mt-2 text-ink/80">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 rounded-xl bg-river-light p-4">↺ <strong>It loops.</strong> What we learn from each alert and each visit improves the next one. Phase 1 is ongoing, not a one-time event.</p>
      </Section>
      <Section>
        <h2>Principles we keep</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {[["Consent first", "No number is stored without a clear yes. Anyone can ask to be deleted."], ["Language matters", "Hausa and Kanuri messages are written and checked by native speakers. Never machine-translated and left."], ["Short and useful", "Every alert says what is coming and what to do. Nothing more."]].map(([t, d]) => (
            <li key={t} className="card"><h3>{t}</h3><p className="mt-2 text-ink/80">{d}</p></li>
          ))}
        </ul>
        <div className="mt-8"><Cta /></div>
      </Section>
    </>
  );
}
