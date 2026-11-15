# Deploy Gargadi: step by step

You will use three free services: **GitHub** (stores the code), **Neon** (the database) and **Vercel** (hosts the website).
Total time: about 30 minutes. No credit card needed for any of them.

> You need **Node.js 20 or newer** on your computer for Step 1 and Step 4 (download the "LTS" version from https://nodejs.org). It is only used to prepare a password and set up the database. The website itself runs on Vercel.

---

## Step 1. Unzip and prepare your admin password

1. Unzip `gargadi.zip` into a folder, e.g. `Documents/gargadi`.
2. Open a terminal in that folder.
   - Windows: open the folder, click the address bar, type `cmd`, press Enter.
   - Mac: right-click the folder, "New Terminal at Folder".
3. Install the code libraries (takes a minute):
   ```
   npm install
   ```
4. Make your admin password. Choose a long one (10+ characters) and keep it safe:
   ```
   npm run hash-password -- "your-long-password-here"
   ```
   It prints two lines starting with `ADMIN_PASSWORD_HASH=` and `SESSION_SECRET=`. **Copy both lines into a notepad.** You need them in Step 5. The password itself is never stored anywhere. Only the scrambled hash is.

## Step 2. Put the code on GitHub

1. Create a free account at https://github.com/signup.
2. Go to https://github.com/new. Name it `gargadi`. Choose **Private** (you can make it public later). Do **not** tick "Add a README". Click **Create repository**.
3. In your terminal, run these one at a time (replace `YOUR-USERNAME`):
   ```
   git init
   git add .
   git commit -m "Gargadi prototype"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/gargadi.git
   git push -u origin main
   ```
   If Git asks you to sign in, follow the prompt (a browser window opens). If `git` is not installed, get it from https://git-scm.com.
4. Refresh the GitHub page. You should see your files. (The `.gitignore` file keeps secrets and junk out. Never commit a file called `.env.local`.)

## Step 3. Create the database on Neon

1. Sign up at https://neon.tech (you can use your GitHub login).
2. Create a project. Name: `gargadi`. Pick the region closest to your users (Europe/Frankfurt is usually the nearest free region to Nigeria).
3. On the project dashboard click **Connect**. Copy the **connection string**. It looks like
   `postgresql://user:password@ep-xxxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`
   Keep the `-pooler` version. Save it in your notepad.

## Step 4. Create the tables and demo data

1. In the project folder, copy the example settings file:
   - Mac/Linux: `cp .env.example .env.local`
   - Windows: `copy .env.example .env.local`
2. Open `.env.local` in any text editor. Paste your Neon string after `DATABASE_URL=`. Save.
3. Run:
   ```
   npm run db:setup
   ```
   You should see `Migrations done.` and `Seed done (all seeded rows are SIMULATED).`
   This creates the tables and fills in clearly-labelled **simulated** demo data (zones, households, volunteers, past alerts).

   *No Node? Alternative:* in Neon open **SQL Editor**, paste the contents of `db/migrations/001_init.sql`, click Run. The map will work from built-in simulated zones, but the admin dashboard will be empty until the seed runs.

## Step 5. Deploy on Vercel

1. Sign up at https://vercel.com/signup with **Continue with GitHub**.
2. Click **Add New → Project**, find `gargadi`, click **Import**. (If it is not listed, click "Adjust GitHub App Permissions" and allow that repository.)
3. Leave the framework as **Next.js**. Open **Environment Variables** and add these (name on the left, value on the right):

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | your Neon connection string |
   | `ADMIN_PASSWORD_HASH` | the long value from Step 1 (the part after `=`) |
   | `SESSION_SECRET` | the value from Step 1 (the part after `=`) |
   | `ALERT_SENDER` | `mock` |
   | `CRON_SECRET` | any random string of 20+ characters |

4. Click **Deploy**. After about two minutes you get a link like `https://gargadi-xxxx.vercel.app`. **This is your public URL.**
5. Go to **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` with your new link (no trailing slash), then **Deployments → ⋯ → Redeploy**. This makes link previews (WhatsApp, LinkedIn, X) show the right image.

From now on, every `git push` to `main` redeploys the site automatically.

## Step 6. Check that it works (2 minutes)

1. Open your URL. You should see the dark banner "Prototype. Data shown is simulated."
2. **/demo**: the map shows coloured zones. In the simulator, switch language and press Listen.
3. Register with a test number. You get a deletion code. Then delete the record with the form below it.
4. **/admin**: log in with the password from Step 1. You see charts, the coverage map, volunteers and alert history. Create an alert. It reports "sent via mock", and nothing leaves the server.
5. Send the link to your phone and check it on mobile data.

## Step 7. Custom domain (optional, free on Vercel)

Vercel project → **Settings → Domains** → add your domain and follow the DNS instructions. Update `NEXT_PUBLIC_SITE_URL` to match and redeploy.

---

## Before you show it to funders: fill the placeholders

Search the project for `[` characters in square brackets, or open `src/config/site.ts`:
- `pilot.name` and `pilot.lga`: your real community (and its map coordinates `lat`/`lng`).
- `keyFacts`: add real, cited figures. Leave `[ADD DATA]` if you have no source.
- `roadmap`: set your 3 / 6 / 12 month targets.
- Contact email, About/Team, Voices, Partners pages (`src/app/...`).
- Re-run `npm run db:seed -- --force` after changing the pilot community so the demo map and data move with it (this only replaces rows flagged as simulated).

## Going live with real SMS and WhatsApp (later, not for the grant demo)

Do not do this until: Hausa and Kanuri messages are reviewed by native speakers, the privacy notice is reviewed by a lawyer or data protection officer, and you have real consent from households.

1. Create a Twilio account (https://www.twilio.com). Get an SMS-capable sender and set up WhatsApp (sandbox for testing, WhatsApp Business sender for production, which needs Meta approval).
2. In Vercel add: `ALERT_SENDER=twilio`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_SMS_FROM`, `TWILIO_WHATSAPP_FROM`.
3. Only languages listed in `REVIEWED_LANGUAGES` are sent in live mode. Others fall back to English. Add `ha` / `kr` there once natives have approved the wording in `src/lib/messages.ts`.
4. Redeploy. The admin dashboard turns its banner red: "LIVE (Twilio)".
5. Audio alerts: record each message with a native speaker, host the files, and extend `twilioSender` in `src/lib/senders.ts` to pass `MediaUrl` for households that chose audio. Until then they receive text.

## Troubleshooting

| Problem | Fix |
|---|---|
| Sign-up says "Something went wrong" | `DATABASE_URL` missing/wrong in Vercel, or tables not created (Step 4). Check Vercel → Deployments → Logs. |
| Admin says "Admin login is not configured" | `ADMIN_PASSWORD_HASH` or `SESSION_SECRET` missing in Vercel (`SESSION_SECRET` needs 32+ characters). Redeploy after adding. |
| Wrong password | Re-run `npm run hash-password` and update `ADMIN_PASSWORD_HASH` in Vercel. Redeploy. |
| Map is grey | Your network blocks `tile.openstreetmap.org`. Try another network. |
| Link preview shows no image | Set `NEXT_PUBLIC_SITE_URL`, redeploy, then re-scrape in the sharing tool's debugger. |
| `git push` rejected | Make sure the GitHub repository is empty (no README) or run `git pull origin main --allow-unrelated-histories`. |

## Free-tier notes
- Vercel's free "Hobby" plan is for non-commercial use. A grant prototype is normally fine. Check their terms when you operate it for real.
- Free Neon databases pause when idle. The first visit after a quiet spell may take a few seconds longer.
- Hobby cron jobs run once a day (configured for 06:00 UTC in `vercel.json`). Use the **Process due alerts** button for instant dispatch of scheduled alerts during demos.
- The map uses OpenStreetMap's public tile server, which is fine for a prototype. For heavy traffic switch to a tile provider and follow its terms.
