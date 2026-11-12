# SK Emerald Interior: SEO, GEO and AEO strategy

Site: https://sk-emeraldinterior.in · Prepared 13 Nov 2026, **revised the same day with free-tool research data** · Status: **Phase 1 shipped and live on 13 Nov 2026** (pre-rendering, schema, new pages, 6 guides). Results: [reports/2026-11-13-phase1.md](reports/2026-11-13-phase1.md). Remaining steps for you and the owner: [handoff/OWNER-ACTIONS.md](handoff/OWNER-ACTIONS.md).

Companion files in this folder:
- [IMPLEMENTATION-ROADMAP.md](IMPLEMENTATION-ROADMAP.md): every task, in order, with owner and check.
- [SITE-STRUCTURE.md](SITE-STRUCTURE.md): URL map, titles/H1s, schema per page, internal links.
- [CONTENT-CALENDAR.md](CONTENT-CALENDAR.md): page rewrites, blog order and publishing rules.
- [COMPETITOR-ANALYSIS.md](COMPETITOR-ANALYSIS.md): who ranks today and where the openings are.
- [FREE-TOOLKIT.md](FREE-TOOLKIT.md): the free tools, scripts and step-by-step workflows (research, writing checks, monthly review).
- [research/cluster-plan.md](research/cluster-plan.md): 39 pages in 8 topic clusters, each with the real search phrases behind it (open `research/cluster-map.html` in a browser for the interactive map).

---

## 1. The business, in search terms

- **What it is:** a custom furniture maker and retailer with its own factory (Kondhwa BK) and a showroom (Shop 226, Unitas Fashion Centre, Kondhwa, Pune 411048). It makes sofas, recliners, beds, wardrobes, kitchens, TV units, office furniture and 15+ other pieces, and plans whole rooms.
- **Who searches:** families furnishing a new flat or redoing a room in south-east Pune (Kondhwa, NIBM Road, Undri, Wanowrie, Salunke Vihar, Hadapsar, Pisoli, Katraj). They search on mobile, compare prices and act on WhatsApp or a call.
- **How they find it today:** almost only through the Google Business Profile (5.0 stars, 8 reviews, 326 interactions). The website contributes close to nothing in search: a web search for the brand name returned no result from the site.
- **Goal:** more WhatsApp messages, calls and showroom visits from people in Pune who need furniture or interiors, coming from Google Search, Google Maps, and AI assistants (ChatGPT, Gemini, Perplexity, Google AI Overviews).

## 2. Audit: what is wrong today (checked 13 Nov 2026)

| # | Finding | Evidence | Impact |
|---|---------|----------|--------|
| 1 | **Every URL returns the same empty HTML shell.** Content, titles and descriptions are added by JavaScript after load. | `curl` of `/`, `/collections/sofas`, `/robots.txt`, `/sitemap.xml`, `/llms.txt` all return the same 1,567-byte `index.html`. `onpage-audit.mjs` on 10 live URLs: **40 errors**: 0 words, 0 H1, no canonical, identical title and description on every page (`baseline/onpage-live-2026-11-13.md`) | **Critical.** AI crawlers (GPTBot, PerplexityBot, ClaudeBot), WhatsApp/Facebook link previews and Bing only partly see the site. Google must render JS, which is slower and less reliable. |
| 2 | No real `robots.txt` or `sitemap.xml` | Both return HTML (Lighthouse: "robots.txt is not valid") | **High.** Google has no list of pages to crawl. |
| 3 | Missing pages return **200**, not 404 (soft 404s) | `/this-page-does-not-exist` → 200 | **High.** Wastes crawl budget; error pages can be indexed. |
| 4 | **Duplicate copies of the site are indexable** | `sk-emerald-interior.pages.dev` and `sk-emerald-landing-page.vercel.app` both serve the full site, no noindex, no redirect. `www.` has no DNS record. | **High.** Splits ranking signals; Google may pick the wrong copy. |
| 5 | Structured data only on the homepage, only in JS, and incomplete (no geo, hours, sameAs, logo, image, areaServed). No breadcrumbs, services or FAQ markup. | `Home.jsx` `ld` object | **High** for local and AI visibility. |
| 6 | Weak titles and headings. Home H1 is "Make room for living & working" (no product, no place). Titles like "Sofas \| SK Emerald Interior". | Source | **High.** Pages don't say what they sell or where. |
| 7 | **Name and address differ** between Google profile and site | GBP: "Sk_Emerald_Interior", "Unitas Fashion Center, 48, Parge Nagar, Kondhwa". Site: "SK Emerald Interior", "First Floor, Unitas Fashion Centre Mall, Parge Nagar, Kondhwa Khurd" | **High** for local ranking (NAP consistency). |
| 8 | **183 of 215 images are illustrative/inspiration**, only 32 are the shop's own work | `src/data/images.js` | **High** for trust (E-E-A-T), image search and AI citation; possible copyright risk if sources are unknown. |
| 9 | No About page, no Reviews page, no blog, no modular-kitchen page, no area pages | Routes in `App.jsx` | **High.** Missing the pages that win "who is this business" and "near me" searches. |
| 10 | Slow on mobile: Lighthouse **Performance 69**, LCP **5.6 s**, FCP 3.7 s | Local Lighthouse 12, mobile, 13 Nov 2026 | **Medium.** A 2.2-second intro loader (with a sound), render-blocking Google Fonts (~1.3 s), 429 KB JS, 139 KB CSS. |
| 11 | Two accessibility failures (prohibited ARIA attribute; colour contrast). Lighthouse a11y 92. | Lighthouse | **Low-Medium.** |
| 12 | No social preview image (og:image), no Twitter card | `index.html` | **Medium.** Shared WhatsApp links show no picture. |
| 13 | No analytics, no Search Console, no Bing Webmaster Tools | Privacy page says no analytics | **Medium.** Can't measure anything. |
| 14 | Overlapping pages compete for one intent | `/collections/office-spaces` vs `/interiors/office-spaces`; kitchen spread across `/interiors/kitchen` and `/collections/cabinets` | **Medium.** |

