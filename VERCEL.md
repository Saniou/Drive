# Deploying Drive to Vercel

This app uses **Next.js 14 + Clerk + Mapbox + Prisma/Postgres**. Vercel is
serverless, so the database must be hosted Postgres (SQLite won't work there).

## 1. Create a Postgres database

Use any provider — **Neon** (free, recommended), Supabase, or Vercel Postgres.
You need two connection strings:

- **Pooled** (pgbouncer) → `DATABASE_URL` — used by the app at runtime.
- **Direct** (non-pooled) → `DIRECT_URL` — used for migrations.

On Neon: copy the "Pooled connection" string for `DATABASE_URL` (it already
contains `-pooler`), and the plain connection string for `DIRECT_URL`. Keep
`?sslmode=require`; add `&pgbouncer=true` to the pooled one.

## 2. Push to GitHub

Already done. `.env` is gitignored — secrets are **not** in the repo.

## 3. Import the repo in Vercel

New Project → import the GitHub repo. Framework preset auto-detects **Next.js**.
Leave Build/Install commands as default — `package.json` already runs
`prisma generate && prisma migrate deploy && next build`.

## 4. Set Environment Variables (Vercel → Settings → Environment Variables)

Copy from `.env.example`:

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | public `pk.` token |
| `MAPBOX_ACCESS_TOKEN` | optional (search API falls back to the public one) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | from Clerk |
| `CLERK_SECRET_KEY` | from Clerk |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/` |
| `DATABASE_URL` | pooled Postgres URL |
| `DIRECT_URL` | direct Postgres URL |

Set them for **Production** (and Preview if you use it).

## 5. Clerk for production

In the Clerk dashboard add your Vercel domain to the instance's allowed origins.
For a custom domain you'll switch to Clerk **production** keys (`pk_live_…` /
`sk_live_…`) and update the two Clerk env vars in Vercel.

## 6. Deploy

Trigger a deploy. The build runs `prisma migrate deploy`, which creates the
`Ride` table on first deploy. Done.

---

## Running locally now (Postgres)

Local dev also uses Postgres now. Put your pooled/direct URLs in `.env`, then:

```bash
npx prisma migrate deploy   # or: npx prisma migrate dev
npm run dev
```
