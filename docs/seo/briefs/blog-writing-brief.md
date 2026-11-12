# Blog writing brief (all posts)

For anyone (person or agent) writing posts for sk-emeraldinterior.in. Read fully before writing.

## Reader and voice
- A family in south-east Pune (Kondhwa, Undri, Hadapsar, NIBM, Wanowrie) about to buy furniture or a kitchen for a flat. Reading on a phone. Practical, price-conscious, wary of being cheated.
- Plain, warm, direct. Indian/British spelling as on the site (colour, customise, centre). Short sentences. No hype ("best quality", "premium", "elevate", "seamless", "transform your space"). No exclamation marks.
- Answer first: the opening paragraph answers the post's main question in 1-2 sentences. Every H2 section also opens with its answer.

## File format
One file per post: `src/content/blog/<slug>.md`. The front matter is **JSON** between `---` lines:

```
---
{
  "title": "What's inside a good sofa: frame, foam and fabric",
  "seoTitle": "What's Inside a Good Sofa: Frame, Foam & Fabric | SK Emerald",
  "description": "140-155 characters. Says what the reader learns, names Pune once, ends with a reason to read.",
  "date": "2026-11-13",
  "updated": "2026-11-13",
  "category": "Buying guides",
  "image": "/images/2.webp",
  "imageAlt": "Grey velvet sectional sofa with gold-tone legs",
  "primaryQuery": "how to choose sofa material",
  "related": ["/collections/sofas", "/blog/how-to-choose-a-recliner"],
  "draft": false
}
---
Opening paragraph…

## A question-style heading
…

## Frequently asked questions
### Question one?
Answer, 40-70 words.
```

- `seoTitle` ≤ 65 characters. `category` is one of: "Buying guides", "Materials", "Costs".
- `image`: pick from `src/data/images.js` (path `/images/<id>.webp`). Prefer entries with kind `'work'` (the shop's own furniture). Use `imageAlt` from that entry's alt text or a close, accurate variant.
- Do **not** write an H1 in the body: the page template renders `title` as the H1.
- End the body with the `## Frequently asked questions` section (4-6 questions as `###`, taken from the real search phrases listed for the post in `docs/seo/research/cluster-plan.md`). Put a short "next step" paragraph with an internal link **before** the FAQ section.

## Length and structure
- 1,300-1,800 words (cost drafts up to 2,000).
- At least one Markdown table (comparison, options or checklist).
- Where it fits, a "What to ask for in your quotation" checklist. The shop's real differentiator is that it explains materials (frame, foam, board, laminate, hardware) and writes the specification into the quotation.
- 2-4 internal links, root-relative, with descriptive anchor text. Only link to these URLs: `/collections/sofas`, `/collections/recliners`, `/collections/sofa-cum-beds`, `/collections/beds`, `/collections/wardrobes`, `/collections/tv-units`, `/collections/false-ceilings`, `/collections/cabinets`, `/collections/counter-tops`, `/collections/crockery-units`, `/interiors`, `/interiors/modular-kitchen`, `/interiors/living-room`, `/interiors/bedroom`, `/materials`, `/faq`, `/contact`, `/about`, `/reviews`, and the other posts: `/blog/whats-inside-a-good-sofa`, `/blog/how-to-choose-a-recliner`, `/blog/bwp-vs-bwr-vs-mr-plywood`, `/blog/laminate-vs-acrylic-vs-pu`, `/blog/modular-vs-carpenter-kitchen`, `/blog/gypsum-vs-pop-false-ceiling`.
- Mention "SK Emerald Interior" 2-3 times at most, naturally (e.g. "At SK Emerald Interior's Kondhwa factory, we…"). Never make it a sales page.

## Facts: the strict rule
**Facts about SK Emerald Interior may come only from these files:** `src/data/business.js` (name, phones, showroom and factory addresses), `src/data/content.js` (process, materials, care, FAQs), `src/data/collections.js` (product features and options), and the 8 Google reviews in `REVIEWS` in `src/pages/Home.jsx` (you may quote them exactly, with the reviewer's first name).
- Never invent: prices, discounts, warranties, delivery times, years in business, number of customers/projects, brands of board or hardware used, foam densities used, certifications, awards, owner or staff names.
- Where the shop's practice is unknown, write it as advice ("ask for the plywood grade to be named in your quotation") or as "we confirm this in your written quotation".
- **No rupee amounts in published posts.** Explain what drives cost instead. Cost posts marked `"draft": true` may use placeholders like `[PRICE: 3+2 fabric sofa set, typical range]` where the owner's numbers will go.
- General knowledge (how plywood grades differ, what HDHMR is, gypsum vs POP) must be accurate. If you're not sure, verify with a web search, and don't quote standard numbers (IS codes etc.) unless you verified them. No made-up statistics.

## Before you finish
1. Run `node scripts/seo/readability.mjs src/content/blog/<slug>.md` from the project root. It must print **PASS** (reading ease ≥ 60, grade ≤ 8, ≤ 18 words per sentence). Rewrite until it does.
2. Check every internal link is in the allowed list above, and the JSON front matter parses.
3. Touch no other files.
