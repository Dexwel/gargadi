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

## Deploy to GitHub Pages

The GitHub Actions workflow deploys the static export from the `main` branch. Follow [DEPLOY.md](./DEPLOY.md) once to enable Pages for the repository. The public URL is `https://dexwel.github.io/gargadi/`.

No secrets, database, or environment variables are required for deployment. The build sets the repository subpath automatically.

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

CI runs the checks on pushes and pull requests. The Pages workflow builds and publishes the site on pushes to `main`.
