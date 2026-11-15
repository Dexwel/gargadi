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

/** Verified Yobe flood figures with source periods and links. */
export const keyFacts = [
  {
    value: "60,856",
    label: "people affected by flooding across 17 assessed LGAs",
    source: "IOM DTM assessment, 4–8 September 2024",
    sourceTitle: "IOM DTM report",
    sourceUrl: "https://dtm.iom.int/reports/nigeria-flood-situation-report-yobe-state-13-september-2024",
  },
  {
    value: "5,865+",
    label: "shelters destroyed in Yobe during the 2024 floods",
    source: "OCHA Nigeria Flood Overview, as of 17 September 2024",
    sourceTitle: "OCHA flood overview",
    sourceUrl: "https://www.unocha.org/publications/report/nigeria/nigeria-flood-overview-17-september-2024",
  },
];
