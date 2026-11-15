import type { Metadata } from "next";
import { PageHero, Section, Placeholder } from "@/components/Bits";

export const metadata: Metadata = { title: "About & team" };

export default function About() {
  return (
    <>
      <PageHero title="About Gargadi" lead="Gargadi is Hausa for “warning”. We turn risk information into messages families can use." />
      <Section>
        <h2>Our story</h2>
        <p className="mt-3 max-w-2xl"><Placeholder>[ADD YOUR ORGANISATION STORY: who you are, why Yobe, why now]</Placeholder></p>
        <h2 className="mt-10">Team</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {["Lead", "Public health", "Risk modeler", "Community coordinator"].map((r) => (
            <div key={r} className="card text-center"><div className="mx-auto h-20 w-20 rounded-full bg-river-light" aria-hidden="true" /><p className="mt-3 font-bold"><Placeholder>[NAME]</Placeholder></p><p className="text-sm text-mist">{r}</p></div>
          ))}
        </div>
      </Section>
    </>
  );
}
