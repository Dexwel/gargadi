import type { Metadata } from "next";
import { PageHero, Section, Placeholder } from "@/components/Bits";

export const metadata: Metadata = { title: "Privacy notice" };

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy notice" lead="Plain words. What we keep, why, and how to remove it." />
      <Section className="max-w-3xl space-y-4">
        <p className="rounded-xl bg-sun-light p-4 text-sun-dark"><strong>Prototype notice.</strong> The registration form on this demo is for testing. Do not enter a real number unless the pilot team has told you to. Have this notice reviewed by a lawyer or data protection officer before real launch.</p>
        <h2>What we collect</h2>
        <p>Your phone number, your community, your language, whether you want text or audio, and whether you want WhatsApp or SMS. Your name is optional. We record the date and time you said yes.</p>
        <h2>Why</h2>
        <p>Only to send you flood and health alerts. We do not sell your data. We do not use it for advertising.</p>
        <h2>Your choices</h2>
        <p>You can say no. You can leave at any time: use the delete form on the demo page with the code you were given, or ask a Gargadi volunteer, or write to <Placeholder>[ADD CONTACT EMAIL]</Placeholder>. Replying STOP to a message also ends alerts.</p>
        <h2>Who sees it</h2>
        <p>Authorised Gargadi staff. When live, a messaging provider (for example Twilio) will deliver messages for us. <Placeholder>[ADD DATA CONTROLLER NAME AND ADDRESS]</Placeholder></p>
        <h2>How long</h2>
        <p><Placeholder>[ADD RETENTION PERIOD]</Placeholder> or until you ask us to delete.</p>
        <h2>Your rights</h2>
        <p>Under the Nigeria Data Protection Act 2023 you have rights to access, correct and delete your data and to withdraw consent. <Placeholder>[ADD NDPC REGISTRATION / DPO DETAILS IF REQUIRED]</Placeholder></p>
      </Section>
    </>
  );
}
