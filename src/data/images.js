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
  f('kitchen-straight-wood', 'Straight kitchen in light oak with black handles, marble-look splashback and a black sink', 'inspiration', ['kitchens']),
  f('kitchen-grey-glass-display', 'Slate-grey gloss kitchen run with frosted glass overhead cabinets and a tall glass display unit', 'inspiration', ['kitchens']),
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
  f('home-tv-wall', 'Modern living room with a floating walnut TV unit, warm cove lighting and a crystal chandelier', 'inspiration', ['tv', 'living'], { derived: true }),
  f('ceiling-cove-wood-inset', 'Cove-lit false ceiling with a timber-look centre panel over a living room with two sofas', 'inspiration', ['living']),
  f('ceiling-fan-layered-cove', 'Layered cove-lit false ceiling with a ceiling fan panel and recessed spotlights', 'inspiration', ['living']),
  f('ceiling-layered-tv-wall', 'Layered cove-lit false ceiling with a square pendant light above a TV wall and corner sofa', 'inspiration', ['living', 'tv']),
  f('mirror-backlit-full-length', 'Full-length arched mirror with warm backlighting set into a wall panel beside wooden slat panelling', 'inspiration', []),
  f('table-nesting-walnut', 'Set of three walnut-look nesting side tables with tapered legs beside a grey sofa', 'inspiration', []),
  f('table-round-fluted-walnut', 'Round walnut-look coffee table with a fluted side and solid base in front of a beige sectional', 'inspiration', []),
  f('table-glass-top-drawers', 'Rectangular coffee table with a tinted glass top and a cream drawer base in front of a beige sofa', 'inspiration', []),
  f('countertop-granite-grey', 'Polished grey granite counter top with a rounded edge in a U-shaped kitchen with white cabinets', 'inspiration', ['kitchens']),
  f('countertop-quartz-speckled', 'Light speckled quartz counter top on a kitchen island with warm wood cabinets', 'inspiration', ['kitchens']),
  f('countertop-quartz-beige', 'Pale veined stone-look counter top on a kitchen island with light wood cabinets', 'inspiration', ['kitchens']),
  f('countertop-black-gloss', 'Glossy black counter top with an undermount sink in a kitchen with wood and taupe cabinets', 'inspiration', ['kitchens']),
  f('desk-long-wall-shelves', 'Full-width oak-look study desk with a white drawer unit and wall-mounted shelves above', 'inspiration', []),
  f('desk-corner-slatted-lit', 'Compact study corner with a grey desk, lit slatted wood back panel and white overhead cabinets', 'inspiration', []),
  f('desk-slatted-shelf-drawers', 'Cream study desk with drawers, a lit slatted back panel and open shelves above', 'inspiration', []),
  f('dining-live-edge-wood', 'Long live-edge wood dining table with upholstered chairs, gold pendant lights and a carved wooden screen', 'inspiration', []),
  f('dining-glass-top-six-seater', 'Six-seater dining table with a glass top, wooden frame and cream upholstered chairs under glass pendant lights', 'inspiration', []),
  f('dining-sculpted-base-walnut', 'Walnut-look dining table with a sculpted base and curved-back chairs with blue seats', 'inspiration', []),
  f('dining-stone-top-four-seater', 'Four-seater dining table with a stone-look top, dark wood frame and cushioned chairs', 'inspiration', []),
  f('dining-stone-top-six-seater', 'Six-seater dining table with a stone-look top on tapered wooden legs and cushioned chairs', 'inspiration', []),
  f('dressing-mirror-cabinet-two-drawer', 'Slim dresser with a mirrored cabinet above and two drawers below in a walnut and cream finish', 'inspiration', []),
  f('dressing-oval-mirror-lit-pouf', 'Wall-fixed dressing counter with a backlit oval mirror, a wood-finish drawer and an upholstered pouf', 'inspiration', []),
  f('dressing-oval-mirror-floating', 'Floating dressing unit with an oval mirror, a fluted drawer front and a tall open shelf unit beside it', 'inspiration', []),
  f('dressing-half-round-mirror-lit-shelves', 'Fluted-panel dressing unit with a lit half-round mirror, drawers, a pouf and lit display shelves', 'inspiration', []),
  f('chair-wingback-blue', 'Blue-grey channel-back wingback armchair with a patterned cushion and tapered wooden legs', 'inspiration', []),
  f('chair-green-swivel-pair', 'Pair of rounded swivel armchairs in textured green fabric', 'inspiration', []),
  f('chair-teal-swivel-pair', 'Pair of rounded teal swivel armchairs either side of a small wooden side table', 'inspiration', []),
  f('chair-boucle-dining', 'Cream textured dining chair with a round seat, a rolled back and slim black legs', 'inspiration', []),
  f('chair-hanging-rattan', 'Woven hanging egg chair on a stand with white and beige cushions in a bright corner', 'inspiration', []),
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
  f('bed-beige', 'Beige upholstered bed with a channelled headboard, gold pendant lights and warm wall lighting', 'inspiration', ['beds'], { derived: true }),
  f('recliner-set', 'Taupe power recliner sofa and single recliner with a round marble coffee table', 'inspiration', ['recliners', 'living'], { derived: true }),
  f('recliner-single', 'Black leather single-seat recliner with the footrest extended, on a white rug', 'inspiration', ['recliners'], { derived: true }),
  f('sofa-olive', 'Olive green velvet L-shaped sofa with a wooden base and nesting coffee tables', 'inspiration', ['sofas', 'living'], { derived: true }),
  f('living-sage', 'Sage green channelled sectional sofa in a living room with grey wall panelling and tall windows', 'inspiration', ['sofas', 'living'], { derived: true }),
  f('sofa-navy', 'Navy blue velvet sofa with a marble-top coffee table in a bright living room', 'inspiration', ['sofas', 'living'], { derived: true }),
  f('sofa-premium', 'Premium cream boucle sofa set in a bright living room, inspiration image', 'inspiration', ['sofas', 'living'], { derived: true, src: 'https://www.idealhomeqatar.com/cdn/shop/files/lucas.png?v=1775896820', srcSet: undefined }),
  f('kitchen-u', 'Modern U-shaped modular kitchen with warm wood cabinetry', 'inspiration', ['kitchens'], { derived: true, src: 'https://coohom-biz-sg-s3.coohom.com/ins/static/article/hyderabad-mod-kitchen-1773591881640300900.jpg', srcSet: undefined }),
  f('wardrobe-sliding', 'Modern white sliding wardrobe with open storage', 'inspiration', ['wardrobes'], { derived: true, src: 'https://img.interiorcompany.com/interior/webproduct/105638695221872143881.png?aio=w-1080%3B', srcSet: undefined }),
  f('office-reception', 'Modern office reception with visitor seating and work desk', 'inspiration', ['office'], { derived: true, src: 'https://static.levocdn.com/WC39KELV/ReceptionDeskDesign7-6HghxPOJHYr7.jpg', srcSet: undefined }),
  f('tv-feature-wall', 'Original stone-look TV wall with lit shelves', 'inspiration', ['tv'], { derived: true, src: `${base}images/25.webp`, srcSet: undefined }),
  f('recliner-chair', 'Aqua single-seat recliner, original showroom photograph', 'work', ['recliners'], { derived: true, src: `${base}images/6.webp`, srcSet: undefined }),
  f('office-workstation', 'Open-plan office desk workstations and storage', 'inspiration', ['office'], { derived: true, src: 'https://cdn.prod.website-files.com/642f23e5f54b794300ac12a6/699f72a10577fc102d30b860_vHLLaNn0tyUikJI-XmqCttvsmNLG6R4T8FKntrs7H48.webp', srcSet: undefined }),
  f('office-meeting', 'Contemporary office meeting table and chairs', 'inspiration', ['office'], { derived: true, src: 'https://static.wixstatic.com/media/a9ed88_1e14de8d5493484f8cfe41d5e2912712~mv2.png/v1/fill/w_1000%2Ch_670%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01/a9ed88_1e14de8d5493484f8cfe41d5e2912712~mv2.png', srcSet: undefined }),
  f('office-storage', 'Modern office storage cabinets and shelves', 'inspiration', ['office'], { derived: true, src: 'https://cdn.shopify.com/s/files/1/0491/2165/6981/articles/modern-office-storage-trends--style-meets-function.png?v=1748327979', srcSet: undefined }),
  // Wardrobe configuration images (inspiration, not completed SK Emerald jobs). Originals kept in /source-images.
  f('wardrobe-glossy-timber', 'Tall glossy grey wardrobe with long timber handles, a dressing mirror and timber base storage, inspiration image', 'inspiration', ['wardrobes'], { derived: true }),
  f('wardrobe-walnut-mirror', 'Walnut-finish hinged wardrobe with loft cabinets and a central mirror niche with drawers, inspiration image', 'inspiration', ['wardrobes'], { derived: true }),
  f('wardrobe-lit-loft', 'Taupe wardrobe with cove-lit loft cabinets, long handles and a backlit mirror with drawers, inspiration image', 'inspiration', ['wardrobes'], { derived: true }),
  f('wardrobe-sliding-geometric', 'Sliding wardrobe with geometric sage-green and cream doors, open side shelves and loft cabinets', 'inspiration', ['wardrobes']),
  // TV unit configuration image (inspiration, not a completed SK Emerald job). Original kept in /source-images.
  f('dining-walnut-two-seater', 'Compact walnut dining table with two walnut chairs with black cushioned seats, inspiration image', 'inspiration', ['dining']),
  // Office setups (inspiration images, not completed SK Emerald jobs).
  f('office-twin-workstations', 'Two black height-adjustable workstations facing each other, with monitors, task chairs and a low bookcase', 'inspiration', ['office']),
  f('office-desk-sideboard', 'Office with a walnut desk on black legs, a leather chair, a matching sideboard and a bookcase beside a tall window', 'inspiration', ['office']),
  f('office-executive-desk-seating', 'Executive office with a dark wood desk, a leather chair, a sofa seating area and wall-to-wall shelving', 'inspiration', ['office']),
  // Kitchen setups (inspiration images, not completed SK Emerald jobs).
  f('kitchen-cream-fridge-corner', 'Cream L-shaped kitchen with a tall fridge, open niche shelves, a black chimney and a window', 'inspiration', ['kitchens']),
  f('kitchen-u-window-warm', 'U-shaped cream kitchen with a stone-look counter top, a window over the sink, glass-front cabinets and warm lighting', 'inspiration', ['kitchens']),
  f('kitchen-taupe-breakfast-table', 'Taupe handleless kitchen with under-cabinet lighting, a built-in oven and a wooden breakfast table with chairs', 'inspiration', ['kitchens']),
  // Bedroom setups (inspiration images, not completed SK Emerald jobs).
  f('bedroom-tv-unit-warm-cove', 'Bedroom with a floating TV unit, warm cove lighting, a beige upholstered bed and a balcony window', 'inspiration', ['bedroom']),
  f('bedroom-desk-led-bed', 'Compact bedroom with an upholstered bed with LED underglow, a study desk with drawers and a shelf above', 'inspiration', ['bedroom']),
  f('bedroom-study-wall-unit', 'Bedroom with a platform bed, bench and a wall unit with a study desk, lit shelves and drawers', 'inspiration', ['bedroom']),
  f('bedroom-wood-panel-wall', 'Bedroom with a wood-panelled feature wall, a grey headboard, pendant lights and a built-in drawer unit', 'inspiration', ['bedroom']),
  f('bedroom-desk-pendants', 'Bedroom with a timber headboard, pendant lights, a long study desk by the window and a reading chair', 'inspiration', ['bedroom']),
  f('bedroom-wardrobe-cove-ceiling', 'Bedroom with a cove-lit ceiling, a padded headboard, fluted wall panel, tall wardrobes and a dressing corner', 'inspiration', ['bedroom']),
  // Living room setups (inspiration images, not completed SK Emerald jobs).
  f('living-ring-light-slatted-tv', 'Open living and dining room with a cream sofa, ring pendant lights, a cove-lit ceiling and a slatted wood TV wall', 'inspiration', ['living', 'sofas']),
  f('living-tan-sectional-marble-tv', 'Tan channelled sectional sofa with a marble-look TV wall, white drawer unit and a cove-lit ceiling', 'inspiration', ['living', 'sofas']),
  // Cabinets range (inspiration images, not completed SK Emerald jobs).
  f('cabinet-brown-glass-kitchen', 'Straight kitchen in a dark brown finish with glass-front overhead cabinets, a chimney, warm under-cabinet lighting and arched panel base units, inspiration image', 'inspiration', ['kitchens']),
  f('cabinet-walnut-slab-kitchen', 'Walnut-veneer kitchen with flat slab shutters, slim black handles, a black counter and an integrated oven, inspiration image', 'inspiration', ['kitchens']),
  // Shelves & drawers range (inspiration images, not completed SK Emerald jobs).
  f('shelf-built-in-wardrobe-open', 'Built-in oak-finish unit with open shelves, two hanging rails and four drawers on each side of the rails, inspiration image', 'inspiration', ['wardrobes']),
  f('shelf-corner-cherry', 'Tall dark cherry corner shelf with five curved tiers holding books, plants and vases, inspiration image', 'inspiration', []),
  f('shelf-oak-cabinet-base', 'Tall oak bookshelf with open cubbies for books and decor and two closed cabinets at the base, inspiration image', 'inspiration', []),
  f('shelf-staggered-walnut', 'Tall dark wood open bookshelf with staggered compartments of different widths, inspiration image', 'inspiration', []),
  f('drawers-eight-cream-oak', 'Eight-drawer chest in cream and oak with cut-out wood handles, styled with a lamp and vase, inspiration image', 'inspiration', []),
  f('drawers-six-walnut', 'Six-drawer walnut-finish dresser with flush fronts, styled with a vase and a woven lamp, inspiration image', 'inspiration', []),
  f('tv-backlit-panel', 'Bedroom TV wall with a sculpted 3D wall panel, warm edge lighting and a floating wooden console, inspiration image', 'inspiration', ['tv'], { derived: true }),
]
export const IMAGES = Object.fromEntries(list.map((i) => [i.id, i]))
export const img = (id) => IMAGES[id]
export const GALLERY_IMAGES = list.filter((i) => !i.derived && !i.tags.includes('recliners'))

// Where each editorial placement on the site gets its picture. Change a value here to re-skin a section.
export const SLOTS = {
  hero: 13,                               // home hero (living room, dark-green sofa set)
  intro: [3, 'home-tv-wall'],             // home "made for the room" overlap
  materials: ['sofa-olive', 'detail-glass-cabinet', 'detail-fluted-panel'],
  rooms: ['living-sage', 'bedroom-soft-neutral', 'kitchen-u'], // home room sequence: living, bedroom, kitchen
  aboutMain: 11, aboutInset: 'detail-gold-leg',
  materialsPage: [
    ['detail-glass-cabinet', 'Glass-front units and gloss shutters'],
    ['detail-gold-leg', 'Gold-tone metal legs on velvet'],
    ['detail-fluted-panel', 'Fluted panel with gold-tone rules'],
    [19, 'LED strip lighting on a storage bed'],
  ],
  interiors: [['living-sage', 'Living room'], ['bedroom-soft-neutral', 'Bedroom'], ['kitchen-u', 'Kitchen'], ['office-reception', 'Office spaces']],
}
