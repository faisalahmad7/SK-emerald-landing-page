# Site structure, keyword map and schema

Companion to [SEO-STRATEGY.md](SEO-STRATEGY.md). **Revised 13 Nov 2026 with Google Autocomplete data.** The single source of truth for "which query belongs to which page" is [research/cluster-plan.md](research/cluster-plan.md), generated from `scripts/seo/clusters.json`. Edit that file, not this table, when pages change.

URLs keep their current form (no trailing slash). Pre-rendered files are written as `collections/sofas.html`, so Cloudflare Pages serves `/collections/sofas` with no redirect.

## 1. URL map

Legend: **=** keep and optimise · **+** new · **→** 301 redirect · **G** gated on owner input (published only when real facts or photos exist)

```
/                                          = Home: "furniture manufacturer with a factory in Kondhwa" (pillar)
/collections                               = Furniture hub
  /collections/sofas                       = hub: Sofas & recliners
  /collections/recliners                   =
  /collections/sofa-cum-beds               =
  /collections/beds                        =
  /collections/wardrobes                   = hub: Bedroom storage
  /collections/tv-units                    = hub: Living room & ceilings
  /collections/false-ceilings              =
  /collections/kitchen-trolleys            + G  (local demand: Kondhwa, Undri, Hadapsar; a review already mentions trolleys)
  /collections/dining-tables               =
  /collections/crockery-units              =
  /collections/study-and-office-tables     =
  /collections/cabinets                    =  (links to the modular kitchen hub)
  /collections/counter-tops, dressing-tables, bedside-tables, centre-side-and-coffee-tables,
   chairs, shelves-and-drawers, shoe-racks, mirrors-and-wall-decor, office-loungers, office-chairs  =
  /collections/office-spaces               → /interiors/office-spaces
/services                                  + G  Hub, only if at least one service is confirmed
  /services/sofa-repair                    + G  hub: Sofa repair & refurbishing (strong local demand)
  /services/furniture-polishing            + G  (already listed by the owner on directories)
/interiors                                 = Home interiors in Kondhwa and south Pune
  /interiors/living-room                   =
  /interiors/bedroom                       =
  /interiors/modular-kitchen               + hub: Modular kitchens & trolleys (replaces /interiors/kitchen)
  /interiors/kitchen                       → /interiors/modular-kitchen
  /interiors/office-spaces                 = hub: Dining & office
/areas                                     + G  Areas we serve (lists only areas with proof)
  /areas/kondhwa                           + G  hub: Whole home & local (29 Autocomplete phrases)
  /areas/hadapsar                          + G  (24 phrases)
  /areas/undri                             + G  (12 phrases; covers Pisoli)
  (NIBM Road, Wanowrie: too little evidence for now. Hard cap: 5 area pages.)
/gallery                                   = "Our work": owner's real photos only
/design-ideas                              + Illustrative inspiration, clearly labelled
/about                                     + Owner story, factory, process, team (E-E-A-T)
/reviews                                   + Real Google reviews + "Write a review" link
/materials                                 = hub: Materials (plywood grades, finishes, foam, care)
/faq                                       = 20+ answer-first questions taken from Autocomplete
/contact                                   = Showroom + factory, map, hours, printable measuring checklist
/blog                                      + Blog hub (categories: Costs · Buying guides · Materials · Projects)
  /blog/<slug>                             + 18 planned posts in clusters + project stories (slugs in cluster-plan.md)
/privacy                                   =
/robots.txt  /sitemap.xml  /llms.txt       + Real files
/404 (404.html, real 404 status)           +
```

Indexable pages: 34 today, about 48 after Phases 1-2, and about 70 by month 6 with the blog.

## 2. Titles and H1s for the main pages

Queries marked ✓ appeared in Google Autocomplete (India) on 13 Nov 2026: real phrases, volume still to confirm. Titles ≤ 65 characters.

