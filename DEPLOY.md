# DEPLOYMENT GUIDE — Brothers Machine Services (GitHub → Cloudflare)

This guide documents the full deployment pipeline for **Brothers Machine Services Corp**:
- **Frontend**: React (Vite) Single Page Application on Cloudflare Pages
- **API**: Cloudflare Worker with D1 SQL Database and R2 Image Storage
- **Free Tier Compatible**: Runs entirely on Cloudflare Free Tier & GitHub Free

---

## 1. Cloudflare D1 Database Setup

Create the D1 database using Wrangler:

```bash
npx wrangler d1 create brothers-machine-db
```

Output will provide your `database_id`. Update `wrangler.toml` with this ID:

```toml
[[d1_databases]]
binding = "DB"
database_name = "brothers-machine-db"
database_id = "<YOUR_D1_DATABASE_ID>"
```

Execute the database migration to create all tables and initial seed data:

```bash
# Execute on remote Cloudflare D1
npx wrangler d1 execute brothers-machine-db --remote --file=./migrations/0001_init.sql
```

---

## 2. Cloudflare R2 Bucket (Image Storage)

Create the R2 bucket for jobsite gallery uploads:

```bash
npx wrangler r2 bucket create brothers-machine-images
```

---

## 3. Deploy Cloudflare Worker API

Deploy the API Worker:

```bash
npx wrangler deploy worker/index.ts
```

Set the Admin Setup Key in Cloudflare Worker secrets (or in `wrangler.toml` vars):

```bash
npx wrangler secret put ADMIN_SETUP_KEY
# Enter your secret key (default in dev: brothers-marine-setup-2026)
```

---

## 4. Deploy Frontend to Cloudflare Pages

Deploy the compiled production build to Cloudflare Pages:

```bash
# From repository root:
npx wrangler pages deploy frontend/dist --project-name="brothers-machine-services" --branch="main"
```

Or connect GitHub repository in the Cloudflare Dashboard:
- **Project Name**: `brothers-machine-services`
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`

---

## 5. First-Run Admin Setup ("Shop Office")

1. Navigate to: `https://brothers-machine-services.pages.dev/admin`
2. Click **"First time? Setup Admin Account"**
3. Enter your desired Admin Email, Password, and your `ADMIN_SETUP_KEY` (`brothers-marine-setup-2026`).
4. Log in. You can now edit Site Settings, update the Company History, add/hide services, manage gallery items, and monitor incoming RFQs.

---

## 6. Schema & Local Development

Run locally:
```bash
# 1. Install dependencies
npm install
cd frontend && npm install && cd ..

# 2. Local D1 migration
npx wrangler d1 execute brothers-machine-db --local --file=./migrations/0001_init.sql

# 3. Start local worker API
npx wrangler dev worker/index.ts --port 8787

# 4. In a separate terminal, start React dev server
cd frontend && npm run dev
```
