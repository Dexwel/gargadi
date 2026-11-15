import type { Metadata } from "next";
import { PageHero, Section, Placeholder } from "@/components/Bits";

export const metadata: Metadata = { title: "Community voices & partners" };

export default function Voices() {
  return (
    <>
      <PageHero title="Community voices and partners" lead="This page stays empty until real people and organisations agree to be named." />
      <Section>
        <h2>Community voices</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <figure key={i} className="card">
              <blockquote><Placeholder>[ADD QUOTE {i}: only with the person&apos;s written permission]</Placeholder></blockquote>
              <figcaption className="mt-3 text-sm text-mist"><Placeholder>[NAME / ROLE / COMMUNITY]</Placeholder></figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <Section>
        <h2>Partners</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {["State health ministry", "Emergency management agency", "Local government", "Research / modeling partner"].map((p) => (
            <div key={p} className="card flex min-h-[110px] items-center justify-center text-center text-mist"><span><Placeholder>[ADD LOGO]</Placeholder><br /><span className="text-sm">{p}</span></span></div>
          ))}
        </div>
        <p className="mt-3 text-sm text-mist">Do not add a partner logo until that partner has agreed in writing.</p>
      </Section>
    </>
  );
}