| URL | Primary query | Secondary (✓ = Autocomplete) | Title | H1 |
|-----|--------------|------------------------------|-------|----|
| `/` | furniture manufacturers in kondhwa ✓ | furniture shop in kondhwa ✓, furniture factory in kondhwa pune ✓, custom furniture pune ✓, kondhwa furniture market ✓ | Furniture Manufacturer in Kondhwa, Pune \| SK Emerald Interior | Made-to-measure furniture and interiors, from our Kondhwa factory |
| `/collections/sofas` | custom sofa pune ✓ | sofa maker kondhwa ✓, sofa manufacturers in kondhwa ✓, kondhwa sofa shop ✓, l shape sofa price in pune ✓ | Custom Sofas & Sofa Sets, Made in Kondhwa, Pune \| SK Emerald | Custom sofas and sofa sets, made in Pune |
| `/collections/recliners` | recliner sofa pune ✓ | recliner manufacturers in pune ✓, price of recliner chairs ✓ | Recliner Sofas & Chairs in Pune \| SK Emerald Interior | Recliner chairs and recliner sofas in Pune |
| `/collections/beds` | hydraulic bed price in pune ✓ | storage bed in pune ✓ | Hydraulic & Storage Beds in Pune, Made to Size \| SK Emerald | Storage beds, made to your mattress size |
| `/collections/wardrobes` | customized wardrobe pune ✓ | sliding wardrobe price in pune ✓, modular wardrobe pune ✓ | Customised Wardrobes in Pune: Sliding & Hinged \| SK Emerald | Wardrobes built to your wall |
| `/interiors/modular-kitchen` | modular kitchen kondhwa ✓ | modular kitchen pune price list ✓, modular kitchen hadapsar pune ✓, modular kitchen factory pune ✓ | Modular Kitchens in Kondhwa, Pune: Prices & Layouts \| SK Emerald | Modular kitchens, designed and made in Pune |
| `/collections/kitchen-trolleys` G | kitchen trolley kondhwa ✓ | kitchen trolley pune price list ✓, kitchen trolley near undri / hadapsar ✓ | Kitchen Trolleys in Kondhwa, Pune, Made to Fit \| SK Emerald | Kitchen trolleys made to fit your cabinets |
| `/services/sofa-repair` G | sofa repair kondhwa ✓ | sofa repair near undri / hadapsar ✓, recliner sofa repair pune ✓, sofa upholstery pune ✓ | Sofa Repair & Re-upholstery in Kondhwa, Pune \| SK Emerald | Sofa repair and re-upholstery |
| `/services/furniture-polishing` G | furniture polish pune ✓ | wood polish pune ✓ | Furniture Polishing & Refurbishing, Pune \| SK Emerald Interior | Furniture polishing and refurbishing |
| `/collections/tv-units` | tv unit design pune ✓ | tv unit price pune ✓, tv unit manufacturers in pune ✓ | TV Units & TV Wall Panels in Pune \| SK Emerald Interior | TV units and feature walls |
| `/collections/false-ceilings` | false ceiling pune rate ✓ | gypsum false ceiling pune ✓, false ceiling contractor pune ✓, false ceiling in hadapsar ✓ | False Ceiling Design & Rates in Pune \| SK Emerald Interior | False ceilings for homes in Pune |
| `/collections/sofa-cum-beds` | sofa cum bed pune ✓ | price of sofa cum bed ✓ | Sofa cum Beds in Pune, Made to Measure \| SK Emerald Interior | Sofa cum beds |
| `/collections/dining-tables` | dining table pune ✓ | dining table in pune with price ✓, wooden / extendable dining table pune ✓ | Dining Tables in Pune, Made to Size \| SK Emerald Interior | Dining tables made to size |
| `/interiors` | home interior kondhwa ✓ | interior designer kondhwa ✓, interior designer hadapsar / undri ✓ | Home Interiors in Kondhwa & South Pune \| SK Emerald Interior | Home interiors, planned room by room |
| `/interiors/office-spaces` | office furniture pune ✓ | office furniture manufacturer pune ✓, modular office furniture pune ✓ | Office Furniture & Interiors in Pune \| SK Emerald Interior | Office furniture and interiors |
| `/areas/kondhwa` G | furniture shop in kondhwa ✓ | furniture shop on katraj kondhwa road ✓, furniture stores kondhwa ✓, carpenter kondhwa ✓ | Furniture Shop & Factory in Kondhwa, Pune \| SK Emerald | Furniture and interiors in Kondhwa |
| `/areas/hadapsar` G | furniture shop hadapsar ✓ | sofa maker hadapsar ✓, modular kitchen hadapsar pune ✓ | Furniture & Interiors for Hadapsar Homes \| SK Emerald Interior | Furniture for Hadapsar homes |
| `/areas/undri` G | furniture shop undri ✓ | furniture shop in undri pisoli ✓, furniture manufacturers in undri ✓ | Furniture & Interiors for Undri and Pisoli \| SK Emerald | Furniture for Undri and Pisoli homes |
| `/about` | SK Emerald Interior | — | About SK Emerald Interior: Furniture Makers in Kondhwa | About SK Emerald Interior |
| `/reviews` | SK Emerald Interior reviews | — | SK Emerald Interior Reviews (Google) \| Kondhwa, Pune | What our customers say |
| `/materials` | plywood grades for furniture | how to choose plywood for furniture ✓ | Materials We Use: Plywood, Laminates, Fabrics \| SK Emerald | Materials and craftsmanship |
| `/faq` | custom furniture questions | — | Custom Furniture FAQs: Price, Time, Warranty \| SK Emerald | Questions, answered |
| `/contact` | SK Emerald Interior contact | kondhwa furniture showroom ✓ | Visit Our Showroom & Factory in Kondhwa, Pune \| SK Emerald | Contact and showroom |

