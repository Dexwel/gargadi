# Gargadi brand guide

**Name:** Gargadi (Hausa for "warning"). *Native-speaker check of spelling and tone is still needed, and a name/domain conflict search before public use.*

**Tagline:** Know early. Act early.

## Brand story
Risk information often exists, but it does not reach people in time or in a language they understand. Gargadi closes that gap. We map a community, visit it with volunteers and health practitioners, and explain upcoming risks in simple words. With each household's consent, we send short alerts in Hausa, Kanuri or English, by text or audio, when flood or disease risk is high. A warning is only useful if a mother in a compound can understand it and act on it the same day.

## Logo
Files are in `/public/assets` (copies of the favicon live in `/src/app`).

| File | Use |
|---|---|
| `logo-primary.svg` | Default: icon + wordmark on light backgrounds |
| `logo-icon.svg` / `logo-icon-512.png` | Avatars, favicon, app icon, WhatsApp profile picture |
| `logo-mono.svg` | Single colour (ink) for print, stamps, fax, partner pages |
| `social-image.svg` / `.png` | 1200x630 sharing image (Open Graph) |

The mark is a water drop (flood, water-borne disease) carrying a signal (the alert) with a warm dot (the household that receives it).
The wordmark uses Fraunces. In the SVG files it is live text, so if Fraunces is not installed it falls back to Georgia. Convert the text to outlines in Figma or Inkscape before sending the logo to a printer.
Keep clear space equal to the width of the drop's inner dot x 3 on all sides. Minimum icon size: 16 px.

## Colour palette
| Role | Name | Hex | Notes |
|---|---|---|---|
| Text, dark surfaces | Ink | `#0B2A3A` | 13.97:1 on Sand |
| Primary | River | `#0E5E7E` | 7.19:1 with white text |
| Primary dark | River Dark | `#0A4660` | hover/pressed, 10.20:1 with white |
| Tint | River Light | `#E6F2F7` | panels |
| Accent | Sun | `#F2A93B` | on Ink 7.48:1. Use ink text ON sun, never white |
| Accent text | Sun Dark | `#8A5A00` | on Sun Light `#FDF1DA` 5.30:1 |
| Low risk / success | Leaf | `#2F7D4F` | white on Leaf 5.04:1. Text on Leaf Light `#E5F3EA`: use Leaf Dark `#246B42` (5.63:1) |
| High risk / error | Clay | `#C2410C` | white on Clay 5.18:1. Text on Clay Light `#FDE9DD`: use Clay Dark `#A8370A` (5.56:1) |
| Background | Sand | `#FAF7F2` | |
| Secondary text | Mist | `#5B6F7B` | 4.91:1 on Sand |

All text pairings above meet WCAG 2.1 AA (4.5:1) for normal text. Two natural pairings (Leaf on Leaf Light 4.40, Clay on Clay Light 4.41) failed, so the darker text variants were added.
Risk levels are never shown by colour alone: every zone and badge also carries the words Low, Medium or High.

## Typography (free, self-hosted via Fontsource: no Google request at runtime)
- **Display:** Fraunces (variable). Warm, human, trustworthy. Headings only.
- **Body/UI:** Atkinson Hyperlegible. Designed by the Braille Institute for low-vision readability; very clear on small phone screens.
- Scale: 16 px body (never smaller), 1.6 line height; headings 28 / 36 / 48 px.

## Spacing, shape, components
- Spacing scale (Tailwind): 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Cards: white, 16 px radius, 1 px border `#0B2A3A` at 10% opacity, no heavy shadows.
- Primary button: River background, white text, 12 px radius, min height 48 px (touch friendly), 3 px Sun focus ring.
- Secondary button: white, River border and text. Danger: Clay.
- Icons: simple outline, 2 px stroke, rounded caps, drawn from the same geometry as the logo. No stock photo clip-art.

## Voice
Simple. Warm. Urgent but not fearful.
- Short sentences. One idea each.
- Say what to do, not just what is wrong.
- No jargon: write "rain and water" not "hydrometeorological hazard".
- Never blame people. Never use fear words like "deadly" or "disaster" in alerts.
- Do: "Move to higher ground now. Take children and elders."
- Don't: "Catastrophic inundation imminent."
- Never claim the system is live, or invent numbers, partners or testimonials. Use `[ADD DATA]`.
