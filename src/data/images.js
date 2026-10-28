// ─────────────────────────────────────────────────────────────────────────────
// IMAGE INVENTORY AND PLACEMENT MAP
//
// Every file lives in /public/images as WebP (made by scripts/make-images.mjs from /source-images).
//   kind 'work'        = supplied photographs of SK Emerald furniture (owner to confirm which are completed jobs)
//   kind 'inspiration' = illustrative interiors / design renders that show a finish the shop can build to.
//                        They are never presented as completed SK Emerald projects (see Gallery.jsx).
//   derived: true      = a purpose crop of another photograph; used in layouts, hidden from the gallery.
//
// TO SWAP IN REAL PHOTOGRAPHY: drop the new file into public/images, add one line to `list` below,
// then point the relevant entry in SLOTS (or a collection's `hero` / `tile` in collections.js) at it.
// No page layout needs to change.
// ─────────────────────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL
const NATURAL = { 0: 1500, 2: 1080, 3: 1080, 4: 1080, 5: 1080, 11: 1500, 12: 1470, 13: 1500, 19: 1125 } // originals wider than 900px also have an -800 variant
const f = (id, alt, kind, tags, extra = {}) => ({
  id, alt, kind, tags,
  src: `${base}images/${id}.webp`,
  srcSet: NATURAL[id] ? `${base}images/${id}-800.webp 800w, ${base}images/${id}.webp ${NATURAL[id]}w` : undefined,
  ...extra,
})
const list = [
  f(0, 'Cream L-shaped corner sofa on a tiled floor', 'work', ['sofas']),
  f(1, 'Cream corner sofa, side view', 'work', ['sofas']),
  f(2, 'Grey velvet sectional sofa with gold-tone legs', 'work', ['sofas']),
  f(3, 'Brown sectional sofa with channelled arms', 'work', ['sofas']),
  f(4, 'Charcoal corner sofa with quilted back', 'work', ['sofas']),
  f(5, 'Teal-blue corner sofa', 'work', ['sofas']),
  f(6, 'Aqua recliner with cup-holder arm, reclined', 'work', ['recliners']),
  f(7, 'Aqua recliner, front view', 'work', ['recliners']),
  f(8, 'Black recliner in plush fabric', 'work', ['recliners']),
  f(9, 'Charcoal recliner set', 'work', ['recliners']),
  f(10, 'Charcoal recliner set with seats reclined', 'work', ['recliners']),
  f(11, 'Dark-green velvet sofa set in a living room with peacock murals', 'work', ['living', 'sofas']),
  f(12, 'Sofa set with ottomans and glass-top centre table', 'work', ['living', 'sofas']),
  f(13, 'Living room with dark-green sofa set and peacock wall murals', 'work', ['living', 'sofas']),
  f(15, 'Navy and cream gloss wardrobe with loft', 'work', ['wardrobes']),
  f(16, 'Sliding-door wardrobe with loft cabinets', 'work', ['wardrobes']),
  f(17, 'TV unit with lit display cabinet and fluted panel', 'work', ['tv']),
  f(18, 'Wardrobe with open shelves, drawers and sliding door', 'work', ['wardrobes']),
  f(19, 'Storage bed with LED underglow beside a wardrobe', 'work', ['beds', 'wardrobes']),
  f(20, 'L-shaped kitchen in navy gloss and cream with glass-front units', 'work', ['kitchens']),
  f(21, 'Fluted-wood TV unit with display shelves', 'inspiration', ['tv']),
  f(22, 'Teal chesterfield L-sofa in a panelled living room', 'inspiration', ['living', 'sofas']),
  f(23, 'Marble-look TV wall with fluted panels and lit niches', 'inspiration', ['tv']),
  f(24, 'Grey sectional with chaise in a living room', 'inspiration', ['living', 'sofas']),
  f(25, 'TV wall with stone panel and lit shelves', 'inspiration', ['tv']),
  f(26, 'Two-tone L-shaped kitchen with overhead cabinets', 'inspiration', ['kitchens']),
  f(27, 'Green velvet corner sofa with brass lighting', 'inspiration', ['living', 'sofas']),
  f(28, 'Fluted TV panel with warm ambient light', 'inspiration', ['tv']),
  f(29, 'Cream living-room set under a ring light', 'inspiration', ['living']),
  f(30, 'Grey chesterfield sofa against a panelled wall', 'inspiration', ['living', 'sofas']),
  f(31, 'Blue sofa with floral rug', 'inspiration', ['living', 'sofas']),
  f(32, 'Compact grey kitchen with breakfast counter', 'inspiration', ['kitchens']),
  f(33, 'Beige kitchen with tall unit and open niche', 'inspiration', ['kitchens']),
  f(34, 'Beige sectional living room', 'inspiration', ['living', 'sofas']),
  f(35, 'Plum and white kitchen', 'inspiration', ['kitchens']),
  f(36, 'White kitchen with glass-front units', 'inspiration', ['kitchens']),
  f(37, 'Mint-green and white kitchen', 'inspiration', ['kitchens']),
  f(38, 'White L-shaped kitchen variation', 'inspiration', ['kitchens']),
  f(39, 'Three-seat recliner sofa in brown', 'work', ['recliners']),
  // purpose crops (derived from the photographs above; see scripts/make-images.mjs)
  // Editorial homepage image: Costa Live, available under the Unsplash License.
  f('recliner-editorial', 'Beige recliner in a calm minimalist home interior', 'inspiration', ['recliners'], { derived: true, src: 'https://images.unsplash.com/photo-1759722666961-8068c5ad61ab?auto=format&fit=crop&fm=jpg&q=80&w=1400', srcSet: undefined }),
  f('collection-sofas', 'Cream L-shaped corner sofa with slim gold-tone legs', 'work', ['sofas'], { derived: true }),
  f('collection-recliners', 'Aqua recliner with cup-holder arm and extended footrest', 'work', ['recliners'], { derived: true }),
  f('collection-beds', 'Storage bed with warm LED lighting along its base', 'work', ['beds'], { derived: true }),
  f('detail-gold-leg', 'Grey velvet sofa arm with a perforated panel and gold-tone leg', 'work', ['sofas'], { derived: true }),
  f('detail-glass-cabinet', 'Glass-front overhead kitchen cabinets with a warm strip light beneath', 'work', ['kitchens'], { derived: true }),
  f('detail-fluted-panel', 'Fluted wall panel with gold-tone rules', 'work', ['tv'], { derived: true }),
]
export const IMAGES = Object.fromEntries(list.map((i) => [i.id, i]))
export const img = (id) => IMAGES[id]
export const GALLERY_IMAGES = list.filter((i) => !i.derived)

// Where each editorial placement on the site gets its picture. Change a value here to re-skin a section.
export const SLOTS = {
  hero: 13,                               // home hero (living room, dark-green sofa set)
  intro: [3, 'detail-gold-leg'],          // home "made for the room" overlap
  materials: [2, 'detail-glass-cabinet', 'detail-fluted-panel'],
  rooms: [34, 33, 18],                    // home "planned room by room" triptych: living, kitchen, storage
  aboutMain: 11, aboutInset: 'detail-gold-leg',
  materialsPage: [
    ['detail-glass-cabinet', 'Glass-front units and gloss shutters'],
    ['detail-gold-leg', 'Gold-tone metal legs on velvet'],
    ['detail-fluted-panel', 'Fluted panel with gold-tone rules'],
    ['collection-beds', 'LED strip lighting on a storage bed'],
  ],
  interiors: [[12, 'Living room'], [19, 'Bedroom'], [33, 'Kitchen'], [18, 'Storage']],
}
