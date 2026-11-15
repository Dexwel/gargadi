# Deploy Gargadi to GitHub Pages

This version is a static site: it needs no database, credentials, or environment variables. GitHub Actions builds and publishes it whenever changes are pushed to `main`.

## One-time setup

1. Open the repository: <https://github.com/Dexwel/gargadi>.
2. Select **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open **Settings → Actions → General** and ensure Actions are allowed to run. The Pages workflow has the required deploy permissions.

## Publish

Push changes to the `main` branch, or manually run **Actions → Deploy to GitHub Pages → Run workflow**. The workflow installs dependencies, creates a static export, and deploys it.

After the first successful workflow, the site is available at:

<https://dexwel.github.io/gargadi/>

It may take a few minutes for the first deployment to appear. Check the **Actions** tab if the workflow reports an error.

## Local preview

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. `npm run build` creates the same kind of static output in `out/`.

## What this static version does not do

- Store registrations, phone numbers, or contact messages
- Provide an admin dashboard or database
- Send SMS, WhatsApp, scheduled alerts, or any other real messages

The demo map and alert text are simulated. The map loads tiles from OpenStreetMap. Do not collect personal information through this prototype.
