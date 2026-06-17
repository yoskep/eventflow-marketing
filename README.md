# eventflow-marketing

**אתר שיווקי + מדריך ספקים פרוגרמטי ל-EventFlow — מערכת CRM לספקי אירועים בישראל**

Static marketing website and programmatic-SEO vendor directory for [EventFlow](https://eventflow.co.il) — the Hebrew/RTL CRM platform for Israeli event suppliers. Generates ~838 pages at build time using Astro SSG.

---

## What it is

`eventflow-marketing` is the public-facing site for EventFlow (`eventflow.co.il`). It is a **fully static Astro site** (zero client-side JS for content pages) that serves three purposes:

1. **Marketing** — landing page, pricing, about, legal pages (privacy/terms/accessibility)
2. **Blog** — articles fetched from Supabase at build time, with category pages and RSS feed
3. **Programmatic-SEO vendor directory** — ~838 pre-rendered Hebrew pages covering `/biz/[slug]` supplier profiles, `/[service]` + `/[service]/[city]` service-city intersections, and `/cities/[city]` city hubs, all with JSON-LD schema markup and internal-linking mesh

The app itself (dashboards, lead management, contracts) lives in a separate project at `app.eventflow.co.il`. Both share the same Supabase database; this site reads it **only at build time**.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Astro 6 (static output) |
| Styling | Tailwind CSS 4 (Vite plugin) |
| Language | TypeScript 6 |
| Data layer | Supabase JS v2 (build-time fetch only) |
| Fonts | Google Fonts — Heebo (Hebrew RTL) |
| Sitemap | `@astrojs/sitemap` |
| RSS | `@astrojs/rss` |
| Analytics | Google Analytics 4 via Consent Mode v2 |
| Node requirement | ≥ 22.12.0 |

---

## Features

### Landing page
Hero section, features grid, how-it-works steps, pain points, stats bar, and CTA blocks — all in Hebrew RTL.

### Pricing page (`/pricing`)
Four plans with **VAT-inclusive prices at 18%** (Starter free / Pro ₪353 / Pro Plus ₪589 / Agency ₪1,758 per month). Prices are displayed with the footnote "* כל המחירים כוללים מע"מ (18%)". Agency plan features include "(בקרוב)" labels on unbuilt items (team management, API access). Pricing FAQ with JSON-LD `FAQPage` schema.

### Blog
Articles and categories fetched from Supabase at build time. Components: `BlogPostCard`, `CategoryPills`, `TableOfContents`, `RelatedPosts`, `ReadingProgress`, `ShareButtons`, `NewsletterSignup`. Paginated listing at `/blog/[...page]` and category pages at `/blog/category/[category]`. RSS feed at `/rss.xml`.

### Programmatic SEO
- **`/biz/[slug]`** — one page per public supplier. CTA: WhatsApp quote request (if phone available), supplier website (fallback), or eventflow.co.il root (last resort). No `/request-quote` route is used.
- **`/[service]`** — index page per service type (17 services defined in `src/data/services.ts`)
- **`/[service]/[city]`** — service × city intersection pages (~850 combinations)
- **`/cities/[city]`** — city hub pages

### JSON-LD schema markup
`Organization`, `WebSite`, `WebPage`, `Article`, `LocalBusiness` subtypes (via `localBusinessSchema`), `FAQPage`, `BreadcrumbList`, `SoftwareApplication` with `Offer` pricing. Implemented in `src/lib/seo.ts` and injected via `src/components/seo/SEOHead.astro` + `SchemaOrg.astro`.

### llms.txt
`public/llms.txt` — describes EventFlow for AI answer engines (ChatGPT, Claude, Perplexity, Apple Intelligence).

> **Note:** `llms.txt` currently shows pre-VAT prices (₪299/₪499/₪1,490) which differ from the live pricing page (₪353/₪589/₪1,758 VAT-inclusive). Update before launch or add an explicit "excluding VAT" note.

### Cookie consent — Consent Mode v2
`src/components/analytics/CookieConsent.astro` implements a Hebrew RTL banner (Amendment 13 compliant). GA4 defaults to `analytics_storage: denied` in `BaseLayout.astro` before user decision. The banner updates consent on explicit accept/reject; ESC triggers reject. Choice persists 12 months in `localStorage` + companion cookie. GA4 script is only active when `GA_MEASUREMENT_ID` is set.

### Legal pages
| Page | Key detail |
|---|---|
| `/privacy` | Amendment 13 update (effective 14 Aug 2025), 72-hour breach notification, cookie consent flow. Marked **"טיוטה — לאישור עו"ד"**. |
| `/terms` | Section 7: 14-day cooling-off period under Israeli Consumer Protection Law; extended 4-month right for protected groups (Amendment 47). Draft banner present. Marked **"טיוטה — לאישור עו"ד"**. |
| `/accessibility` | WCAG 2.1 AA / Israeli standard ת"י 5568. Phone number placeholder is intentionally omitted (comment in source) pending a real number. |

### Other
- `src/components/pseo/SupplierCard.astro` — displays Hebrew `serviceLabel` (from `getServiceByDbType`) and city badge
- `FreshnessSignal`, `AnswerBlock`, `Breadcrumbs` for AI-friendliness and structured UX
- `InternalLinks`, `CityGrid`, `ServiceGrid` for SEO mesh
- `public/robots.txt` with bot directives for Google, ChatGPT, Claude, Perplexity, Apple Intelligence

---

## Getting started

### Prerequisites

- Node.js ≥ 22.12.0
- npm

### Install

```bash
git clone <repo-url>
cd eventflow-marketing
npm install
```

### Environment variables

Create a `.env` file at the project root. The build succeeds **without Supabase variables** — supplier and blog pages simply render empty (no crash).

| Variable | Required | Description |
|---|---|---|
| `SITE_URL` | Optional | Canonical site URL. Default: `https://eventflow.co.il` |
| `APP_URL` | Optional | App URL used for signup/plan CTA links. Default: `https://app.eventflow.co.il` |
| `SUPABASE_URL` | Optional* | Supabase project URL for build-time data fetch |
| `SUPABASE_ANON_KEY` | Optional* | Supabase anon/public key |
| `GA_MEASUREMENT_ID` | Optional | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). GA is disabled entirely when unset. |
| `GSC_VERIFICATION_ID` | Optional | Google Search Console HTML tag verification value |

