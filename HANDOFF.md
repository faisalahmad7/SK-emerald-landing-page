# SK Emerald Interior: handoff

## Run it
```
npm install
npm run dev        # local
npm run build      # production build to dist/
```
Hosting must rewrite unknown paths to `index.html` (`public/_redirects` for Netlify, `vercel.json` for Vercel).
Rebuild the WebP images any time with `node scripts/make-images.mjs` (needs `sharp`; originals are in `source-images/`).

## Verification status (read this first)
- **`npm install` and `vite build` have NOT been run.** The sandbox used so far has no npm registry access. Run
  `npm install && npm run build` first and fix anything it reports.
- What was run: the app was bundled with esbuild (React from a global install standing in for `react@18`) and served
  locally, then driven with headless Chromium (Playwright). Scripts: `scripts/audit.mjs`, `scripts/interact.mjs`
  (they expect the built site at `http://localhost:4173`; change the import in each to your Playwright install).
- **Route audit, passed:** 17 URLs (all pages, 6 collections, 2 not-found cases) at 320, 375, 768 and 1360px: exactly one
  `<h1>`, no horizontal overflow, no broken images, no placeholder tiles, no console/page errors, and no
  "design reference / reference image / placeholder image / AI reference" text anywhere in the rendered body.
- **Interaction tests, passed:** gallery set tabs (Our furniture / Design inspiration) and category filters, filter reset on tab
  change, lightbox (open, arrow keys, Tab trap, Esc, backdrop click, focus returns to thumbnail, body scroll lock), the six
  homepage tiles (correct link and image each, client-side navigation), tile hover (image scale, "View range" appears,
  frame turns gold), mobile drawer (open, focus moves in, Esc closes and restores focus, link navigates and closes,
  7 links), 44px touch targets on `/materials`, sticky header, contact-form validation (3 errors), and
  `prefers-reduced-motion` (all reveal elements visible, transitions off).
- **Not tested:** real phones and tablets, Lighthouse, screen readers, Safari/Firefox. Google Fonts cannot load offline,
  so all layouts were checked with fallback fonts (Georgia and a system sans). **Check the real Cormorant Garamond and
  Manrope** because headline line breaks may shift.

## What changed in this redesign
- **Images:** all 40 supplied JPEGs converted to WebP (max 1600w, plus an 800w variant for srcset when wider than 900px).
  Purpose crops: `collection-sofas`, `collection-recliners`, `collection-beds`, `detail-gold-leg`, `detail-glass-cabinet`,
  `detail-fluted-panel`. Fixed mapping errors (a TV unit was in the wardrobes gallery; the hero repeated in its own
  "more views" strip).
- **`src/data/images.js`:** `list` is the inventory (`kind: 'work'` or `'inspiration'`, `derived` for crops) and `SLOTS` is the
  placement map. To swap in real photography, add the file to `public/images`, add a line to `list`, point the slot at it.
- **Home:** split hero (photo, gold offset frame, vertical location label, six-collection index); intro overlap; the
  collections mosaic (12x12 asymmetric grid: Sofas wide anchor, Kitchens and Wardrobes tall, TV units compact, Beds wide,
  Recliners square; tablet = 2 columns; phone = single column with staggered widths); green materials band;
  "Planned room by room" triptych (swipeable on phones); process; showroom; enquiry band.
- **Visible "Design reference" tags removed** from `Gallery.jsx` (badge, lightbox caption, footnote) and the footer. The gallery now
  has two sets: "Our furniture" and "Design inspiration"; the latter carries one honest line that these are illustrative
  and are not completed SK Emerald projects. The footer repeats that in its legal line.
- **Look:** ivory surfaces; champagne gold used only for hairlines, frames and small marks; one forest-green band per page;
  square-cut buttons; outlined footer wordmark; CSS transitions plus a small IntersectionObserver for clip-path image
  reveals (`RevealObserver` in `Layout.jsx`; uses a `data-in` attribute because React rewrites `className`).
  Reduced-motion is respected.
- Collections now carry `tile` and `tilePos` (image and focal point for the homepage tile and listing crops).

## What is NOT done (honest list)
1. **No AI-generated photography.** No image-generation tool was available in either session. The brief's cinematic hero and
   six dedicated collection images do not exist. Tiles use the supplied shop photographs and the ~730px inspiration renders,
   so quality varies (Beds and Recliners are the weakest crops). **Best next step:** generate seven images (hero, sofas, kitchens,
   wardrobes, TV units, beds, recliners; see section 4 of `docs/BRIEF.md`), save them as `public/images/hero-interior.webp`,
   `collection-*.webp`, add them to `list` in `images.js`, set `SLOTS.hero` and each collection's `tile`/`hero`. Label them
   as illustrative, never as completed projects.
2. **No GSAP.** It could not be installed or downloaded (registry and CDNs blocked). Motion is CSS, IntersectionObserver and a
   small desktop-only hero parallax (`useHeroParallax` in `Layout.jsx`, off under reduced motion). Add GSAP only if it will
   clearly improve the hero entrance and tile reveals.
3. Part 2's "award-level" ambition is only partly met: the layout is distinctive but the photography is the limit.
4. Fonts are not self-hosted (still Google Fonts). No Open Graph image yet.

## Routes
`/` `/collections` `/collections/{sofas,recliners,beds,wardrobes,modular-kitchens,tv-units}` `/interiors` `/gallery`
`/about` `/materials` `/contact` `/faq` `/privacy` + branded not-found.

## Structure
`src/router.jsx` (small History-API router, no dependency) · `src/data/` (business facts, image inventory and slots,
collections, copy) · `src/components/` (Layout, ui) · `src/pages/` · `src/styles.css` (tokens at the top) ·
`scripts/` (image pipeline, test scripts) · `source-images/` (original JPEGs) · `docs/BRIEF.md` (the owner's full brief).
Edit phone/address in `src/data/business.js` only.

## Needs owner confirmation (not published as fact)
- Which number is the WhatsApp number (currently 90118 31169).
- Opening hours (sources disagree; none shown). Establishment year (2019 on directories; not shown).
- Factory address (not shown; showroom is the only public address).
- "Factory-direct / own factory" claims: the About page says "manufacturer and retailer" only.
- Google/Justdial 5.0 rating and the three named review quotes: **removed**. Add back only once verified.
- The Rs 1,10,000 8-piece combo: **removed**. Add back with confirmed inclusions and validity.
- Materials wording is softened to "varies by product, confirmed in quotation".
- Warranty, delivery time and coverage area: FAQ tells visitors to ask; nothing is promised.
- Which supplied photographs (0-20, 39) are completed SK Emerald jobs, and which of 21-38 are renders or other makers' work.
  They are currently treated as "our furniture" and "design inspiration" respectively.
- Privacy policy has not been legally reviewed.
