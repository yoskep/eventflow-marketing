# EventFlow Marketing Site

Astro SSG marketing site for [EventFlow](https://eventflow.co.il) -- CRM for Israeli event suppliers.

Deployed at `eventflow.co.il`. The CRM app lives separately at `app.eventflow.co.il`.

## Stack

- **Astro 6** (Static Site Generation)
- **React 19** (islands for interactive components)
- **Tailwind CSS 4**
- **Supabase** (build-time data fetching)
- **@astrojs/sitemap** + **@astrojs/rss**

## Pages

| Section | Count | Description |
|---------|-------|-------------|
| Static pages | 6 | Landing, Pricing, About, Privacy, Terms, Accessibility |
| Blog | dynamic | Paginated index, articles, category filters, RSS |
| Programmatic SEO | ~895 | 17 services x ~50 cities |
| Service index | 17 | One per service type |
| City landing | ~50 | One per city/region |
| Supplier profiles | dynamic | One per public supplier |

## Setup

```bash
npm install
cp .env.example .env
# Fill in your Supabase credentials
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

---

## Before First Deploy -- Checklist

### 1. Apply Database Migration

Run this SQL in your [Supabase dashboard](https://supabase.com/dashboard) SQL editor:

```sql
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  source TEXT DEFAULT 'blog'
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read subscribers"
  ON newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');
```

### 2. Set Up DNS

| Domain | Points to |
|--------|-----------|
| `eventflow.co.il` | Astro site (Vercel/Netlify/Cloudflare Pages) |
| `app.eventflow.co.il` | Vite CRM app (current hosting) |

### 3. Deploy to Hosting

Choose one and connect this repo:

- **Vercel**: `npx vercel` or connect via dashboard
- **Netlify**: `npx netlify deploy` or connect via dashboard
- **Cloudflare Pages**: connect via dashboard

Build command: `npm run build`
Output directory: `dist`

### 4. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `eventflow.co.il`
3. Copy the verification meta tag
4. Uncomment and paste in `src/layouts/BaseLayout.astro` (search for `google-site-verification`)
5. Rebuild and deploy
6. Submit sitemap: `https://eventflow.co.il/sitemap-index.xml`

### 5. GA4 Analytics

1. Create a GA4 property at [Google Analytics](https://analytics.google.com)
2. Copy the Measurement ID (G-XXXXXXX)
3. Add `GA_MEASUREMENT_ID=G-XXXXXXX` to your `.env` file
4. Rebuild and deploy

### 6. OG Image

Replace `public/images/og-default.png` with a branded 1200x630 image for social media previews.

### 7. Supabase Rebuild Webhook

Set up automatic rebuilds when content changes:

1. In Supabase dashboard, go to Database > Webhooks
2. Create webhook for `blog_posts` table (INSERT, UPDATE)
3. Point to your hosting deploy hook URL:
   - Vercel: Settings > Git > Deploy Hooks
   - Netlify: Site settings > Build & deploy > Build hooks
4. Create another webhook for `suppliers` table

### 8. Update CRM App Auth Links

In the Vite CRM app, update login/signup redirects to use `app.eventflow.co.il`.

### 9. Mobile Navigation

Add a hamburger menu to `src/components/layout/Header.astro` for mobile users (nav links are hidden on mobile currently).

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SITE_URL` | Marketing site URL (`https://eventflow.co.il`) |
| `APP_URL` | CRM app URL (`https://app.eventflow.co.il`) |
| `GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID |

## Architecture

```
eventflow.co.il (this repo)         app.eventflow.co.il (Vite SPA)
+--------------------------+        +--------------------------+
| Landing, Pricing, Legal  |        | Dashboard, Leads, Quotes |
| Blog (SSG from Supabase) |        | Blog Admin (editor)      |
| /biz/:slug (profiles)    | -auth> | Contracts, Payments      |
| /{service}/{city} (pSEO) |        | Settings, Galleries      |
| Sitemaps, RSS, robots    |        |                          |
+--------------------------+        +--------------------------+
         |                                   |
         +------- Supabase (shared) ---------+
```

## SEO Features

- Pre-rendered HTML (zero client-side JS for content pages)
- JSON-LD structured data: Organization, WebSite, Article, LocalBusiness, FAQPage, Service, BreadcrumbList, SoftwareApplication, ItemList
- XML sitemaps (auto-generated)
- RSS feed at `/rss.xml`
- Open Graph + Twitter Card meta on every page
- AI crawler directives in robots.txt (GPTBot, PerplexityBot, ClaudeBot)
- AI-friendly content patterns (AnswerBlock, FreshnessSignal)
- Internal linking mesh across service/city/blog pages
- Hebrew RTL throughout (`lang="he" dir="rtl"`)
- GA4 event tracking (CTA clicks, scroll depth, social shares)
