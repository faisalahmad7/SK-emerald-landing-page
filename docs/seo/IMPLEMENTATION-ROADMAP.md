# Implementation roadmap

Companion to [SEO-STRATEGY.md](SEO-STRATEGY.md). **Who:** C = Claude (me) · Y = you (Google accounts, Business Profile) · O = shop owner.

**Status, 13 Nov 2026:** Phase 0 research ✅ · Phase 1 ✅ live (all tasks except 1.10 and 1.17, which need your Cloudflare/Google logins; steps in `handoff/OWNER-ACTIONS.md`) · Phase 2: page rewrites, About, Reviews, FAQ, gallery split ✅; Business Profile, citations and gated pages wait on the owner · Phase 3: blog system + 6 guides ✅, 3 cost guides drafted (need prices). Report: `reports/2026-11-13-phase1.md`.

**Ground rules**
- All work stays on D:. Code changes go on a branch (`seo/phase-1`, `seo/phase-2`, …) with a PR to `main`. Vercel builds a preview of every PR, which serves as staging.
- Nothing goes live until its checks pass **and you approve the deploy**. A push to `main` does **not** update the live site. Live is the Cloudflare Pages project `sk-emerald-interior`, deployed manually (`npx wrangler pages deploy dist --project-name sk-emerald-interior`). Cloudflare keeps every deployment, so rollback is one click.
- The uncommitted `package-lock.json` change in the working tree is not mine and won't be touched.

---

## Phase 0: Research and baseline (free tools; see FREE-TOOLKIT.md)

| # | Task | Who | Status / check |
|---|------|-----|----------------|
| 0.1 | Lighthouse baseline, home, mobile | C | ✅ 13 Nov: `baseline/lighthouse-mobile-home-2026-11-13.json` (perf 69, LCP 5.6 s) |
| 0.2 | Raw-HTML audit of 10 live URLs (`onpage-audit.mjs`) | C | ✅ 13 Nov: `baseline/onpage-live-2026-11-13.md` (40 errors) |
| 0.3 | Google Autocomplete mining, 339 queries (`autocomplete.mjs`) | C | ✅ 13 Nov: 1,409 phrases in `research/autocomplete.*` |
| 0.4 | Competitor sitemaps: DesignCafe, HomeLane, Livspace (`sitemap-topics.mjs`) | C | ✅ 13 Nov: `research/sitemaps/` |
| 0.5 | Heading benchmark for "modular kitchen cost Pune" (`outline.mjs`) | C | ✅ 13 Nov: `research/outlines/` |
| 0.6 | Cluster plan: 39 pages, 8 clusters, link matrix, Keyword Planner shortlist (`cluster-plan.mjs`) | C | ✅ 13 Nov: `research/cluster-plan.md`, `cluster-map.html`, `keywords-to-validate.csv` |
| 0.7 | **Keyword Planner:** upload `research/keywords-to-validate.csv` (163 phrases), location Pune, download the ranges | Y (free Google Ads account, no campaign) | Save as `research/keyword-planner.csv` → I re-rank the calendar |
| 0.8 | **Google Trends:** "modular kitchen", "sofa set", "wardrobe", "recliner", "false ceiling"; region Maharashtra; past 5 years; download CSV | Y | `research/trends-*.csv` → I set publishing months |
| 0.9 | **Maps screenshots:** top 5 results for "furniture shop Kondhwa", "sofa maker Kondhwa", "modular kitchen Kondhwa" | Y | → competitor GBP comparison and category decision |
| 0.10 | Optional: AlsoAsked/AnswerThePublic for the 6 launch topics; r/pune thread links; top-5 Pune Google URLs for each launch topic (incognito) | Y | `research/paa-*`, `research/forums.md`, URLs for `outline.mjs` |
| 0.11 | Run the 10 AI-visibility prompts and record results | C/Y | `baseline/ai-visibility.md` |
| 0.12 | Create branch `seo/phase-1` from `main` @ e5a8539 (on your "go"); commit `CLAUDE.md`, `docs/seo/` and `scripts/seo/`, but add `docs/seo/research/sitemaps/` to `.gitignore` (~4 MB of raw, re-creatable data) | C | `git status` clean on branch |

## Phase 1: Technical foundation (week 1)

