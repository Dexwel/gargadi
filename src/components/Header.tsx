"use client";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { useLang, useT } from "./LangProvider";
import { LANGS } from "@/lib/messages";

const links = [
  ["/", "nav.home"], ["/problem", "nav.problem"], ["/how-it-works", "nav.how"], ["/demo", "nav.demo"],
  ["/impact", "nav.impact"], ["/about", "nav.about"], ["/contact", "nav.contact"],
] as const;

export function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-[1000] border-b border-ink/10 bg-sand/95 backdrop-blur">
      <div className="bg-ink px-4 py-1.5 text-center text-sm font-bold text-sun" role="status">{t("banner")}</div>
      <div className="container-x flex items-center justify-between py-3">
        <Link href="/" aria-label="Gargadi home" className="no-underline"><Logo /></Link>
        <button className="btn-secondary md:hidden" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>Menu</button>
        <nav id="nav" aria-label="Main" className={`${open ? "block" : "hidden"} absolute left-0 right-0 top-full border-b border-ink/10 bg-sand p-4 md:static md:block md:border-0 md:bg-transparent md:p-0`}>
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
            {links.map(([href, key]) => (
              <li key={href}><Link href={href} className="block py-2 font-bold text-ink no-underline hover:text-river md:py-0" onClick={() => setOpen(false)}>{t(key)}</Link></li>
            ))}
            <li>
              <label className="sr-only" htmlFor="lang">Language</label>
              <select id="lang" value={lang} onChange={(e) => setLang(e.target.value as typeof lang)} className="min-h-[40px] rounded-lg border border-ink/30 bg-white px-2">
                {LANGS.map((l) => <option key={l.code} value={l.code}>{l.native}</option>)}
              </select>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
