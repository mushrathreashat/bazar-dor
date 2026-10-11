# 🛒 বাজার দর (Bazar Dor)

বাংলা ভাষায় নিত্যপ্রয়োজনীয় পণ্যের বাজারদর দেখার জন্য একটি responsive web application। পণ্যের দাম, দাম বাড়া-কমার হার এবং বাজারভিত্তিক তথ্য এক জায়গায় দেখানোর জন্য তৈরি।

## Technologies
- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS
- Better Auth (email/password and optional Google/GitHub OAuth)
- React Hot Toast
- Programming Hero BazarDor API
- PostgreSQL
- Vercel deployment

## Key Features
1. Responsive Bengali homepage and animated market-price ticker.
2. Product cards with Bengali prices, units, emoji and percentage changes.
3. Price risers/fallers sections and category pages.
4. Category filtering and numeric ascending/descending price sorting.
5. Protected product detail pages with min/max/average price summaries.
6. Sign-up, sign-in, sign-out, optional social login and profile name update.
7. Loading skeletons, friendly 404 pages and toast notifications.
8. Responsive layouts for mobile, tablet and desktop.

## Local Setup

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.
4. Install dependencies and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Better Auth / Database

Use a hosted PostgreSQL database for deployment. Generate a long random `BETTER_AUTH_SECRET`. For OAuth, configure Google/GitHub applications and set their client ID and secret environment variables. The OAuth callback URL should point to `/api/auth/callback/google` or `/api/auth/callback/github` on your domain.

## Deployment

Import the repository into Vercel and add all required environment variables in Project Settings → Environment Variables. Redeploy after adding variables. Use a persistent hosted PostgreSQL database; do not rely on local SQLite/filesystem storage on serverless hosting.

## Notes

- Product data is loaded from the documented BazarDor API endpoints, trying the primary API and two alternatives.
- If the API's live response structure differs, adjust `normalizeProducts` in `src/lib/products.ts`.
- Price information is indicative and can change by market and time.
