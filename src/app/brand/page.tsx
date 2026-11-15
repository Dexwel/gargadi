import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Bits";
import { site } from "@/config/site";
import { Logo, LogoIcon } from "@/components/Logo";

export const metadata: Metadata = { title: "Brand" };

const colors = [
  ["Ink", "#0B2A3A", "text-white", "Text, dark surfaces", "13.97:1 on Sand"],
  ["River", "#0E5E7E", "text-white", "Primary", "7.19:1 with white"],
  ["River Dark", "#0A4660", "text-white", "Hover / pressed", "10.20:1 with white"],
  ["River Light", "#E6F2F7", "text-ink", "Panels", "ink text 12:1+"],
  ["Sun", "#F2A93B", "text-ink", "Accent (use ink text)", "7.48:1 ink on Sun"],
  ["Leaf", "#2F7D4F", "text-white", "Low risk / success", "5.04:1 with white"],
  ["Clay", "#C2410C", "text-white", "High risk / error", "5.18:1 with white"],
  ["Sand", "#FAF7F2", "text-ink", "Background", "13.97:1 ink on Sand"],
];

export default function Brand() {
  return (
    <>
      <PageHero title="Brand" lead="Name, logo, colour, type and voice. The full guide is BRAND.md in the repository." />
      <Section>
        <h2>Name and tagline</h2>
        <p className="mt-3 max-w-2xl"><strong>Gargadi</strong> is Hausa for “warning”. Tagline: <em>Know early. Act early.</em></p>
        <p className="mt-3 max-w-2xl text-ink/80">Risk information often exists, but it does not reach people in time or in a language they understand. Gargadi closes that gap. We map a community, visit it with volunteers and health practitioners, and explain upcoming risks in simple words. With each household&apos;s consent, we send short alerts in Hausa, Kanuri or English, by text or audio, when flood or disease risk is high.</p>
      </Section>
      <Section>
        <h2>Logo</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="card flex min-h-[140px] items-center justify-center"><Logo /></div>
          <div className="card flex min-h-[140px] items-center justify-center"><LogoIcon size={72} /></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="card flex min-h-[140px] items-center justify-center"><img src={`${site.basePath}/assets/logo-mono.svg`} alt="Gargadi monochrome logo" width={200} height={50} /></div>
        </div>
        <p className="mt-2 text-sm text-mist">Primary, icon-only, monochrome. Files in /assets.</p>
      </Section>
      <Section>
        <h2>Colour</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {colors.map(([n, hex, tc, role, c]) => (
            <div key={n} className="overflow-hidden rounded-card border border-ink/10">
              <div className={`h-24 p-3 font-bold ${tc}`} style={{ background: hex }}>{n}</div>
              <div className="bg-white p-3 text-sm"><p className="font-bold">{hex}</p><p>{role}</p><p className="text-mist">{c}</p></div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-mist">Every text pairing meets WCAG 2.1 AA. Risk is never shown by colour alone.</p>
      </Section>
      <Section>
        <h2>Type</h2>
        <p className="mt-3 font-display text-4xl font-bold">Fraunces: headings</p>
        <p className="mt-2 text-xl">Atkinson Hyperlegible: body and interface. Built for easy reading on small screens.</p>
      </Section>
      <Section>
        <h2>Buttons and cards</h2>
        <div className="mt-4 flex flex-wrap gap-3"><span className="btn-primary">Primary</span><span className="btn-secondary">Secondary</span><span className="btn-sun">Accent</span><span className="btn-danger">Danger</span></div>
        <div className="mt-4 flex flex-wrap gap-2"><span className="badge bg-leaf-light text-leaf-dark">Low</span><span className="badge bg-sun-light text-sun-dark">Medium</span><span className="badge bg-clay-light text-clay-dark">High</span></div>
        <div className="card mt-4 max-w-sm"><h3>Card</h3><p className="mt-1 text-ink/80">White, 16px radius, light border.</p></div>
      </Section>
      <Section>
        <h2>Voice</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6">
          <li>Simple. Warm. Urgent but not fearful.</li>
          <li>Short sentences. Say what to do.</li>
          <li><strong>Do:</strong> “Move to higher ground now. Take children and elders.”</li>
          <li><strong>Don&apos;t:</strong> “Catastrophic inundation imminent.”</li>
        </ul>
      </Section>
    </>
  );
}
