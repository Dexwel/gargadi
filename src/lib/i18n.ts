/**
 * Lightweight i18n. English is complete.
 * Hausa (ha) and Kanuri (kr) strings marked REVIEW are scaffolding ONLY: they must be
 * written or checked by native speakers. If a key is missing in a language it falls back to English.
 * To edit UI text: change the strings below. To add a language, add a block and a LANGS entry.
 */
import type { Lang } from "./messages";

export const dict = {
  en: {
    "nav.home": "Home", "nav.problem": "The Problem", "nav.how": "How it works", "nav.demo": "Live demo",
    "nav.impact": "Impact", "nav.voices": "Voices & partners", "nav.about": "About", "nav.contact": "Contact",
    "banner": "Prototype. Data shown is simulated.",
    "hero.title": "Know early. Act early.",
    "hero.sub": "Gargadi sends short flood and disease warnings to families in the language they speak. Before the water comes. Before the fever spreads.",
    "cta.demo": "Try the demo",
    "cta.how": "See how it works",
    "signup.title": "Register for alerts",
    "signup.name": "Your name (optional)",
    "signup.phone": "Phone number",
    "signup.community": "Community",
    "signup.language": "Language",
    "signup.format": "Message type",
    "signup.channel": "Channel",
    "signup.submit": "Register",
    "signup.consent": "I agree that Gargadi may store my phone number and send me flood and health alerts. I can ask to be deleted at any time.",
    "sim.title": "Alert simulator",
  },
  ha: {
    // REVIEW: placeholders pending native-speaker translation
    "nav.home": "Farko", "nav.demo": "Gwaji kai tsaye",
    "banner": "Samfurin gwaji. Bayanan da aka nuna na kwaikwayo ne. [REVIEW]",
    "hero.title": "Ku sani da wuri. Ku ɗauki mataki da wuri. [REVIEW]",
    "cta.demo": "Gwada samfurin [REVIEW]",
    "signup.title": "Yi rajista don samun gargaɗi [REVIEW]",
  },
  kr: {
    // REVIEW: no Kanuri strings yet. Falls back to English until a native speaker supplies them.
    "banner": "[KANURI TRANSLATION NEEDED] Prototype. Data shown is simulated.",
  },
} as const;

export type Key = keyof (typeof dict)["en"];

export function t(lang: Lang, key: Key): string {
  const table = dict[lang] as Record<string, string>;
  return table[key] ?? dict.en[key];
}

export const isPlaceholder = (lang: Lang, key: Key) => lang !== "en" && !(key in dict[lang]);
