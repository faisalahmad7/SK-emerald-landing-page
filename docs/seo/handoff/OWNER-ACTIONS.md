# What's left for you and the owner

Everything Claude could do on the website is done. These steps need your Google/Cloudflare logins or the owner's knowledge. Roughly in order of impact; times are estimates.

## A. Accounts (you, about 30 minutes in total)

1. **Google Search Console (10 min).** Go to search.google.com/search-console → Add property → **Domain** → `sk-emeraldinterior.in`. Google offers to verify through Cloudflare automatically: accept it. Then **Sitemaps** → submit `https://sk-emeraldinterior.in/sitemap.xml`. Then **URL inspection** → paste the homepage URL → **Request indexing**. Repeat for `/collections/sofas`, `/interiors/modular-kitchen`, `/collections/wardrobes`, `/blog`.
2. **Bing Webmaster Tools (5 min).** bing.com/webmasters → sign in → **Import from Google Search Console**. This also feeds ChatGPT search and Copilot. The site already pings Bing via IndexNow on each deploy.
3. **Cloudflare (10 min)**, dash.cloudflare.com, signed in to the account that holds the site:
   - **Web Analytics:** Workers & Pages → `sk-emerald-interior` → Metrics → **Enable Web Analytics** (cookie-free; the privacy page already covers it).
   - **www address:** today `www.sk-emeraldinterior.in` doesn't open at all. Websites & domains → `sk-emeraldinterior.in` → DNS → **Add record**: type `CNAME`, name `www`, target `sk-emerald-interior.pages.dev`, Proxied. Then Rules → **Redirect Rules** → template **"Redirect from WWW to root"** → Deploy.
   - **Crawler Hints:** Caching → Configuration → **Crawler Hints: On** (automatic IndexNow pings to Bing and Yandex).
4. **Google Business Profile:** follow `GBP-CONTENT.md` (name fix, categories, description, services, products, hours, photos, posts, review link).
5. **Bing Places and Apple Business Connect:** see `CITATIONS-OUTREACH.md`.

## B. Facts only the owner can confirm (each one unlocks content that's already written)

| # | Question | Unlocks |
|---|----------|---------|
| 1 | Opening hours | GBP hours, website footer/contact, structured data |
| 2 | Exact address wording (GBP vs website) | Consistent listings everywhere |
| 3 | "Starting from" prices or typical ranges: 3+2 sofa set, L-shaped sofa, 10×8 L-shaped kitchen (or per sq ft), wardrobe per sq ft, TV unit, false ceiling per sq ft | 3 cost guides already drafted in `src/content/drafts/` (sofa price, kitchen cost, 2BHK cost). They are the most-searched questions found |
| 4 | Do you repair or re-upholster sofas and recliners? Do you polish furniture? Do you make kitchen trolleys? | Service pages for searches like "sofa repair kondhwa / undri / hadapsar" (strong local demand) |
| 5 | Which areas you deliver to | Area pages (Kondhwa, Hadapsar, Undri) |
| 6 | Owner's name, photo and short story; year started | About page, blog author (trust signals) |
| 7 | Which WhatsApp number to use | Buttons site-wide |
| 8 | Warranty and typical delivery times | FAQs and product pages |
| 9 | Board grades you use (e.g. BWP for sink bases?), foam options, shutter finishes you offer (acrylic? PU?), false ceiling materials | Turns "ask for this in your quotation" advice into "we use…" (stronger pages) |
| 10 | Links to existing Justdial, IndiaMART, Instagram, Facebook, YouTube pages | `sameAs` in `src/data/business.js` |
| 11 | The exact map pin (latitude/longitude from the Business Profile) | `geo` in `src/data/business.js` |

## C. Photos (owner, highest long-term value)

1. **Replace the 44 hot-linked images** listed in `IMAGES-TO-REPLACE.md` with the shop's own photos. These are other companies' product photos loaded from their websites (copyright and takedown risk).
2. Send 20-30 real photos: showroom, factory, craftsmen, finished jobs with the area name. They go on the Gallery, About, product pages and the Business Profile.
3. Confirm which of the 32 "our work" photos are really the shop's own completed jobs.

## D. Free research checks (you, optional but useful; about 30 minutes)

- **Keyword Planner** (free Google Ads account, no campaign): upload `docs/seo/research/keywords-to-validate.csv`, location Pune → download → save as `docs/seo/research/keyword-planner.csv`.
- **Google Trends:** region Maharashtra, past 5 years, terms "modular kitchen", "sofa set", "wardrobe", "recliner", "false ceiling" → download CSV to `docs/seo/research/`.
- **Maps screenshots:** top 5 results for "furniture shop Kondhwa", "sofa maker Kondhwa", "modular kitchen Kondhwa".

Send these back and Claude re-ranks the content calendar and sets exact review/photo targets.

## E. Every month (Claude, with your exports)

Export Search Console → Performance → Queries (CSV) and Bing's equivalent, take a screenshot of GBP Performance, then ask Claude: "run the monthly SEO review" (FREE-TOOLKIT.md workflow B). Claude will refresh posts ranking in positions 8-20, rewrite weak titles, publish the next 2 guides, and update the KPI table.
