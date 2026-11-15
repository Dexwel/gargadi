import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Bits";
import RiskMap from "@/components/RiskMapLazy";
import { AlertSimulator } from "@/components/AlertSimulator";

export const metadata: Metadata = { title: "Simulated demo", description: "Try the simulated Gargadi risk map and alert simulator. No personal information is collected." };

export default function Demo() {
  return (
    <>
      <PageHero title="Simulated demo" lead="Explore simulated risk zones and sample alert wording. This static demo collects no personal information and sends no messages." />
      <Section>
        <h2>1. Risk map</h2>
        <p className="mb-4 mt-2 text-ink/80">Colour-coded flood and disease zones for the pilot community. Tap a zone for details.</p>
        <RiskMap />
      </Section>
      <Section>
        <h2>2. Alert simulator</h2>
        <p className="mb-4 mt-2 text-ink/80">Choose a risk and a language. See the exact message as it would reach a phone. Press Listen to hear it.</p>
        <AlertSimulator />
      </Section>
      <Section>
        <div className="card">
          <h2>Registration is not enabled</h2>
          <p className="mt-2 text-ink/80">This GitHub Pages version has no database or sign-up form. The map and alert messages are examples only.</p>
        </div>
      </Section>
    </>
  );
}
