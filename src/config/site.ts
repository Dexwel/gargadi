/**
 * EDIT ME. One file controls the pilot location, contact details and roadmap targets.
 * Anything in [SQUARE BRACKETS] is a placeholder you must replace before sharing publicly.
 */
export const site = {
  name: "Gargadi",
  tagline: "Know early. Act early.",
  description:
    "Gargadi is a community early warning initiative for flood and disease risk in Yobe State, Nigeria. Prototype.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contactEmail: "[ADD CONTACT EMAIL]",
  pilot: {
    name: "[PILOT COMMUNITY]",
    lga: "[LGA]",
    state: "Yobe State",
    // Map centre: placeholder near Damaturu. Replace with your real community coordinates.
    lat: 11.7469,
    lng: 11.9608,
  },
};

/** Roadmap targets. Edit the numbers and text; the Impact page renders them automatically. */
export const roadmap = [
  {
    horizon: "First 3 months",
    goals: [
      { label: "Community mapped with local leaders", target: "[ADD TARGET]" },
      { label: "Volunteers trained", target: "[ADD TARGET]" },
      { label: "Households visited", target: "[ADD TARGET]" },
    ],
  },
  {
    horizon: "First 6 months",
    goals: [
      { label: "Households registered with consent", target: "[ADD TARGET]" },
      { label: "Alert messages tested with native speakers", target: "Hausa, Kanuri, English" },
      { label: "First real alert round (small group)", target: "[ADD TARGET]" },
    ],
  },
  {
    horizon: "First 12 months",
    goals: [
      { label: "Communities covered", target: "[ADD TARGET]" },
      { label: "Share of alerts delivered", target: "[ADD TARGET]" },
      { label: "Households able to name one safe action", target: "[ADD TARGET]" },
    ],
  },
];

/** Problem-page facts. Only add a figure when you have a real, citable source. */
export const keyFacts = [
  { value: "[ADD DATA]", label: "People affected by flooding in Yobe in a recent year", source: "[ADD SOURCE, e.g. NEMA / SEMA report]" },
  { value: "[ADD DATA]", label: "Malaria cases reported in Yobe in a recent year", source: "[ADD SOURCE, e.g. State Ministry of Health]" },
  { value: "[ADD DATA]", label: "Households that received a warning before the last flood", source: "[ADD SOURCE or your own survey]" },
];
