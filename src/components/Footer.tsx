import Link from "next/link";
import { site } from "@/config/site";
export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="container-x grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold">Gargadi</p>
          <p className="mt-2 text-white/80">{site.tagline}</p>
          <p className="mt-4 text-sm text-sun">Prototype. Nothing on this site is live. Demo data is simulated.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-white">
          {[["/problem", "The Problem"], ["/how-it-works", "How it works"], ["/demo", "Simulated demo"], ["/impact", "Impact & roadmap"], ["/voices", "Voices & partners"], ["/about", "About"], ["/contact", "Contact"], ["/brand", "Brand"], ["/privacy", "Privacy"]].map(([h, l]) => (
            <Link key={h} href={h} className="text-white underline-offset-2 hover:text-sun">{l}</Link>
          ))}
        </nav>
        <p className="text-sm text-white/70">Any future pilot should follow the Nigeria Data Protection Act 2023: collect the minimum, ask for consent, allow deletion.</p>
      </div>
    </footer>
  );
}
