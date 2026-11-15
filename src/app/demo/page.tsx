import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Bits";
import RiskMap from "@/components/RiskMapLazy";
import { AlertSimulator } from "@/components/AlertSimulator";
import { SignupForm, DeleteForm } from "@/components/SignupForm";

export const metadata: Metadata = { title: "Live demo", description: "Try the Gargadi risk map, alert simulator and consent-first sign-up. Simulated data." };

export default function Demo() {
  return (
    <>
      <PageHero title="Live demo" lead="Three things to try. Everything here is a prototype. Data is simulated and no real messages are sent." />
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
      <Section className="grid gap-8 md:grid-cols-2">
        <div>
          <h2>3. Register for alerts</h2>
          <p className="mb-4 mt-2 text-ink/80">Consent comes first. Demo only: please do not enter a real number unless the pilot team asked you to.</p>
          <SignupForm />
        </div>
        <div>
          <h2>Delete my record</h2>
          <p className="mb-4 mt-2 text-ink/80">Changed your mind? Enter your number and the deletion code you were given.</p>
          <DeleteForm />
        </div>
      </Section>
    </>
  );
}
