import type { Metadata } from "next";
import { PageHero, Section, Placeholder } from "@/components/Bits";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageHero title="Contact us" lead="Funders, partners, health workers and community leaders: we would like to hear from you." />
      <Section className="grid gap-8 md:grid-cols-2">
        <ContactForm />
        <div className="card self-start">
          <h2 className="text-2xl">Other ways to reach us</h2>
          <p className="mt-3">Email: <Placeholder>{site.contactEmail}</Placeholder></p>
          <p className="mt-2">Pilot: {site.pilot.name}, {site.pilot.lga}, {site.pilot.state}</p>
        </div>
      </Section>
    </>
  );
}