What is already good: HTTPS with HSTS, clean URLs, Cloudflare CDN, AI crawlers not blocked, CLS 0.02, real Google reviews quoted on the homepage, honest wording (no invented claims), and a lot of product detail already in `collections.js` to build on.

## 3. What the free-tool research changed (13 Nov 2026)

Method: 339 Google Autocomplete queries (India) → 1,409 real phrases; sitemaps of DesignCafe, HomeLane and Livspace (~40,800 URLs); heading benchmarks of ranking pages; Lighthouse and a raw-HTML audit of the live site. Scripts and raw data are in `scripts/seo/` and `docs/seo/research/`, re-runnable any time. Autocomplete proves people search a phrase, not how many do; volumes get confirmed in Keyword Planner and Search Console.

| Finding | Evidence | Change to the plan |
|---------|----------|--------------------|
| People search for a **manufacturer/factory in Kondhwa** | 24 manufacturer/factory/maker phrases among the homepage's 50, e.g. "furniture manufacturers in kondhwa", "furniture factory in kondhwa pune"; plus "kondhwa furniture market", "furniture shop on katraj kondhwa road" | Homepage leads with "manufacturer with its own factory in Kondhwa + showroom at Unitas" |
| **Sofa repair** is a strong local need | 26 phrases: "sofa repair kondhwa / undri / hadapsar", "sofa repairing cost pune", "recliner sofa repair pune" | New gated service pages (repair, polishing) **if the owner offers them** |
| **Kitchen trolleys** are searched by area | 14 phrases: "kitchen trolley kondhwa / undri / hadapsar", "price list" | New gated `/collections/kitchen-trolleys` (a review already mentions them) |
| **Cost questions dominate** | 219 "cost / price / rate / per sq ft" phrases (kitchen, wardrobe, TV unit, ceiling, sofa, 2BHK) | Owner price ranges become the most valuable input; 5 of 6 launch posts answer cost |
| **Recliners and Kondhwa are competitor gaps** | DesignCafe/HomeLane: 1 recliner post each, 0 Kondhwa pages | Recliner guide in the launch batch; Kondhwa area page as a hub |
| Hadapsar and Undri beat NIBM/Wanowrie | Hadapsar 24, Undri 12, NIBM and Wanowrie a handful each | Area pages: Kondhwa, Hadapsar, Undri first |
| "How to measure" and "monsoon care" show no demand | 0-1 phrases | Measuring guide becomes a contact-page checklist; monsoon post moved to May |
| Kondhwa rivals have brand demand | Creative, Welcome, A1, Anmol, Bholenath, Diamond, Curves, Estilo, Apna Sofa, Champion Sofa Maker | Maps is the main battleground: GBP overhaul + review engine are critical |

## 4. Strategy in one paragraph

