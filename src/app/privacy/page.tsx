import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Bits";

export const metadata: Metadata = { title: "Privacy notice" };

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy notice" lead="This static prototype does not collect or store registration or contact-form data." />
      <Section className="max-w-3xl space-y-4">
        <p className="rounded-xl bg-sun-light p-4 text-sun-dark"><strong>Prototype notice.</strong> This static version has no database, sign-up, or contact submission. Do not enter personal information; no such forms are provided.</p>
        <h2>Information handled by this demo</h2>
        <p>The Gargadi app does not ask for or store personal information. Your language choice may be saved in your browser&rsquo;s local storage. The map loads tiles from OpenStreetMap, which may receive your IP address and browser request information.</p>
        <h2>Hosting</h2>
        <p>This site is hosted by Netlify. Netlify may process technical information when you visit; see <a href="https://www.netlify.com/privacy/">Netlify&rsquo;s privacy statement</a> for details.</p>
        <h2>Future pilot</h2>
        <p>If registration or alert delivery is introduced later, this notice must be updated and reviewed by a lawyer or data protection officer before collecting personal information.</p>
      </Section>
    </>
  );
}
