# Gargadi: community early warning prototype (Yobe State, Nigeria)

*Know early. Act early.* Flood and disease alerts in Hausa, Kanuri and English by text or audio.

> **Status: prototype.** Nothing is live. All demo data is simulated and labelled. Alerts go to a **mock sender** by default.

**To deploy, follow [DEPLOY.md](./DEPLOY.md)** (GitHub + Neon + Vercel, no cost).

## What is in the box
| Area | What it does |
|---|---|
| Public site | Home, Problem, How it works, Impact & roadmap, Voices & partners, About, Contact (working form), Brand, Privacy |
| Live demo (`/demo`) | Leaflet/OpenStreetMap risk map (flood and disease, Low/Medium/High), alert simulator (SMS + WhatsApp phone mock-ups, audio via browser text-to-speech), consent-first sign-up, delete-my-record |
| Admin (`/admin`) | Password login, households by community, coverage map, create/schedule alerts, alert history, volunteers, charts, delete household |
| Senders | `mock` (default) and `twilio` (SMS + WhatsApp) behind `ALERT_SENDER` |
| Data protection | Minimal fields, consent timestamp + version, deletion by code, masked numbers in admin, hashed delete codes and IPs, input validation (Zod), DB-backed rate limiting, honeypot, signed admin cookie, security headers, no secrets in repo |

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · PostgreSQL via `postgres` (works with Neon or Supabase) · Zod · Leaflet · Vitest. Fonts (Fraunces, Atkinson Hyperlegible) are self-hosted through Fontsource, so there is no third-party font request.

Differences from the original brief, and why:
- **Neon + plain SQL migrations instead of an ORM.** Fewer moving parts for a small schema, fast on serverless.
- **Custom lightweight i18n instead of `next-intl`.** English is complete for the whole site. Hausa and Kanuri UI strings are scaffolded in `src/lib/i18n.ts` with `[REVIEW]` flags and fall back to English. Only the header, banner, language switcher and sign-up labels read from the dictionary so far. Moving the other pages onto it is a mechanical next step once translations exist.
- **Unit tests (Vitest) instead of Playwright.** See Testing.

## Run locally
```bash
npm install
cp .env.example .env.local     # then fill in DATABASE_URL, ADMIN_PASSWORD_HASH, SESSION_SECRET
npm run hash-password -- "a-long-password"   # prints the two secrets to paste
npm run db:setup               # create tables + seed SIMULATED data
npm run dev                    # http://localhost:3000
```
`DATABASE_URL` can point to a free Neon project or any Postgres. Localhost URLs connect without SSL.
Without a database the public pages and the risk map still work (built-in simulated zones). Sign-up, contact and admin need the database.

## Environment variables
See `.env.example`. Summary: `DATABASE_URL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET` (32+ chars), `NEXT_PUBLIC_SITE_URL`, `ALERT_SENDER` (`mock`|`twilio`), `TWILIO_*`, `CRON_SECRET`, `REVIEWED_LANGUAGES` (default `en`).

## Database
- Schema: `db/migrations/*.sql` (applied in filename order by `npm run db:migrate`).
- Seed: `npm run db:seed` creates three communities, risk zones, 48 simulated households, volunteers and two past alerts. Every seeded row is flagged `is_simulated`. If real registrations exist the script refuses to run unless you pass `-- --force`, and even then it only replaces simulated rows.

## Switching from mock to real alerts
Read "Going live" in [DEPLOY.md](./DEPLOY.md). In short: set `ALERT_SENDER=twilio` plus the Twilio variables, list approved languages in `REVIEWED_LANGUAGES`. Integration code is in `src/lib/senders.ts` (add another provider by implementing the `Sender` interface and returning it from `getSender()`), dispatch logic in `src/lib/dispatch.ts`.

## Editing content
- Pilot community, contact, key facts, roadmap targets: `src/config/site.ts`
- Alert wording (all languages): `src/lib/messages.ts`. **Hausa is a draft and Kanuri is a placeholder. Native speakers must review before real use.**
- UI strings: `src/lib/i18n.ts`
- Page copy: `src/app/<page>/page.tsx`
- Colours: `tailwind.config.ts` (and `BRAND.md`)
- Logos / social image: `public/assets/` (PNG social image is copied to `src/app/opengraph-image.png`)

## Testing
```bash
npm test            # 23 unit tests: alert templates and simulator logic, sign-up/alert validation, phone handling, admin session and password checks, live-mode language safety
npm run typecheck
npm run lint
npm run build
```
The API flows (sign-up with consent, duplicate rejection, delete by code, rate limiting, admin login, alert create/schedule/dispatch, cron auth) were also exercised by hand against a real Postgres and a production build. There is not yet an automated browser (Playwright) suite. CI (`.github/workflows/ci.yml`) runs typecheck, lint, tests and build on every push.

## Known limits
- Hausa/Kanuri wording and the Kanuri UI are not final. Hausa/Kanuri text-to-speech depends on voices installed on the viewer's device; real audio needs native recordings.
- Scheduled alerts are dispatched by a daily cron (Vercel Hobby limit) or the "Process due alerts" button.
- No STOP-reply handling yet: it needs the provider's inbound webhook.
- Deletion by code is the self-service path. There is no OTP verification of phone ownership at sign-up.
- Privacy notice is a plain-language draft, not legal advice.
