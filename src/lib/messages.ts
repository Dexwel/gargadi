/**
 * Alert message templates.
 * English is complete. Hausa is a DRAFT and Kanuri is a PLACEHOLDER: both MUST be
 * reviewed and rewritten by native speakers before any real alert is sent.
 */
export type Lang = "en" | "ha" | "kr";
export type RiskType = "flood" | "malaria";
export type Level = "medium" | "high";
export type Channel = "sms" | "whatsapp";

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ha", label: "Hausa", native: "Hausa" },
  { code: "kr", label: "Kanuri", native: "Kanuri" },
];

export const NEEDS_REVIEW: Record<Lang, boolean> = { en: false, ha: true, kr: true };

const T: Record<Exclude<Lang, "kr">, Record<RiskType, Record<Level, string>>> = {
  en: {
    flood: {
      medium: "Gargadi: Flood risk is MEDIUM in {community} this week. Move food, documents and medicine to higher ground. Stay away from streams. Listen for updates.",
      high: "Gargadi: HIGH flood risk in {community} in the next 48 hours. Move to higher ground now. Take children, elders, documents and medicine. Do not cross flooded roads. Help: {helpline}",
    },
    malaria: {
      medium: "Gargadi: Malaria risk is MEDIUM in {community} this week. Sleep under a treated net. Empty standing water near your home. Fever? Go to the clinic the same day.",
      high: "Gargadi: HIGH malaria risk in {community} this week. Sleep under a treated net every night. Clear standing water today. Fever, especially in a child? Go to the clinic now.",
    },
  },
  // DRAFT: needs native-speaker review.
  ha: {
    flood: {
      medium: "Gargadi: Hadarin ambaliya matsakaici ne a {community} a wannan mako. Ku kai abinci, takardu da magani wuri mai tsayi. Ku nisanci rafuka. Ku saurari karin bayani.",
      high: "Gargadi: Hadarin ambaliya yana da yawa a {community} cikin awanni 48. Ku tashi zuwa wuri mai tsayi yanzu. Ku tafi da yara, tsofaffi, takardu da magani. Kada ku bi hanyar da ruwa ya cika. Taimako: {helpline}",
    },
    malaria: {
      medium: "Gargadi: Hadarin zazzabin cizon sauro matsakaici ne a {community} a wannan mako. Ku kwana a cikin gidan sauro. Ku zubar da ruwan da ya tsaya kusa da gidanku. Kuna da zazzabi? Ku je asibiti a ranar.",
      high: "Gargadi: Hadarin zazzabin cizon sauro yana da yawa a {community} a wannan mako. Ku kwana a cikin gidan sauro kowane dare. Ku share ruwan da ya tsaya yau. Zazzabi, musamman a yaro? Ku je asibiti yanzu.",
    },
  },
};

const KANURI_PLACEHOLDER = "[KANURI TRANSLATION NEEDED - NATIVE SPEAKER]";

export interface RenderInput {
  lang: Lang;
  risk: RiskType;
  level: Level;
  community: string;
  helpline?: string;
}

/** Plain message text (what goes in an SMS body, before channel formatting). */
export function renderMessage({ lang, risk, level, community, helpline = "[ADD HELPLINE]" }: RenderInput): string {
  const fill = (s: string) => s.replaceAll("{community}", community).replaceAll("{helpline}", helpline);
  if (lang === "kr") return `${KANURI_PLACEHOLDER}\n${fill(T.en[risk][level])}`;
  return fill(T[lang][risk][level]);
}

/** WhatsApp formatting: bold header, line breaks, opt-out footer. */
export function renderWhatsApp(input: RenderInput): string {
  const body = renderMessage(input);
  const icon = input.risk === "flood" ? "🌊" : "🦟";
  const lvl = input.level === "high" ? "HIGH" : "MEDIUM";
  const footer = input.lang === "ha" ? "Ku amsa STOP don daina karɓar saƙonni." : "Reply STOP to stop messages.";
  return `${icon} *Gargadi · ${lvl}*\n\n${body.replace(/^Gargadi:\s*/, "")}\n\n_${footer}_`;
}

export function renderSms(input: RenderInput): string {
  return renderMessage(input);
}

const GSM7 = new Set(
  "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà".split("")
);

/** SMS cost info: Hausa letters like ɗ ƙ ɓ force Unicode (UCS-2): 70 chars per segment instead of 160. */
export function smsSegments(text: string): { chars: number; unicode: boolean; segments: number } {
  const chars = [...text].length;
  const unicode = [...text].some((c) => !GSM7.has(c));
  const single = unicode ? 70 : 160;
  const multi = unicode ? 67 : 153;
  const segments = chars <= single ? 1 : Math.ceil(chars / multi);
  return { chars, unicode, segments };
}

/** BCP-47 tag for browser text-to-speech. Hausa/Kanuri voices are rarely installed. */
export const TTS_LANG: Record<Lang, string> = { en: "en-NG", ha: "ha-NG", kr: "kr-NG" };