| # | Task | Files | Who | Check |
|---|------|-------|-----|-------|
| 1.1 | Make the router work at build time: accept an initial path, guard every `window`/`document`/audio/GSAP/matchMedia use | `src/router.jsx`, `src/App.jsx`, `src/components/*` | C | No browser APIs touched during server render |
| 1.2 | **Pre-render every route to static HTML** (React `renderToString`), then `hydrateRoot` in the browser. Route list generated from `collections.js`, `rooms.js` and the static pages. Output `dist/<path>.html` so URLs keep no trailing slash | `src/entry-server.jsx` (new), `scripts/prerender.mjs` (new), `src/main.jsx`, `package.json` (`build` = vite build + SSR build + prerender) | C | `curl` of every URL returns its own content, H1, title; no hydration warnings in console |
| 1.3 | One source of page metadata: title, description, canonical, OG/Twitter tags and JSON-LD per route, used by both the pre-renderer and the client | `src/seo/meta.js` (new), `src/components/ui.jsx` (`Seo`) | C | Unique title + description on all pages (script asserts it) |
| 1.4 | Titles, meta descriptions and H1s from SITE-STRUCTURE.md §2 for all 34 pages | pages, data files | C | Lengths within limits; one H1 per page |
| 1.5 | Structured data `@graph` (FurnitureStore/Organization/WebSite on all pages; Breadcrumb, Service/OfferCatalog, FAQPage, ContactPage where relevant). Hours and geo filled when confirmed | `src/seo/schema.js` (new) | C | Schema.org validator + Rich Results Test: 0 errors |
| 1.6 | `robots.txt`, generated `sitemap.xml` (with lastmod), `llms.txt`, `404.html` (real 404 status) | `public/robots.txt`, `scripts/prerender.mjs` | C | `/robots.txt` is text/plain; `/sitemap.xml` validates; a random URL returns 404 |
| 1.7 | Replace the catch-all SPA rewrite; add 301s `/collections/office-spaces` → `/interiors/office-spaces`, `/interiors/kitchen` → `/interiors/modular-kitchen` | `public/_redirects` | C | `curl -I` shows 301s; all real routes still 200 |
| 1.8 | Headers: long cache on `/assets/*`, `/images/*`, `/fonts/*`; security headers; `X-Robots-Tag: noindex` on `*.pages.dev` | `public/_headers` (new) | C | `curl -I` on both hosts |
| 1.9 | Vercel copy → 301 to `https://sk-emeraldinterior.in` (host-conditional redirect, PR previews unaffected) | `vercel.json` | C | `curl -I https://sk-emerald-landing-page.vercel.app/` → 301 |
| 1.10 | Cloudflare: add `www` record + redirect rule www → apex; Bulk Redirect `sk-emerald-interior.pages.dev` → apex; turn on Crawler Hints and Web Analytics | Cloudflare dashboard/API | C (if the Wrangler token has zone rights; otherwise Y with exact click-steps from me) | `curl -I` checks |
| 1.11 | Social preview images 1200×630 for home, each main collection and the blog (built from real photos with the brand mark) | `scripts/make-og.mjs` (new, uses `sharp`), `public/og/` | C | Facebook Sharing Debugger / WhatsApp preview shows the image |
| 1.12 | Performance: self-host the two fonts (woff2, subset, preload, `font-display: swap`); intro loader per decision 1; load the transformation video only near the viewport; per-route hero preload; remove dead CSS across the 5 stylesheets; explicit image sizes | `index.html`, `src/App.jsx`, `src/styles*.css`, `public/fonts/` | C | Mobile Lighthouse ≥ 90, LCP < 2.5 s, CLS < 0.1 on home, sofas, contact |
| 1.13 | Fix the two accessibility failures (prohibited ARIA attribute, contrast) | components / CSS | C | Lighthouse accessibility ≥ 98 |
| 1.14 | Fix NAP in code: one address string, phone format, hours (after ★ confirmation) | `src/data/business.js` | C | Same text in footer, contact, schema, llms.txt |
| 1.15 | Full regression and SEO gate: build → `node scripts/seo/onpage-audit.mjs --dir dist` (**0 errors**: unique titles/descriptions, 1 H1, canonical, JSON-LD parses, > 150 words) → Playwright route audit at 320/375/768/1360 px (`scripts/audit.mjs`, updated for new routes) → interaction tests (`scripts/interact.mjs`) → no console/hydration errors. Add `npm run seo:audit` for the first step | `scripts/`, `package.json` | C | All pass; report in PR |
| 1.16 | PR → Vercel preview review → **your approval** → merge → `npm run deploy` → live checks | | C + Y | Live `curl`/Lighthouse checks pass |
| 1.17 | Search Console: Domain property (DNS TXT via Cloudflare), submit sitemap, request indexing for the top 10 URLs. Bing Webmaster Tools: import from GSC, submit sitemap. IndexNow key file + first submission | GSC/Bing accounts | Y signs in; C adds the DNS record and key file | Sitemap "Success"; URL Inspection shows the rendered page |

**Phase 1 exit:** every route is real HTML with unique metadata and schema; one canonical host; valid robots/sitemap/404; mobile performance ≥ 90; GSC and Bing receiving the sitemap.

## Phase 2: Pages and local SEO (weeks 2-4)