Other piece pages follow "<Piece> in Pune, Made to Measure \| SK Emerald Interior". Blog titles are in `cluster-plan.md`.

**Meta descriptions:** 140-155 characters, unique, containing the product, "Pune" or "Kondhwa", one concrete detail and a call to action ("WhatsApp us a photo of your room").

## 3. Page template for money pages (collections, kitchen, services, interiors)

1. H1 + one-sentence answer ("We make sofas to your room's measurements at our Kondhwa factory, in fabric or velvet, from 2-seaters to L-shaped sectionals.")
2. Hero photo (own photo where possible) + WhatsApp / Call buttons
3. **Quick facts box**: sizes, materials, typical lead time, price range or price factors, areas served (definition list, easy to quote)
4. Options and variants (existing cards)
5. "What goes inside" materials section (frame, foam density, plywood grade), the differentiator reviews mention
6. Process (5 steps)
7. 4-6 FAQs taken from that page's Autocomplete evidence, with the question as H3 and a 40-60 word answer first
8. Real reviews mentioning this product
9. Related pieces + the cluster's blog posts
10. Enquiry band

## 4. Structured data (JSON-LD, rendered into the static HTML)

One `@graph` per page. Entity IDs stay stable so every page describes the same business.

| Page type | Types | Notes |
|-----------|-------|-------|
| Every page | `FurnitureStore` (`@id: https://sk-emeraldinterior.in/#business`), `Organization` (`#org`), `WebSite` (`#website`) | Name, alternateName "Emerald Furniture", address, **geo**, telephone ×2, email, logo, image, **openingHoursSpecification** (after confirmation), `areaServed` (Pune + named areas), `hasMap` (GBP URL), **`sameAs`** (GBP, Justdial, IndiaMART, Instagram, Facebook, YouTube), `priceRange` "₹₹". The factory is a `department` (`LocalBusiness`) only if the owner wants it public. |
| Inner pages | `BreadcrumbList` | Mirrors the visible breadcrumbs |
| Collection pages | `CollectionPage` + `Service` (provider → `#business`, `areaServed`, `serviceType`) + `OfferCatalog` of the variants | No `Product`/`Offer` prices unless real prices are published |
| Service pages (repair, polishing) | `Service` + `FAQPage` | Only once the service is confirmed |
| Pages with FAQs | `FAQPage` | No rich result for commercial sites (Google, Aug 2023), but AI tools parse it. Visible FAQs only. |
| Room / interiors pages | `Service` + `ImageGallery` | |
| Area pages | `Service` with `areaServed: Place` | No fake addresses: the business address stays the showroom |
| About | `AboutPage` + `Person` (owner) | Once confirmed |
| Reviews | `WebPage` with review text linked to Google | **No `AggregateRating`/`Review` markup** for reviews on our own site (self-serving; Google won't show stars) |
| Contact | `ContactPage` | |
| Blog post | `BlogPosting` + `BreadcrumbList` (+ `FAQPage` if it has visible FAQs) | headline, image, datePublished, dateModified, author `Person`, publisher → `#org` |
| Gallery | `ImageGallery`, `ImageObject` with `creator`/`copyrightHolder` for own photos | |

Validate with the Schema.org validator and Google's Rich Results Test before deploy. Target: 0 errors.

## 5. Internal linking

- **Hub and spoke** per `cluster-plan.json`: pillar ↔ 8 hubs; hub ↔ every page in its cluster (mandatory); sibling posts 2-3 links each (recommended). 76 mandatory and 94 recommended links in total.
- Anchors use the target's primary query or a close variant ("custom L-shaped sofas"), never "click here".
- Collection pages keep "Related ranges"; add "Used in these rooms".
- Area pages link to the 3-4 products most ordered there plus real projects.
- Footer: full NAP (identical everywhere), hours, top 6 collections, Interiors, Areas, Blog, About, Reviews.
- Breadcrumbs on every inner page (already present; add markup).
- No orphans: `onpage-audit.mjs` + the sitemap check fail the build if a sitemap URL has fewer than 3 internal links in.

## 6. Crawl and index rules

- `robots.txt`: allow all; explicitly allow Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot; `Sitemap:` line. Training-only crawlers (GPTBot, Google-Extended, CCBot) allowed by default. Say if you want them blocked.
- `sitemap.xml`: every indexable URL with `lastmod`; generated at build; excludes 404 and redirected URLs.
- Canonical on every page → `https://sk-emeraldinterior.in<path>`.
- `*.pages.dev`: Bulk Redirect to the apex (fallback `X-Robots-Tag: noindex`); Vercel host: 301 via `vercel.json`.
- `www.sk-emeraldinterior.in`: DNS record + 301 to the apex.
- Real 404 status for unknown URLs (remove the catch-all `/* /index.html 200` once every route is pre-rendered).
- Cloudflare **Crawler Hints** on (automatic IndexNow pings) + IndexNow key file.
