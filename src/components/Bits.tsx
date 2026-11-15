import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="bg-river-light">
      <div className="container-x py-12 md:py-16">
        <h1 className="max-w-3xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-ink/80">{lead}</p>}
      </div>
    </section>
  );
}
export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`container-x py-12 ${className}`}>{children}</section>;
}
export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="rounded bg-sun-light px-1.5 font-bold text-sun-dark">{children}</span>;
}
export function Cta({ href = "/demo", children = "Try the demo" }: { href?: string; children?: ReactNode }) {
  return <Link href={href} className="btn-primary">{children}</Link>;
}
export function PhaseCard({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="card">
      <span className="badge bg-river text-white">Phase {n}</span>
      <h3 className="mt-3">{title}</h3>
      <div className="mt-2 text-ink/80">{children}</div>
    </div>
  );
}
