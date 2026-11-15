# Gargadi: community early warning prototype

*Know early. Act early.* A static prototype for community flood and disease alerts in Yobe State, Nigeria.

> **Prototype only.** The site is static, has no database, does not accept registrations or contact submissions, and sends no real alerts. All map zones and alert messages are simulated.

## What is included

| Area | What it does |
|---|---|
| Public site | Home, Problem, How it works, Impact & roadmap, Voices & partners, About, Contact, Brand and Privacy |
| Simulated demo (`/demo/`) | Static Leaflet/OpenStreetMap risk map, sample alert simulator and browser text-to-speech |

There is no admin dashboard, sign-up storage, contact form backend, alert dispatch, or database integration in this version.

## Stack

Next.js 15 static export · TypeScript · Tailwind CSS 3 · Leaflet · Vitest. Fonts are self-hosted through Fontsource.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. To create the static export locally, run `npm run build`; the output is written to `out/`.

## Deploy to Netlify

The repository includes [netlify.toml](./netlify.toml) with the static build command and publish directory. Follow [DEPLOY.md](./DEPLOY.md) to import the GitHub repository into Netlify. Netlify will deploy the site on pushes to `main`.

No database or secrets are required. Set `NEXT_PUBLIC_SITE_URL` in Netlify after the first deploy so the sitemap and site metadata use the assigned site URL.

## Editing content

- Pilot location, contact email, key facts and roadmap: `src/config/site.ts`
- Alert wording: `src/lib/messages.ts`. Hausa is a draft and Kanuri is a placeholder; native speakers must review before real-world use.
- UI strings: `src/lib/i18n.ts`
- Page copy: `src/app/<page>/page.tsx`
- Simulated map zones: `src/lib/zones.ts`
- Colours: `tailwind.config.ts` and `BRAND.md`

The map uses OpenStreetMap tiles, so visitors need an internet connection and their browser requests map tiles from OpenStreetMap. Hausa/Kanuri text-to-speech depends on voices installed on the visitor's device.

## Checks

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

GitHub Actions runs checks on pushes and pull requests. Netlify builds and publishes the site from the connected GitHub branch.
