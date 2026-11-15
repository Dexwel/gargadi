import type { Metadata } from "next";
import { PageHero, Section, Placeholder } from "@/components/Bits";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageHero title="Contact us" lead="Funders, partners, health workers and community leaders: we would like to hear from you." />
      <Section>
        <div className="card self-start">
          <h2 className="text-2xl">Contact details</h2>
          <p className="mt-3">The contact form is not enabled in this static prototype. No messages are collected or stored.</p>
          <p className="mt-3">Email: {site.contactEmail.startsWith("[") ? <Placeholder>{site.contactEmail}</Placeholder> : <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>}</p>
          <p className="mt-2">Pilot: {site.pilot.name}, {site.pilot.lga}, {site.pilot.state}</p>
        </div>
      </Section>
    </>
  );
}
