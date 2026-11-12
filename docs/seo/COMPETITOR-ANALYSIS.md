# Competitor analysis

Companion to [SEO-STRATEGY.md](SEO-STRATEGY.md). **Revised 13 Nov 2026** with free-tool data: Google Autocomplete (India), public XML sitemaps of DesignCafe, HomeLane and Livspace, heading extraction of ranking pages, and web search. **Limits:** no paid keyword or backlink data, and Google Maps can't be read automatically. Phase 0 task 0.4 (your screenshots of the top 5 Maps results) fills the local-pack gap.

## 1. National brands: what their sitemaps show

`node scripts/seo/sitemap-topics.mjs` (raw data in `research/sitemaps/`). URL counts whose path contains the word:

| Topic | DesignCafe (3,533 URLs) | HomeLane (3,647) | Livspace (33,605) | What it means for us |
|-------|------------------------|------------------|-------------------|----------------------|
| Kitchen | 578 | 599 | 4,714 | Crowded. Compete only on **local + cost + first-hand** |
| Wardrobe | 168 | 346 | 2,635 | Crowded on design ideas |
| Sofa | 36 | 42 | 1,055 (mostly design-image pages) | Design ideas crowded; **"what's inside a sofa" (frame/foam) not covered** |
| **Recliner** | **1** | **1** | 26 (image pages) | **Clear gap**: launch post #2 |
| Plywood | 11 | 10 | 13 | Covered (MDF vs plywood, waterproof plywood); our angle: quotation checklist |
| Laminate | 50 | 24 | 291 | Covered; our angle: what suits Pune homes and what each costs |
| Pune pages | 28 (localities + cost guides) | 21 (localities) | 134 | They target west/north Pune (Baner, Wakad, Kharadi, Hinjewadi) |
| **Kondhwa** | **0** | **0** | **1** | **Clear gap**: south-east Pune is under-served |
| Pune cost guides | "interior design cost in Pune", "1 BHK cost in Pune", "false ceiling cost Pune" | "interior design cost in Pune for 2BHK" | — | Cost content wins; we add real local quotes |

Plus **NoBroker**, which has a Kondhwa locality page and the leading "modular kitchen cost in Pune" guide.

**Heading benchmark, "modular kitchen cost Pune"** (`research/outlines/modular-kitchen-cost-pune.md`): NoBroker ~3,950 words / 57 headings (components → cost by layout → materials → cabinets → packages → hidden costs → factors → budget tips); BricknBolt ~2,095 / 28; DesignCafe ~2,801 / 16. Median ~2,800 words. Our post: ~2,000-2,500 words covering the same sections, plus what aggregators can't show: real quotation breakdowns, factory photos and a direct answer up top.

## 2. Local rivals: the real competition in Maps

People type these Kondhwa and Pune names into Google (from Autocomplete, so they have brand demand and almost certainly Google profiles):

| Type | Names seen |
|------|------------|
| Kondhwa furniture shops | Creative Furniture, Welcome Furniture, A1 Furniture, Anmol Furniture, Bholenath Furniture, Diamond Furniture, Curves Furniture (Kondhwa Budruk), Estilo, Nilkamal (near Kondhwa) |
| Kondhwa sofa makers | Apna Sofa, Champion Sofa Maker |
| Kondhwa manufacturers (web search) | New Lucky Furniture / NLF (Kondhwa Budruk, modular home and office), Hasan Studios (Kondhwa Industrial Estate) |
| Pune modular kitchen firms | Bhumi/Bhoomi, Parmeshwar, Bhagyalaxmi, Bhawani, Kesar/Keshar, Maya, Nectar, Nilkanth, Satyam, Sunrise, Vikas (Kharadi), Mahalaxmi (Handewadi), Highland, Bella, Aayat |
| Directory-only makers (web search) | Classic Furniture Factory, Silver Maple Interio (IndiaMART, publishes prices), Kitchens and More, Vegaur Enterprises, RGS Enterprises (Kondhwa) |

Most local rivals rely on Google profiles and directory listings (IndiaMART, Houzz, Justdial). **None showed a content-rich website** in the results checked. The fight is in **Maps**: primary category, reviews, photos, hours, proximity. That's why the GBP overhaul and the review engine sit in Phase 2.

Next step (Phase 0.4): for the top 5 Maps results on "furniture shop Kondhwa", "sofa maker Kondhwa" and "modular kitchen Kondhwa", record primary category, review count and rating, photo count, hours and website. I'll turn that into exact targets (e.g. "50 reviews to match #1").

## 3. Demand signals competitors are missing

