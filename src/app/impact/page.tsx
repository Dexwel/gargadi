import type { Metadata } from "next";
import { PageHero, Section, Placeholder, Cta } from "@/components/Bits";
import { roadmap } from "@/config/site";

export const metadata: Metadata = { title: "Impact & roadmap", description: "What we aim to achieve in 3, 6 and 12 months." };

export default function Impact() {
  return (
    <>
      <PageHero title="Impact and roadmap" lead="What we want to achieve, and how we will know. Targets are yours to set." />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {roadmap.map((r) => (
            <div key={r.horizon} className="card">
              <h2 className="text-2xl">{r.horizon}</h2>
              <ul className="mt-4 space-y-4">
                {r.goals.map((g) => (
                  <li key={g.label}><p>{g.label}</p><p className="font-bold text-river-dark">{g.target.startsWith("[") ? <Placeholder>{g.target}</Placeholder> : g.target}</p></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-mist">Edit targets in <code>src/config/site.ts</code> (the <code>roadmap</code> list). No results are claimed here. This is a plan.</p>
        <div className="mt-8"><Cta /></div>
      </Section>
    </>
  );
}
