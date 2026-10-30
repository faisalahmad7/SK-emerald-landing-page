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
  // Additional sourced styling and configuration images for the expanded catalogue.
  f('recliner-editorial', 'Charcoal fabric recliner set, original showroom photograph', 'work', ['recliners'], { derived: true, src: `${base}images/9.webp`, srcSet: undefined }),
  f('collection-sofas', 'Cream L-shaped corner sofa with slim gold-tone legs', 'work', ['sofas'], { derived: true }),
  f('collection-recliners', 'Charcoal recliner set with seats extended, original showroom photograph', 'work', ['recliners'], { derived: true, src: `${base}images/10.webp`, srcSet: undefined }),
  f('collection-beds', 'Storage bed with warm LED lighting along its base, original showroom photograph', 'work', ['beds'], { derived: true, src: `${base}images/19.webp`, srcSet: undefined }),
  f('detail-gold-leg', 'Grey velvet sofa arm with a perforated panel and gold-tone leg', 'work', ['sofas'], { derived: true }),
  f('detail-glass-cabinet', 'Glass-front overhead kitchen cabinets with a warm strip light beneath', 'work', ['kitchens'], { derived: true }),
  f('detail-fluted-panel', 'Fluted wall panel with gold-tone rules', 'work', ['tv'], { derived: true }),
  // Curated, high-clarity configuration photography used to show layout variety.
  f('sofa-321', 'Three plus two plus one beige sofa set, inspiration image', 'inspiration', ['sofas'], { derived: true, src: 'https://mk-kabbanifurniture.com/cdn/shop/files/Untitled-1_2cd143ce-1c6c-4f2f-9799-33aeb1717164_1200x1200.jpg?v=1783011645', srcSet: undefined }),
  f('sofa-pair', 'Original SK Emerald sofa arrangement with centre table', 'work', ['sofas'], { derived: true, src: `${base}images/12.webp`, srcSet: undefined }),
  f('sofa-sectional', 'Original grey velvet sectional sofa', 'work', ['sofas'], { derived: true, src: `${base}images/2.webp`, srcSet: undefined }),
  f('bed-storage', 'Hydraulic storage bed shown open, inspiration image', 'inspiration', ['beds'], { derived: true, src: 'https://www.cdiscount.com/pdt2/1/8/7/1/700x700/aachj13187/rw/lit-coffre-hydraulique-140x190.jpg', srcSet: undefined }),
  f('bedroom-pexels', 'Grey single upholstered bed in a modern bedroom, inspiration image', 'inspiration', ['beds'], { derived: true, src: 'https://media.homecentre.com/i/homecentre/168122945-168122945-HC21072025_01-2100.jpg?%24prodimg-d-sqr-pdp%24=&%24quality-standard%24=&fmt=auto&sm=c', srcSet: undefined }),
  f('bedroom-soft-neutral', 'Minimal upholstered platform bed with rounded headboard, inspiration image', 'inspiration', ['beds'], { derived: true, src: 'https://studioobliq.co/cdn/shop/files/Bliss_Bed_02_v1.jpg?v=1762870125&width=1200', srcSet: undefined }),
  f('bed-marbella', 'Beige tufted upholstered bed with matching nightstands, inspiration image', 'inspiration', ['beds'], { derived: true, src: 'https://dunepine.com/cdn/shop/files/Marbella-Luxe-Bed_1080x1080.jpg?v=1765194803', srcSet: undefined }),
  f('sofa-premium', 'Premium cream boucle sofa set in a bright living room, inspiration image', 'inspiration', ['sofas', 'living'], { derived: true, src: 'https://www.idealhomeqatar.com/cdn/shop/files/lucas.png?v=1775896820', srcSet: undefined }),
  f('kitchen-u', 'Modern U-shaped modular kitchen with warm wood cabinetry', 'inspiration', ['kitchens'], { derived: true, src: 'https://coohom-biz-sg-s3.coohom.com/ins/static/article/hyderabad-mod-kitchen-1773591881640300900.jpg', srcSet: undefined }),
  f('wardrobe-sliding', 'Modern white sliding wardrobe with open storage', 'inspiration', ['wardrobes'], { derived: true, src: 'https://img.interiorcompany.com/interior/webproduct/105638695221872143881.png?aio=w-1080%3B', srcSet: undefined }),
  f('office-reception', 'Modern office reception with visitor seating and work desk', 'inspiration', ['office'], { derived: true, src: 'https://static.levocdn.com/WC39KELV/ReceptionDeskDesign7-6HghxPOJHYr7.jpg', srcSet: undefined }),
  f('tv-feature-wall', 'Original stone-look TV wall with lit shelves', 'inspiration', ['tv'], { derived: true, src: `${base}images/25.webp`, srcSet: undefined }),
  f('recliner-chair', 'Aqua single-seat recliner, original showroom photograph', 'work', ['recliners'], { derived: true, src: `${base}images/6.webp`, srcSet: undefined }),
  f('office-workstation', 'Open-plan office desk workstations and storage', 'inspiration', ['office'], { derived: true, src: 'https://cdn.prod.website-files.com/642f23e5f54b794300ac12a6/699f72a10577fc102d30b860_vHLLaNn0tyUikJI-XmqCttvsmNLG6R4T8FKntrs7H48.webp', srcSet: undefined }),
  f('office-meeting', 'Contemporary office meeting table and chairs', 'inspiration', ['office'], { derived: true, src: 'https://static.wixstatic.com/media/a9ed88_1e14de8d5493484f8cfe41d5e2912712~mv2.png/v1/fill/w_1000%2Ch_670%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01/a9ed88_1e14de8d5493484f8cfe41d5e2912712~mv2.png', srcSet: undefined }),
  f('office-storage', 'Modern office storage cabinets and shelves', 'inspiration', ['office'], { derived: true, src: 'https://cdn.shopify.com/s/files/1/0491/2165/6981/articles/modern-office-storage-trends--style-meets-function.png?v=1748327979', srcSet: undefined }),
]
export const IMAGES = Object.fromEntries(list.map((i) => [i.id, i]))
export const img = (id) => IMAGES[id]
export const GALLERY_IMAGES = list.filter((i) => !i.derived && !i.tags.includes('recliners'))

// Where each editorial placement on the site gets its picture. Change a value here to re-skin a section.
export const SLOTS = {
  hero: 13,                               // home hero (living room, dark-green sofa set)
  intro: [3, 'detail-gold-leg'],          // home "made for the room" overlap
  materials: [2, 'detail-glass-cabinet', 'detail-fluted-panel'],
  rooms: ['sofa-premium', 'bedroom-soft-neutral', 'kitchen-u'], // home room sequence: living, bedroom, kitchen
  aboutMain: 11, aboutInset: 'detail-gold-leg',
  materialsPage: [
    ['detail-glass-cabinet', 'Glass-front units and gloss shutters'],
    ['detail-gold-leg', 'Gold-tone metal legs on velvet'],
    ['detail-fluted-panel', 'Fluted panel with gold-tone rules'],
    [19, 'LED strip lighting on a storage bed'],
  ],
  interiors: [['sofa-premium', 'Living room'], ['bedroom-soft-neutral', 'Bedroom'], ['kitchen-u', 'Kitchen'], ['wardrobe-sliding', 'Storage'], ['office-reception', 'Office spaces']],
}