*Without `SUPABASE_URL` + `SUPABASE_ANON_KEY` the site builds with no supplier profiles, no blog posts, and no programmatic-SEO vendor pages. The marketing pages, pricing, and legal pages build normally.

Example `.env`:

```env
SITE_URL=https://eventflow.co.il
APP_URL=https://app.eventflow.co.il
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GSC_VERIFICATION_ID=<gsc-meta-content-value>
```

### Dev server

```bash
npm run dev
# → http://localhost:4321
```

### Build

```bash
npm run build
# Output in dist/ (~838 pages when Supabase is connected)
```

### Preview built output

```bash
npm run preview
```

---

## Scripts

| Script | Command | What it does |
|---|---|---|
| `dev` | `astro dev` | Local dev server with HMR |
| `build` | `astro build` | Static build to `dist/` |
| `preview` | `astro preview` | Serve built `dist/` locally |
| `astro` | `astro` | Astro CLI passthrough |
| `lint` | `eslint src/` | Lint all source files |
| `format` | `prettier --write src/` | Auto-format source files |

---

## Project structure

```
src/
├── components/
│   ├── analytics/      # CookieConsent, TrackingEvents
│   ├── blog/           # BlogPostCard, CategoryPills, TOC, Newsletter, etc.
│   ├── landing/        # HeroSection, FeaturesGrid, HowItWorks, PainPoints, StatsBar
│   ├── layout/         # Header, Footer, CTABlock, MobileCta
│   ├── pseo/           # SupplierCard, EmptyState, CityGrid, ServiceGrid, FAQSection, InternalLinks
│   └── seo/            # SEOHead, SchemaOrg, Breadcrumbs, AnswerBlock, FreshnessSignal
├── data/
│   ├── categories.ts   # Blog categories
│   ├── cities.ts       # ~50 Israeli cities/regions
│   ├── faqs.ts         # FAQs per service type
│   └── services.ts     # 17 event service types with Hebrew labels and slugs
├── layouts/
│   ├── BaseLayout.astro # HTML shell, GA Consent Mode v2, CookieConsent
│   ├── BlogLayout.astro
│   └── PageLayout.astro
├── lib/
│   ├── blog.ts         # Blog fetch from Supabase
│   ├── sanitize.ts     # HTML sanitisation
│   ├── seo.ts          # JSON-LD schema factories
│   ├── suppliers.ts    # Supplier fetch + PublicSupplier type
│   └── supabase.ts     # Supabase client (graceful fallback when env missing)
└── pages/
    ├── index.astro
    ├── pricing.astro
    ├── about.astro
    ├── privacy.astro
    ├── terms.astro
    ├── accessibility.astro
    ├── rss.xml.ts
    ├── biz/[slug].astro
    ├── blog/[slug].astro
    ├── blog/[...page].astro
    ├── blog/category/[category].astro
    ├── cities/[city].astro
    └── [service]/
        ├── index.astro
        └── [city].astro

public/
├── llms.txt            # AI answer engine description
├── robots.txt          # Bot directives
├── manifest.json       # PWA manifest
├── favicon.ico / favicon.svg
└── icons/              # App icons
```

