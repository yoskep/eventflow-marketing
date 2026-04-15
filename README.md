# EventFlow — אתר שיווקי

אתר שיווקי סטטי ל-[EventFlow](https://eventflow.co.il) — מערכת CRM לספקי אירועים בישראל.

כתובת האתר: **eventflow.co.il**
כתובת האפליקציה (פרויקט נפרד): **app.eventflow.co.il** (EventFlow-Saas)

---

## מה יש באתר?

| חלק | כמות דפים | הסבר |
|-----|-----------|-------|
| דפים ראשיים | 6 | דף נחיתה, מחירים, אודות, פרטיות, תנאי שימוש, נגישות |
| בלוג | דינמי | מאמרים מ-Supabase, קטגוריות, RSS |
| דפי SEO (pSEO) | ~850 | 17 שירותים x ~50 ערים (למשל "צלם באשדוד") |
| דפי שירות | 17 | דף לכל סוג ספק |
| דפי ערים | ~50 | דף לכל עיר/אזור |
| פרופילי ספקים | דינמי | דף לכל ספק ציבורי |
| **סה"כ** | **~838** | נבנים אוטומטית ב-build |

### תכונות SEO

- HTML סטטי לחלוטין (אפס JavaScript בדפי תוכן)
- Structured Data (JSON-LD): Organization, WebSite, Article, LocalBusiness, FAQPage, Service, BreadcrumbList, SoftwareApplication
- Sitemap XML אוטומטי
- פיד RSS ב-`/rss.xml`
- Open Graph + Twitter Card בכל דף
- הנחיות לבוטי AI ב-robots.txt (Google, ChatGPT, Claude, Perplexity, Apple Intelligence)
- תוכן ידידותי ל-AI (AnswerBlock, FreshnessSignal)
- רשת קישורים פנימיים בין דפי שירות/עיר/בלוג
- עברית RTL מלאה
- מעקב אירועים ב-GA4

---

## שלב 1 — התקנה מקומית

### מה צריך

1. **Node.js 22 ומעלה** — [הורד מכאן](https://nodejs.org/en/download)
   - אחרי ההתקנה, פתח Terminal וכתוב `node -v` כדי לוודא
2. **Git** — [הורד מכאן](https://git-scm.com/downloads)

### התקנה

```bash
# שכפול הפרויקט
git clone <repo-url>
cd eventflow-marketing

# התקנת dependencies
npm install

# העתקת קובץ הגדרות
cp .env.example .env
```

### מילוי קובץ .env

פתח את `.env` בעורך טקסט:

```bash
# חובה — בלי זה האתר לא ייבנה עם תוכן דינמי
SUPABASE_URL="https://ctadwezlkhwjqsdqkymu.supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"

# כתובות האתרים
SITE_URL="https://eventflow.co.il"
APP_URL="https://app.eventflow.co.il"

# אופציונלי — הגדר מאוחר יותר
GA_MEASUREMENT_ID=""
GSC_VERIFICATION_ID=""
```

**איפה מוצאים את ה-anon key?**
1. כנס ל-[Supabase Dashboard](https://supabase.com/dashboard)
2. בחר את הפרויקט
3. **Settings** > **API** > העתק את **anon public** key

### הרצה מקומית

```bash
npm run dev
```

האתר ייפתח בכתובת **http://localhost:4321**

> שים לב: אם Supabase לא נגיש, האתר עדיין ייבנה — פשוט בלי דפי בלוג וספקים (הם יופיעו כשה-DB יהיה פעיל)

---

## שלב 2 — העלאה לאוויר עם Cloudflare Pages (מומלץ)

### למה Cloudflare?

- **CDN מתל אביב** — תוכן מוגש ישירות מישראל (~5ms latency)
- **bandwidth ללא הגבלה** — בחינם. Vercel חוסם ב-100GB
- **500 builds/חודש** — חשוב כי ה-webhook בונה מחדש על כל מאמר/ספק
- **$0 לטווח ארוך** — Vercel מתחיל לגבות $20/חודש מהר

### 2.1 הגדרת Cloudflare DNS (פעם אחת)

> אם הדומיין כבר ב-Cloudflare, דלג לשלב 2.2.

1. כנס ל-[dash.cloudflare.com](https://dash.cloudflare.com) והירשם (חינם)
2. לחץ **Add a site** > הקלד `eventflow.co.il`
3. בחר **Free plan**
4. Cloudflare יסרוק DNS קיימים — אשר
5. תקבל **2 nameservers** (כמו `aria.ns.cloudflare.com`)
6. כנס לספק הדומיין שלך ושנה את ה-nameservers:
   - **[nic.co.il / ISOC](https://domains.nic.co.il)** — אם רשום ישירות
   - **[Namecheap](https://ap.www.namecheap.com)** — Domain List > Manage > Nameservers > Custom DNS
   - **[GoDaddy](https://dcc.godaddy.com)** — DNS > Nameservers > Change
7. חכה עד 24 שעות (בד"כ 1-2 שעות)

### 2.2 פריסת האתר ב-Cloudflare Pages

1. כנס ל-[dash.cloudflare.com](https://dash.cloudflare.com) > **Workers & Pages**
2. לחץ **Create** > **Pages** > **Connect to Git**
3. אשר גישה ל-GitHub ובחר את ה-repository **eventflow-marketing**
4. הגדרות Build:
   - **Project name**: `eventflow-marketing`
   - **Production branch**: `main`
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. לחץ **Environment variables** והוסף:

   | שם | ערך |
   |----|-----|
   | `SUPABASE_URL` | `https://ctadwezlkhwjqsdqkymu.supabase.co` |
   | `SUPABASE_ANON_KEY` | (ה-anon key שלך) |
   | `SITE_URL` | `https://eventflow.co.il` |
   | `APP_URL` | `https://app.eventflow.co.il` |
   | `NODE_VERSION` | `22` |

6. לחץ **Save and Deploy**
7. חכה ל-build (כ-1-2 דקות). תקבל כתובת זמנית כמו `eventflow-marketing.pages.dev`

### 2.3 חיבור דומיין eventflow.co.il

1. ב-Cloudflare Pages: לחץ על הפרויקט > **Custom domains** > **Set up a domain**
2. הקלד `eventflow.co.il`
3. Cloudflare מוסיף CNAME אוטומטית (כי DNS כבר אצלו)
4. הוסף גם `www.eventflow.co.il` — הוא יפנה אוטומטית לגרסה ללא www
5. **HTTPS מופעל אוטומטית** — אין מה לעשות
6. תוך כמה דקות `https://eventflow.co.il` יעבוד

---

## שלב 3 — הגדרת Google (אנליטיקס + Search Console)

### 3.1 Google Analytics (מעקב תנועה)

**למה צריך?** כדי לדעת כמה אנשים נכנסים לאתר, מאיפה הם מגיעים, ואיפה הם יוצאים.

1. כנס ל-[analytics.google.com](https://analytics.google.com)
2. לחץ **Admin** (גלגל שיניים) > **Create Property**
3. מלא שם: `EventFlow` > Next
4. בחר **Business objectives** > Next
5. בחר **Web** > הקלד `eventflow.co.il`
6. **העתק את ה-Measurement ID** (נראה ככה: `G-XXXXXXXXXX`)
7. חזור ל-Cloudflare Pages > **Settings > Environment variables**
8. הוסף: `GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
9. ב-**Deployments** > לחץ **Retry deployment** על ה-deployment האחרון

### 3.2 Google Search Console (הופעה בגוגל)

**למה צריך?** כדי שגוגל יכיר את האתר, יסרוק אותו, ויציג אותו בתוצאות חיפוש.

1. כנס ל-[search.google.com/search-console](https://search.google.com/search-console)
2. לחץ **Add Property** > **URL prefix** > הקלד `https://eventflow.co.il`
3. בחר שיטת אימות **HTML tag**
4. **העתק רק את ה-content** מתוך ה-meta tag (הערך בין המרכאות)
5. חזור ל-Cloudflare Pages > **Settings > Environment variables**
6. הוסף: `GSC_VERIFICATION_ID` = (הערך שהעתקת)
7. Retry deployment
8. חזור ל-Google Search Console ולחץ **Verify**
9. אחרי אימות, שלח את ה-sitemap:
   - לחץ **Sitemaps** בתפריט השמאלי
   - הקלד `sitemap-index.xml` > **Submit**

---

## שלב 4 — עדכון אוטומטי (Rebuild Webhook)

כל פעם שמוסיפים מאמר בבלוג או ספק חדש נרשם, צריך לבנות מחדש את האתר כדי שהתוכן יופיע. אפשר לעשות את זה אוטומטית:

### 4.1 יצירת Deploy Hook ב-Cloudflare

1. ב-Cloudflare Pages: בחר את הפרויקט > **Settings** > **Builds & deployments**
2. גלול ל-**Deploy hooks** > **Add deploy hook**
3. שם: `supabase-content-update`
4. ענף: `main`
5. **העתק את ה-URL** שנוצר

### 4.2 חיבור ל-Supabase

1. כנס ל-[Supabase Dashboard](https://supabase.com/dashboard) > **Database > Webhooks**
2. לחץ **Create Webhook**
3. הגדרות:
   - **Name**: `rebuild-on-blog-update`
   - **Table**: `blog_posts`
   - **Events**: INSERT, UPDATE
   - **Type**: HTTP Request
   - **URL**: (ה-Deploy Hook URL מ-Cloudflare)
   - **Method**: POST
4. לחץ **Create**
5. חזור על התהליך עבור טבלת `suppliers` (כדי שפרופילים חדשים יופיעו)

עכשיו כל פעם שתפרסם מאמר חדש באפליקציה — האתר ייבנה מחדש אוטומטית תוך כ-2 דקות.

> עם Cloudflare Pages יש לך 500 builds/חודש בחינם. גם אם מפרסמים 5 מאמרים ביום — זה 150/חודש, בשפע.

---

## שלב 5 — ניהול תוכן

### בלוג

מאמרים נכתבים **באפליקציה** (app.eventflow.co.il) ומופיעים אוטומטית באתר.

1. כנס לאפליקציה > **ניהול בלוג**
2. לחץ **מאמר חדש**
3. כתוב כותרת, תוכן, בחר קטגוריה
4. לחץ **פרסם**
5. האתר ייבנה מחדש אוטומטית (אם הגדרת Webhook)

### פרופילי ספקים

ספקים שנרשמים באפליקציה ומשלימים onboarding מקבלים דף פרופיל ציבורי אוטומטית.

### דפי SEO

דפי ה-SEO (כמו "צלם בתל אביב") נבנים אוטומטית מהנתונים. אין צורך לערוך אותם ידנית.

---

## שלב 6 — תחזוקה

### פקודות שימושיות

```bash
npm run dev       # שרת פיתוח (localhost:4321)
npm run build     # בניית כל 838+ הדפים
npm run preview   # צפייה מקומית בגרסה שנבנתה
npm run lint      # בדיקת שגיאות קוד
npm run format    # סידור אוטומטי של הקוד
```

### עדכון תוכן

| מה לעדכן | איפה |
|-----------|------|
| מחירי מנויים | `src/pages/pricing.astro` |
| שאלות נפוצות | `src/data/faqs.ts` |
| מידע על החברה | `src/pages/about.astro` |
| פרטיות ותנאים | `src/pages/privacy.astro`, `src/pages/terms.astro` |
| נגישות | `src/pages/accessibility.astro` |
| רובוטים/AI | `public/robots.txt` |

### בדיקת ביצועים

- [Google PageSpeed Insights](https://pagespeed.web.dev/) — הקלד `eventflow.co.il`
- [Google Search Console](https://search.google.com/search-console) — בדוק שגיאות סריקה
- [Ahrefs Free Tools](https://ahrefs.com/free-seo-tools) — בדיקת SEO בסיסית

---

## ארכיטקטורה

```
eventflow.co.il (האתר הזה)         app.eventflow.co.il (האפליקציה)
+--------------------------+        +--------------------------+
| דף נחיתה, מחירים, חוקי  |        | דשבורד, לידים, הצעות    |
| בלוג (מ-Supabase)       |        | עורך בלוג (admin)        |
| פרופילי ספקים            | ←→     | חוזים, תשלומים           |
| דפי SEO (850+ עמודים)   |        | הגדרות, גלריות           |
| Sitemaps, RSS, robots    |        |                          |
+--------------------------+        +--------------------------+
         |                                   |
         +------- Supabase (משותף) ----------+
                        |
              Cloudflare DNS + CDN
              (תל אביב PoP — ~5ms)
```

שני הפרויקטים משתמשים באותו בסיס נתונים Supabase. האתר השיווקי שולף נתונים **ב-build time** (בזמן הבנייה). האפליקציה שולפת **בזמן אמת**.

---

## מבנה הפרויקט

```
src/
├── components/
│   ├── blog/           # רכיבי בלוג (כרטיס, ניוזלטר, שיתוף)
│   ├── landing/        # דף נחיתה (Hero, Features, Stats)
│   ├── layout/         # Header, Footer, CTA, Mobile CTA
│   ├── seo/            # SEO Head, Breadcrumbs, Schema
│   └── suppliers/      # כרטיס ספק
├── data/
│   ├── cities.ts       # רשימת 50+ ערים
│   ├── services.ts     # 17 סוגי שירות
│   └── faqs.ts         # שאלות נפוצות לפי שירות
├── layouts/            # תבניות (דף, בלוג)
├── lib/                # Supabase client, SEO schemas, blog utils
├── pages/              # כל הדפים (Astro routing)
│   ├── blog/           # בלוג + RSS
│   ├── [service]/      # דפי שירות + עיר (pSEO)
│   ├── biz/            # פרופילי ספקים
│   └── cities/         # דפי ערים
├── styles/             # CSS גלובלי
└── public/             # קבצים סטטיים (icons, manifest, robots)
```

---

## צ׳קליסט השקה

- [ ] DNS מועבר ל-Cloudflare
- [ ] Cloudflare Pages deployed עם env vars
- [ ] `eventflow.co.il` מחובר ל-Pages
- [ ] Google Search Console — אומת + sitemap נשלח
- [ ] Google Analytics — Measurement ID מוגדר
- [ ] Supabase webhook — rebuild אוטומטי על blog_posts ו-suppliers
- [ ] בדיקה ב-[PageSpeed Insights](https://pagespeed.web.dev/) — ציון מעל 90

---

## שאלות נפוצות

**ש: למה ה-build מציג "Failed to fetch suppliers"?**
ת: זה קורה כש-Supabase לא נגיש. האתר עדיין ייבנה — רק ללא דפי בלוג וספקים. ודא שה-Supabase project פעיל וה-anon key נכון.

**ש: איך מעדכנים את רשימת הערים?**
ת: ערוך את `src/data/cities.ts` — הוסף/הסר ערים. אחרי build יווצרו דפים חדשים אוטומטית.

**ש: איך מוסיפים סוג שירות חדש?**
ת: ערוך את `src/data/services.ts` ו-`src/data/faqs.ts` — הוסף שירות + שאלות נפוצות. דפי pSEO חדשים ייווצרו אוטומטית.

**ש: כמה זמן לוקח build?**
ת: בערך שנייה אחת ל-838 דפים. Astro SSG מהיר מאוד.

**ש: צריך להריץ build אחרי כל שינוי?**
ת: רק עבור שינויי קוד. שינויי תוכן מ-Supabase (בלוג, ספקים) ייבנו אוטומטית דרך ה-webhook.

**ש: האתר עובד בלי JavaScript?**
ת: כן! כל דפי התוכן הם HTML סטטי. JavaScript נטען רק עבור אינטראקציות (ניוזלטר, מנו נייד).

**ש: כמה builds אני יכול לעשות בחודש?**
ת: 500 ב-Cloudflare Pages Free. גם אם מפרסמים 5 מאמרים ביום — זה 150/חודש, בשפע.

---

## רישיון

פרטי — כל הזכויות שמורות.
