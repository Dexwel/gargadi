# Deploy Gargadi to Netlify

This is a static site: it needs no database, credentials, or environment variables to build. Netlify builds the `out/` directory using the settings in `netlify.toml`.

## Import from GitHub

1. Sign in to [Netlify](https://app.netlify.com/) with GitHub.
2. Select **Add new project → Import an existing project → GitHub**.
3. Authorize Netlify to access `Dexwel/gargadi`, then select that repository.
4. Keep the repository root as the base directory. Netlify reads the build command (`npm run build`) and publish directory (`out`) from `netlify.toml`.
5. Select **Deploy**.

Netlify assigns a `netlify.app` URL after the first build.

## Set the public site URL

After the first deploy:

1. In Netlify, open **Project configuration → Environment variables**.
2. Add `NEXT_PUBLIC_SITE_URL` with the full assigned site URL, for example `https://your-site-name.netlify.app`.
3. Trigger a new deploy so the sitemap and page metadata use that URL.

No database connection, secrets, or messaging-provider credentials are needed.

## Future updates

Netlify deploys new production versions when changes are pushed to the connected branch (`main` by default). Pull requests and other branches can get preview deploys.

## What this static version does not do

- Store registrations, phone numbers, or contact messages
- Provide an admin dashboard or database
- Send SMS, WhatsApp, scheduled alerts, or any real messages

The demo map and alert text are simulated. The map loads tiles from OpenStreetMap. Do not collect personal information through this prototype.
