import type { Metadata } from "next";
import { PageHero, Section, Cta, Placeholder } from "@/components/Bits";
import { keyFacts } from "@/config/site";

export const metadata: Metadata = { title: "The Problem", description: "Why flood and disease warnings do not reach families in Yobe State in time." };

export default function Problem() {
  return (
    <>
      <PageHero title="Warnings exist. Families still get caught out." lead="In Yobe, the rainy season brings flooding and a rise in diseases like malaria. The information to prepare is often available. It rarely reaches the household in time." />
      <Section className="grid gap-8 md:grid-cols-2">
        <div>
          <h2>Flooding</h2>
          <p className="mt-3">Heavy rain, rising rivers and blocked drains can put homes and farms under water. Families lose food, documents, shelter and income. Children and elders are most at risk when people have to move fast.</p>
          <p className="mt-3">Seasonal forecasts and flood outlooks are published by national agencies. But they are written for officials, mostly in English, and usually do not reach a compound at the edge of a community.</p>
        </div>
        <div>
          <h2>Disease</h2>
          <p className="mt-3">Standing water after rain gives mosquitoes places to breed. Malaria cases tend to rise after floods and during the wet season. Cholera and other water-related illnesses can follow.</p>
          <p className="mt-3">Early treatment saves lives. But people need to know the risk is high, what to look for, and when to go to the clinic.</p>
        </div>
      </Section>
      <Section>
        <h2>The gap is communication</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {[["Too late", "Warnings arrive after the water or the fever."], ["Wrong language", "Messages are in English. Many families speak Hausa or Kanuri."], ["Wrong format", "Written notices do not reach people who cannot read. Audio can."]].map(([t, d]) => (
            <li key={t} className="card"><h3>{t}</h3><p className="mt-2 text-ink/80">{d}</p></li>
          ))}
        </ul>
      </Section>
      <Section>
        <h2>Facts we will cite</h2>
        <p className="mt-2 text-ink/80">These are placeholders until we attach a verified source to each one. We do not publish numbers we cannot cite.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {keyFacts.map((f) => (
            <div key={f.label} className="card"><p className="font-display text-3xl font-bold"><Placeholder>{f.value}</Placeholder></p><p className="mt-2">{f.label}</p><p className="mt-1 text-sm text-mist">{f.source}</p></div>
          ))}
        </div>
        <div className="mt-8"><Cta>See how Gargadi closes the gap</Cta></div>
      </Section>
    </>
  );
}