---

## Deploy notes

The build output (`dist/`) is **fully static HTML/CSS/JS** — no server runtime required. Deploy to any static hosting:

- **Cloudflare Pages** (recommended) — Israeli CDN PoP, 500 free builds/month, unlimited bandwidth on free tier
- Vercel, Netlify, or any CDN

**Build command:** `npm run build`  
**Output directory:** `dist`  
**Node version:** 22

The build tolerates missing Supabase secrets — CI pipelines without `SUPABASE_URL`/`SUPABASE_ANON_KEY` will produce a valid site with only the static marketing pages. Set the secrets in your deploy platform environment to include the full vendor directory.

### Auto-rebuild on content changes

Set up a Supabase Database Webhook → your deploy platform's deploy hook URL, triggered on `INSERT`/`UPDATE` to `blog_posts` and `suppliers` tables. This keeps the static site current without manual redeploys.

---

## Architecture

```
eventflow.co.il (this repo)          app.eventflow.co.il (separate project)
+---------------------------+        +---------------------------+
| Landing, Pricing, Legal   |        | Dashboard, Leads          |
| Blog (from Supabase)      | ←DB→   | Contracts, Payments       |
| Supplier profiles (pSEO)  |        | Blog editor (admin)       |
| ~838 static pages         |        |                           |
+---------------------------+        +---------------------------+
           |                                    |
           +---------- Supabase (shared) -------+
                              |
                    Cloudflare CDN (PoP: TLV)
```

This site reads Supabase **at build time only**. The app reads in real time.

---

## Launch checklist (external)

These items cannot be completed from within this codebase and must be handled before go-live:

- [ ] **Lawyer sign-off on legal pages** — `privacy.astro` and `terms.astro` are both marked "טיוטה — לאישור עו"ד". Remove the yellow draft banners only after legal approval.
- [ ] **Real phone number in `accessibility.astro`** — Israeli standard ת"י 5568 (Amendment 36) requires a real accessibility-coordinator phone number. The placeholder was intentionally removed; add `<li>טלפון: [מספר אמיתי]</li>` under the contact section.
- [ ] **Set `GA_MEASUREMENT_ID` in production** — and verify in GA4 that `analytics_storage` starts as `denied` and is only updated to `granted` after user acceptance. Test with GA4 DebugView.
- [ ] **Point `SITE_URL` and `APP_URL` at production domains** — confirm `https://eventflow.co.il` and `https://app.eventflow.co.il` before final deploy.
- [ ] **Update `public/llms.txt` prices** — current file shows pre-VAT prices (₪299/₪499/₪1,490) that differ from the VAT-inclusive pricing page (₪353/₪589/₪1,758). Either update to VAT-inclusive prices or add explicit "excluding VAT" notation.
- [ ] **Submit sitemap to Google Search Console** — `sitemap-index.xml`
- [ ] **Cloudflare DNS + custom domain** — connect `eventflow.co.il` to Cloudflare Pages; add `www` redirect.
