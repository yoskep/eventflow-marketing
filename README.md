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

## שלב 2 — העלאה לאוויר

### 2.1 בחירת פלטפורמה

| פלטפורמה | מחיר | יתרון | קישור |
|-----------|-------|-------|--------|
| **Vercel** (מומלץ) | חינם | הכי קל, מהיר, תמיכה ב-Astro | [vercel.com](https://vercel.com) |
| **Netlify** | חינם | פופולרי, פשוט | [netlify.com](https://www.netlify.com) |
| **Cloudflare Pages** | חינם | הכי זול בסקייל | [pages.cloudflare.com](https://pages.cloudflare.com) |

### 2.2 פריסה ב-Vercel (מומלץ)

**שלב 1 — הרשמה**
1. כנס ל-[vercel.com](https://vercel.com)
2. לחץ **Sign Up** > **Continue with GitHub**
3. אשר גישה ל-GitHub

**שלב 2 — יצירת פרויקט**
1. לחץ **Add New Project**
2. בחר את ה-repository `eventflow-marketing`
3. הגדרות:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

**שלב 3 — הוספת Environment Variables**

לחץ על **Environment Variables** והוסף:

| שם | ערך |
|----|-----|
| `SUPABASE_URL` | `https://ctadwezlkhwjqsdqkymu.supabase.co` |
| `SUPABASE_ANON_KEY` | (ה-anon key שלך) |
| `SITE_URL` | `https://eventflow.co.il` |
| `APP_URL` | `https://app.eventflow.co.il` |

**שלב 4 — Deploy!**

לחץ **Deploy** וחכה כדקה. Vercel ייתן לך כתובת זמנית (כמו `eventflow-marketing.vercel.app`).

### 2.3 חיבור דומיין eventflow.co.il

1. ב-Vercel: **Settings > Domains > Add**
2. הקלד `eventflow.co.il`
3. Vercel ייתן לך רשומות DNS — העתק אותן
4. כנס לספק הדומיין שלך:
   - **[Cloudflare](https://dash.cloudflare.com)** — DNS > Add Record
   - **[GoDaddy](https://dcc.godaddy.com)** — DNS Management
   - **[Namecheap](https://ap.www.namecheap.com)** — Advanced DNS
5. הוסף את הרשומות:
   - **Type**: A (או CNAME)
   - **Name**: `@` (עבור eventflow.co.il) או `www`
   - **Value**: הערך ש-Vercel נתן
6. חכה עד 24 שעות (בד"כ 5-30 דקות)

### 2.4 הגדרת HTTPS

Vercel מגדיר HTTPS אוטומטית עם Let's Encrypt. אין מה לעשות.

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
7. חזור ל-Vercel > **Settings > Environment Variables**
8. הוסף: `GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
9. **Redeploy** (Settings > Deployments > שלוש נקודות > Redeploy)

### 3.2 Google Search Console (הופעה בגוגל)

**למה צריך?** כדי שגוגל יכיר את האתר, יסרוק אותו, ויציג אותו בתוצאות חיפוש.

1. כנס ל-[search.google.com/search-console](https://search.google.com/search-console)
2. לחץ **Add Property** > **URL prefix** > הקלד `https://eventflow.co.il`
3. בחר שיטת אימות **HTML tag**
4. **העתק רק את ה-content** מתוך ה-meta tag (הערך בין המרכאות)
5. חזור ל-Vercel > **Environment Variables**
6. הוסף: `GSC_VERIFICATION_ID` = (הערך שהעתקת)
7. **Redeploy**
8. חזור ל-Google Search Console ולחץ **Verify**
9. אחרי אימות, שלח את ה-sitemap:
   - לחץ **Sitemaps** בתפריט השמאלי
   - הקלד `sitemap-index.xml` > **Submit**

---

## שלב 4 — עדכון אוטומטי (Rebuild Webhook)

כל פעם שמוסיפים מאמר בבלוג או ספק חדש נרשם, צריך לבנות מחדש את האתר כדי שהתוכן יופיע. אפשר לעשות את זה אוטומטית:

### 4.1 יצירת Deploy Hook ב-Vercel

1. ב-Vercel: **Settings > Git > Deploy Hooks**
2. לחץ **Create Hook**
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
   - **URL**: (ה-Deploy Hook URL מ-Vercel)
   - **Method**: POST
4. לחץ **Create**
5. חזור על התהליך עבור טבלת `suppliers` (כדי שפרופילים חדשים יופיעו)

עכשיו כל פעם שתפרסם מאמר חדש באפליקציה — האתר ייבנה מחדש אוטומטית תוך כדקה.

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

---

## רישיון

פרטי — כל הזכויות שמורות.