Make the site readable by every crawler (pre-render each page as real HTML), consolidate onto one domain, and send Google a clean sitemap. Then make each page answer one intent with the phrases buyers actually type ("sofa maker Kondhwa", "modular kitchen cost in Pune per square foot", "kitchen trolley Kondhwa"). Lead with what makes this shop different: **a real factory in Kondhwa, materials explained before you pay, and honest price guidance**, backed by the shop's own photos and reviews. Build the Google Business Profile into the main lead engine (local rivals are fighting in Maps, not on websites). Publish cost and comparison guides that answer Pune buyers' questions, and get listed consistently on the directories and "best of" lists that AI assistants draw on. Don't chase head terms like "interior designer Pune": HomeLane, Livspace, DesignCafe and NoBroker own them. Win south-east Pune, the product-plus-place long tail, and the AI answers instead.

## 5. The three pillars

| Pillar | What it means here | Main work |
|--------|--------------------|-----------|
| **SEO** (Google/Bing ranking) | Crawlable, fast, well-structured pages that match local buying intent | Pre-rendering, sitemap, one domain, titles/H1s, schema, new pages, internal links, Core Web Vitals |
| **Local SEO** (Maps / local pack) | The Google profile and citations are what rank in "near me" results | GBP clean-up, categories, products, photos, weekly posts, review engine, NAP across 10+ directories |
| **GEO + AEO** (AI assistants, AI Overviews, featured answers) | AI tools cite pages they can read without JS, that answer directly, and that are about a well-defined entity mentioned elsewhere | Static HTML, answer-first blocks, FAQ sections, comparison tables, complete entity schema with `sameAs`, Bing indexing (ChatGPT search uses Bing), llms.txt, brand mentions on lists and directories |

## 6. KPIs

Targets are estimates. Autocomplete shows which phrases are searched, but not how often. The order gets confirmed with free Keyword Planner ranges for `research/keywords-to-validate.csv` (163 phrases), and the targets get re-set after 6 weeks of Search Console data.

| Metric | Baseline (13 Nov 2026) | 3 months | 6 months | 12 months |
|--------|-----------------------|----------|----------|-----------|
| Pages indexed (Search Console) | Unknown; likely very few | 40+ | 55+ | 70+ |
| Organic clicks / month (GSC) | ~0 (not measured) | 100 | 300 | 800 |
| Non-brand keywords in Google top 10 | 0 known | 10 | 30 | 60 |
| Local pack (top 3) for "furniture shop Kondhwa", "sofa shop Kondhwa", "modular kitchen Kondhwa" | Unknown | Top 5 for 1 | Top 3 for 2 | Top 3 for 3+ |
| Google reviews | 8 (5.0) | 20 | 35 | 60 |
| GBP interactions (calls, chats, directions, site clicks) / month | 326 (period not shown) | +30% | +60% | 2× |
| WhatsApp + call clicks from the website / month | Not tracked | Tracked; baseline set | +50% | 2× |
| Mobile Lighthouse Performance / LCP | 69 / 5.6 s | ≥ 90 / < 2.5 s | Hold | Hold |
| AI visibility: brand named in 10 fixed test prompts (ChatGPT, Gemini, Perplexity) | 0 / 10 (to confirm in week 1) | 2 / 10 | 4 / 10 | 6 / 10 |

## 7. Decisions I need from you

My recommended choice is first. If you say "go" without changing anything, I'll use these defaults.

1. **Intro loader + welcome sound.** Recommended: show it once per visit (sessionStorage), cap it at 0.6 s and drop the sound. Alternative: remove it. Keeping it as is costs ~2 s of mobile load time.
2. **Homepage H1.** Recommended: H1 becomes "Made-to-measure furniture and interiors, from our Kondhwa factory" (the data shows people search for a manufacturer in Kondhwa). Keep "Make room for living & working" as the large display line with identical styling. Alternative: keep the current H1 and add the keyword line as a subtitle (weaker).
3. **Vercel copy** (`sk-emerald-landing-page.vercel.app`). Recommended: 301-redirect it to the main domain via `vercel.json`, so PR previews still work. Alternative: delete the Vercel project.
4. **Analytics.** Recommended: Cloudflare Web Analytics (free, no cookies, no banner) plus Search Console and Bing Webmaster Tools (free keyword volumes too). Optional GA4 for WhatsApp/call click events or Microsoft Clarity for heatmaps. Both set cookies, so either needs a privacy-policy update.
5. **Illustrative images.** Recommended: keep them only where labelled "design idea", move them out of "Our work", and stop adding new ones. Replace them with the shop's own photos as they arrive, and remove any image whose source or licence is unknown.
6. **Overlapping pages.** Recommended: 301 `/collections/office-spaces` → `/interiors/office-spaces`; turn `/interiors/kitchen` into the single "Modular kitchens in Pune" page at `/interiors/modular-kitchen` (301 from the old URL).
7. **Google Business Profile primary category** (currently "Interior designer"). Recommended: test "Furniture store" as primary, with "Interior designer", "Furniture manufacturer" and "Kitchen furniture store" as secondary. Decide after you share a screenshot of the top 5 Maps results for "furniture shop Kondhwa". Changing it can cause a short ranking wobble.
8. **Deploy method.** Recommended: keep manual Cloudflare deploys, with a new `npm run deploy` script. I deploy only after each phase passes its checks and you approve. Alternative: connect the Cloudflare Pages project to GitHub for auto-deploy.
9. **New pages the data asks for** (sofa repair, furniture polishing, kitchen trolleys, area pages). Recommended: write them now but publish each only when the owner confirms the service or local work is real. Alternative: skip any the owner doesn't want to sell.

