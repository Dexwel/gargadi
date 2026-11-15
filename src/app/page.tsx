import Link from "next/link";
import { Section, Placeholder, PhaseCard } from "@/components/Bits";
import { HeroPhone } from "@/components/HeroPhone";
import { keyFacts, site } from "@/config/site";

export default function Home() {
  return (
    <>
      <section className="bg-river-light">
        <div className="container-x grid items-center gap-8 py-12 md:grid-cols-[1.3fr_1fr] md:py-20">
          <div>
            <p className="mb-3 font-bold text-river-dark">Community early warning · Yobe State, Nigeria</p>
            <h1>Know early. Act early.</h1>
            <p className="mt-4 max-w-xl text-lg text-ink/80">
              Flood and disease risk is often known before it hits. But the warning does not reach families in time, or in a language they understand. Gargadi fixes that. Short alerts in Hausa, Kanuri and English, by text or audio.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/demo" className="btn-primary">Try the demo</Link>
              <Link href="/how-it-works" className="btn-secondary">See how it works</Link>
            </div>
            <p className="mt-4 text-sm text-mist">Prototype for {site.pilot.name}, {site.pilot.lga}. Nothing is live yet. Demo data is simulated.</p>
          </div>
          <HeroPhone />
        </div>
      </section>

      <Section>
        <h2>The problem, in three facts</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {keyFacts.map((f) => (
            <div key={f.label} className="card">
              <p className="font-display text-4xl font-bold text-river"><Placeholder>{f.value}</Placeholder></p>
              <p className="mt-2">{f.label}</p>
              <p className="mt-2 text-sm text-mist">Source: {f.source}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-mist">We only publish figures we can cite. Replace each marked placeholder in <code>src/config/site.ts</code>.</p>
      </Section>

      <Section>
        <h2>Two phases. One continuous loop.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <PhaseCard n={1} title="Community awareness">
            <p>We map a target community. Then we visit it with volunteers, public health practitioners and modelers. We explain coming risks in simple words. We teach what to do and what to report. This never stops.</p>
          </PhaseCard>
          <PhaseCard n={2} title="Risk communication">
            <p>With each household&apos;s consent, we keep a contact. When flood or disease risk is high, we send a short alert in their language, as text or audio, on WhatsApp or SMS.</p>
          </PhaseCard>
        </div>
      </Section>

      <section className="bg-ink">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-white">See a warning the way a family would.</h2>
            <p className="mt-2 text-white/80">Pick a risk and a language. Watch the message appear on a phone. Hear it read aloud.</p>
          </div>
          <Link href="/demo" className="btn-sun">Try the demo</Link>
        </div>
      </section>
    </>
  );
}