| Signal (Autocomplete, India) | Who serves it today | Our move |
|------------------------------|---------------------|----------|
| "sofa repair kondhwa / undri / hadapsar", "sofa repairing cost pune", "recliner sofa repair pune" | Urban Company-type marketplaces; no shop site found | `/services/sofa-repair` + cost post, **if the owner offers repairs** |
| "furniture manufacturers in kondhwa", "furniture factory in kondhwa pune", "kondhwa furniture market", "furniture shop on katraj kondhwa road" | Directory listings | Lead the homepage with "manufacturer with a factory in Kondhwa" |
| "kitchen trolley kondhwa / undri / hadapsar", "kitchen trolley pune price list" | Small kitchen firms' profiles | `/collections/kitchen-trolleys` + sizes/prices post |
| "modular kitchen vs carpenter kitchen", "is modular kitchen good or bad" | Generic national posts | Comparison post written by an actual maker |
| "basic furniture cost for 2bhk", "furniture for 2bhk flat with cost" | Generic posts | Pune-specific 2BHK cost post |
| Society-level demand: Urban Company runs carpenter pages for Kondhwa societies (Clover Hills, Kausar Baugh, Mayfair Eleganza, Shivneri Nagar) | Urban Company | Proof of hyperlocal demand. **Don't** copy it with doorway pages; mention real societies only in real project stories |

## 4. Lists and mentions to target (AI visibility)

"Best of" lists are the strongest signal for AI tools recommending local businesses. Found so far (outreach in Phase 4):
- creaticityonline.com: "Best furniture stores in Pune: where to buy quality furniture in 2026"
- creaticityonlinepune.blogspot.com: "Top furniture markets & stores in Pune: where locals actually shop" (names Kondhwa as a furniture area)
- homegrown.co.in: "A Homegrown guide to Pune's furniture markets"
- urbanly.in (Pune): features Kondhwa makers (e.g. Hasan Studios), a plausible story outlet
- Directories to claim or clean up: Justdial, IndiaMART, Sulekha, Houzz India, Bing Places, Apple Business Connect

## 5. Still to check (free, manual)

1. Phase 0.4 Maps screenshots (above).
2. Ahrefs free Backlink Checker on the top 3 local rivals' websites (if they have one) → which directories and blogs link to them.
3. Keyword Planner ranges for `research/keywords-to-validate.csv` (163 phrases) to confirm the priority order.
4. r/pune threads on furniture, carpenters and kitchens (Reddit blocks scripts, so it's a manual search).

## Sources

- [HomeLane – Interior designers in Kharadi, Pune](https://www.homelane.com/cities/interior-designers-pune/kharadi)
- [NoBroker – Home interior designers in Kondhwa](https://www.nobroker.in/interiors/home-interior-designers-in-pune/kondhwa)
- [NoBroker – Modular kitchen cost in Pune](https://www.nobroker.in/interiors/design-guides/modular-kitchen-cost-in-pune/)
- [DesignCafe – Interior designers Pune](https://www.designcafe.com/interior-designers-pune/)
- [DesignCafe – Choosing a kitchen interior designer in Pune](https://www.designcafe.com/blog/modular-kitchen-interiors/choose-best-kitchen-interior-designer-in-pune/)
- [BricknBolt – Modular kitchen cost](https://www.bricknbolt.com/blogs-and-articles/home-design-guide/modular-kitchen-cost)
- [Interior Company – Pune](https://www.interiorcompany.com/in/interiors/pune)
- [Pepperfry – Furniture studio Pune](https://www.pepperfry.com/furniture-studio-pune.html)
- [IndiaMART – Classic Furniture Factory](https://m.indiamart.com/classicfurniturefactory)
- [IndiaMART – Silver Maple Interio](https://m.indiamart.com/silvermapleinterio/sofa-set-dining-table.html)
- [Kitchens and More – Services](https://kitchensandmore.pages.dev/services.html)
- [Urban Company – Carpenters in Kondhwa](https://www.urbancompany.com/pune-carpenters-kondhwa)
- [Creaticity – Best furniture stores in Pune 2026](https://creaticityonline.com/blog/post/best-furniture-stores-in-pune-where-to-buy-quality-furniture-in-2026)
- [Top furniture markets & stores in Pune (blog)](https://creaticityonlinepune.blogspot.com/2026/03/top-furniture-markets-stores-in-pune.html)
- [Homegrown – Pune's furniture markets](https://homegrown.co.in/amp/story/homegrown-explore/hidden-gems-vintage-charm-a-homegrown-guide-to-punes-furniture-markets)
- [Urbanly Pune](https://www.urbanly.in/pune/wp-json/wp/v2/posts/17081)