## 8. What only the owner can give (blocking items marked ★)

1. ★ **Opening hours.** "Open now" is a top local ranking factor, and sources disagree today.
2. ★ **One exact address wording** for everywhere, e.g. "Shop No. 226, First Floor, Unitas Fashion Centre, Parge Nagar, Kondhwa, Pune, Maharashtra 411048".
3. ★ **Real photos**: showroom (outside and inside), factory and workers, finished installations (with the area name, e.g. "NIBM Road 3BHK"), and the owner/team. 20-30 photos to start.
4. **Owner/founder name, photo and a short story**: year started (directories say 2019), what they did before, why custom furniture. Used for the About page and as blog author (E-E-A-T).
5. **Which WhatsApp number** to use (currently 90118 31169).
6. **Areas you deliver and fit in**, and roughly how often you work in each. This decides which area pages are honest to publish.
7. ★ **"Starting from" prices or typical ranges** for sofas (3+2, L-shape), kitchens (per sq ft or a typical 10×8 L-shape), wardrobes (per sq ft), TV units, false ceilings (per sq ft) and beds. Upgraded to blocking: 219 of the search phrases found are cost questions, and 5 of the 6 launch posts answer them. Ranges like "₹X-₹Y depending on board and finish" are enough.
8. **Warranty and typical delivery times** per product (even "usually 3-4 weeks").
9. **Links to every existing listing or social profile**: Justdial, IndiaMART, Sulekha, Instagram, Facebook, YouTube.
10. **Confirmation of which of the 32 "work" photos are your own completed jobs**, and where the 183 inspiration images came from.
11. **Which services you actually offer**: sofa and recliner repair or re-upholstery? Furniture polishing (listed on directories)? Kitchen trolleys (a review mentions them)? Aluminium kitchens or wardrobes? EMI or part payment? Each "yes" unlocks a page that people are already searching for.

## 9. Risks and how they are handled

| Risk | Mitigation |
|------|------------|
| Pre-rendering breaks a page or causes hydration errors (the app uses `window`, audio, GSAP) | Guard browser-only code; run the existing Playwright route audit (`scripts/audit.mjs`) at 320/375/768/1360 px plus a hydration-error check before every deploy; Cloudflare Pages keeps every deployment for one-click rollback. |
| Area pages seen as doorway spam | Hard cap of 5 area pages, each only with real local proof (projects, photos, review from that area). No city-name swapping. |
| Content claims that aren't true (prices, warranty, "own factory", reviews) | Nothing is published as fact until the owner confirms it; review stars are never marked up from self-hosted reviews (Google treats this as self-serving); no invented reviews or ratings. |
| Ranking dip during changes | URLs are kept (no trailing-slash change); only 2 deliberate 301s; sitemap submitted the same day; GSC monitored daily for 2 weeks. |
| Image copyright | Unknown-source images are removed from indexable pages (decision 5). |
| Vercel auto-deploys on every push to `main` | Work happens on a branch with a PR; the Vercel preview of the PR doubles as staging. |

## 10. Effort and order

0. **Phase 0, research and baseline: mostly done 13 Nov** (Autocomplete, competitor sitemaps, cluster plan, Lighthouse, raw-HTML audit). Waiting on your free manual checks: Keyword Planner, Google Trends, Maps screenshots.
1. **Phase 1, technical foundation (about week 1, mostly me):** pre-rendering, sitemap/robots/404, domain consolidation, schema, titles, performance, analytics. This is the biggest single gain. Without it nothing else is fully seen.
2. **Phase 2, pages and local (weeks 2-4):** About, Reviews, modular kitchen, collection rewrites, GBP overhaul, citations.
3. **Phase 3, blog and GEO (weeks 3-12):** 6 launch posts, then 2 per month; AI-visibility checks.
4. **Phase 4, authority (months 4-12):** case studies, links, lists, monthly reporting.

Full task list: [IMPLEMENTATION-ROADMAP.md](IMPLEMENTATION-ROADMAP.md).