| # | Task | Who | Check |
|---|------|-----|-------|
| 2.1 | Page rewrites and new pages per CONTENT-CALENDAR.md §3 (Home, About, main collections, Modular kitchen, Interiors, Reviews, FAQ, Materials, Gallery split, piece pages). FAQs use each page's Autocomplete evidence from `cluster-plan.md` | C (drafts) → O (facts) | Word counts met; no duplicate text between pages; links per the cluster matrix |
| 2.1b | Gated pages, written now and published only on owner confirmation: `/services/sofa-repair`, `/services/furniture-polishing`, `/collections/kitchen-trolleys`, `/areas/kondhwa`, `/areas/hadapsar`, `/areas/undri` | C → O | Each has a confirmed fact sheet before it goes live |
| 2.2 | Rename and re-alt the owner's real photos (e.g. `13.webp` → `green-velvet-sofa-set-kondhwa.webp`), with redirects not needed (images aren't linked externally) | C | No broken images (route audit) |
| 2.3 | **Business Profile overhaul**: name exactly "SK Emerald Interior" (matching the shop sign); categories per decision 7; 750-character description; hours; services with descriptions; one Product per collection; attributes; WhatsApp chat; website link with UTM (`?utm_source=google&utm_medium=organic&utm_campaign=gbp`); appointment link → `/contact`; opening date; 20+ real photos | Y (C writes every text) | Profile strength complete; name/address identical to site |
| 2.4 | Review engine: WhatsApp message template sent after delivery, printed QR card at the showroom, reply templates; target 3-4 new reviews a month | C (templates) → O | Review count trend |
| 2.5 | NAP sheet (one canonical name/address/phone/hours/description, short and long) | C | Shared file `docs/seo/NAP.md` |
| 2.6 | Citations, top 10: Justdial, IndiaMART, Sulekha, Bing Places (import from GBP), Apple Business Connect, Houzz India, Facebook page, Instagram business, Pinterest business, YouTube. Fix any existing listing that differs from the NAP sheet | Y/O (C prepares all text) | Spreadsheet of listing URLs → added to schema `sameAs` |
| 2.7 | Deploy Phase 2 (same checks as 1.15-1.16) and resubmit the sitemap | C + Y | Live checks |

## Phase 3: Blog and GEO (weeks 3-12)

| # | Task | Who | Check |
|---|------|-----|-------|
| 3.1 | Blog system: Markdown posts in `src/content/blog/`, compiled at build, each post code-split (main bundle doesn't grow), pre-rendered, in the sitemap, with BlogPosting schema, author box, dates, categories, related posts | C | Post pages pass the GEO checklist |
| 3.2 | Write and publish the 6 launch posts, then 2 a month (CONTENT-CALENDAR.md §4), each through FREE-TOOLKIT workflow A (brief in `docs/seo/briefs/` → `outline.mjs` benchmark → draft → `readability.mjs` PASS → owner fact check → gate) | C (write) → O (fact check) | Each post indexed within 2 weeks (GSC) |
| 3.3 | Area pages, only those with real local proof (Kondhwa, Hadapsar, Undri first; max 5) | C → O | ≥ 650 words, ≥ 60% unique |
| 3.4 | Business Profile posts weekly (12 drafted at a time) | C → Y | Posting streak |
| 3.5 | Monthly review, FREE-TOOLKIT workflow B: GSC CSV → `gsc-striking.mjs` (refresh posts at positions 8-20, rewrite titles with a CTR gap), Bing export, GBP Performance, Lighthouse, `onpage-audit.mjs --sitemap`, AI prompts → `docs/seo/reports/YYYY-MM.md` | C (Y exports GSC/Bing/GBP) | Report with 3-5 actions |
| 3.5b | Quarterly, workflow D: re-run `autocomplete.mjs` and `sitemap-topics.mjs`, diff against the last run, update `clusters.json`, re-run `cluster-plan.mjs` | C | New topics added without cannibalization |
| 3.6 | Pinterest pins / Instagram posts reusing real photos with links to collection pages (image search is big for furniture) | O/Y (C writes captions) | Referral visits in analytics |

## Phase 4: Authority (months 4-12)

| # | Task | Who |
|---|------|-----|
| 4.1 | Project stories (case studies) with real photos, area, scope and the customer's words | C → O |
| 4.2 | Get onto "best furniture shops / interior designers in Kondhwa / Pune" lists (outreach emails drafted by me). These lists are the strongest signal for AI recommendations of local businesses | C drafts → Y sends |
| 4.3 | Local links: material suppliers' "where to buy"/dealer pages, builders and society offices in new Kondhwa/Undri projects (possession-time furniture packages), Pune home and lifestyle bloggers, local news features | C drafts → O/Y |
| 4.4 | Monthly report: GSC clicks/queries, GBP insights, reviews, Lighthouse, AI test, next month's actions | C |
| 4.5 | SEO drift baseline after Phase 2 so later edits can't silently break titles, schema or canonicals | C |
| 4.6 | Optional: Hindi/Marathi versions of the top 5 pages with hreflang, if Search Console shows demand | C |

## What I will not do without a separate yes

Deploy to the live site · merge or push to `main` · change DNS or Cloudflare settings · delete the Vercel project · publish any business fact the owner hasn't confirmed. I can't edit the Business Profile or Google/Bing accounts myself: those steps are yours, and I'll prepare every word.
