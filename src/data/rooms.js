// Room pages: /interiors/<slug>
// hero / heroPos = the photo shown beside the page title.
// setups = photos of different looks for that room. pieces = slugs from collections.js (COLLECTIONS or MORE_COLLECTIONS).
// Many photos are illustrative (see the note shown on the page). To swap in your own: change `image` (an id from images.js).
export const ROOMS = [
  { slug: 'living-room', hero: 'living-sage', heroPos: '50% 50%', name: 'Living room', short: 'living room',
    lead: 'Sofa, centre table, TV wall and ceiling planned together, so the colours and finishes belong to one idea.',
    setups: [
      { name: 'Sage sectional with grey panelling', detail: 'A channelled sectional against softly panelled walls and tall windows.', image: 'living-sage' },
      { name: 'Cream sofa with ring lights and a slatted TV wall', detail: 'An open living and dining space with a ring pendant, a cove-lit ceiling and a slatted wood TV wall.', image: 'living-ring-light-slatted-tv', pos: '50% 45%' },
      { name: 'Dark-green sofa set with wall murals', detail: 'A velvet sofa set in a room finished with painted wall murals.', image: 13 },
      { name: 'Cream sofa set with ring lights', detail: 'A light sofa set under a ring light, with panelled walls behind.', image: 29 },
      { name: 'Beige sectional with a round coffee table', detail: 'A warm corner sofa, a gold-tone coffee table and a floating TV unit.', image: 34 },
      { name: 'Tan sectional with a marble TV wall', detail: 'A channelled corner sofa, a marble-look TV wall with a white drawer unit and a cove-lit ceiling.', image: 'living-tan-sectional-marble-tv', pos: '50% 42%' },
    ],
    pieces: ['sofas', 'sofa-cum-beds', 'recliners', 'tv-units', 'centre-side-and-coffee-tables', 'dining-tables', 'chairs', 'false-ceilings', 'mirrors-and-wall-decor', 'shelves-and-drawers'] },
  { slug: 'bedroom', hero: 'bed-beige', heroPos: '50% 55%', name: 'Bedroom', short: 'bedroom',
    lead: 'A bed, wardrobe and matching pieces sized to the room, with lighting and finishes chosen to go together.',
    setups: [
      { name: 'Bed with floating TV unit and warm cove lights', detail: 'A beige upholstered bed facing a floating TV unit, with warm cove lighting.', image: 'bedroom-tv-unit-warm-cove', pos: '50% 50%' },
      { name: 'Bed with LED underglow and a study desk', detail: 'A storage bed with warm LED lighting and a compact study corner.', image: 'bedroom-desk-led-bed', pos: '50% 50%' },
      { name: 'Bedroom with a built-in study wall', detail: 'A platform bed with a wall unit holding a desk, drawers and lit shelves.', image: 'bedroom-study-wall-unit', pos: '65% 50%' },
      { name: 'Wood-panelled wall with a drawer unit', detail: 'A wood-panelled feature wall behind a grey headboard, with a built-in drawer unit.', image: 'bedroom-wood-panel-wall', pos: '50% 50%' },
      { name: 'Timber headboard with a study desk', detail: 'A timber headboard with pendant lights and a long desk by the window.', image: 'bedroom-desk-pendants', pos: '50% 50%' },
      { name: 'Bedroom with wardrobes and a cove ceiling', detail: 'A padded headboard, tall wardrobes, a dressing corner and a cove-lit ceiling.', image: 'bedroom-wardrobe-cove-ceiling', pos: '50% 40%' },
    ],
    pieces: ['beds', 'sofa-cum-beds', 'bedside-tables', 'wardrobes', 'dressing-tables', 'study-and-office-tables', 'tv-units', 'false-ceilings', 'mirrors-and-wall-decor', 'shelves-and-drawers', 'chairs'] },
  { slug: 'kitchen', hero: 'kitchen-u', heroPos: '50% 50%', name: 'Kitchen', short: 'kitchen',
    lead: 'Units drawn to your floor plan, with finishes, counter tops and hardware agreed in writing.',
    setups: [
      { name: 'U-shaped kitchen in warm wood', detail: 'Three connected runs with generous counter and cabinet space.', image: 'kitchen-u' },
      { name: 'Cream L-shaped kitchen with a fridge corner', detail: 'A cream L-shaped layout with open niche shelves, a black chimney and a window.', image: 'kitchen-cream-fridge-corner', pos: '50% 50%' },
      { name: 'U-shaped kitchen with a window', detail: 'A U-shaped layout with a stone-look counter top, glass-front cabinets and warm lighting.', image: 'kitchen-u-window-warm', pos: '50% 55%' },
      { name: 'Beige kitchen with tall unit', detail: 'A tall unit with an open niche, in a calm beige finish.', image: 33 },
      { name: 'Plum and white kitchen', detail: 'A two-colour kitchen with a bold lower run.', image: 35 },
      { name: 'Taupe kitchen with a breakfast table', detail: 'A handleless taupe kitchen with under-cabinet lighting and a wooden breakfast table.', image: 'kitchen-taupe-breakfast-table', pos: '50% 50%' },
    ],
    pieces: ['cabinets', 'crockery-units', 'counter-tops', 'shelves-and-drawers', 'dining-tables'] },
  { slug: 'office-spaces', hero: 'office-reception', heroPos: '50% 50%', name: 'Office spaces', short: 'office',
    lead: 'Reception counters, workstations, meeting tables and storage planned around the way your team works.',
    setups: [
      { name: 'Reception with visitor seating', detail: 'A front desk and seating that give visitors a clear first point of contact.', image: 'office-reception' },
      { name: 'Twin workstations', detail: 'Two matching desks with monitor space and storage for a pair or a small team.', image: 'office-twin-workstations', pos: '50% 50%' },
      { name: 'Office with a desk and sideboard', detail: 'A solid desk with a matching sideboard and bookcase for a private office.', image: 'office-desk-sideboard', pos: '50% 50%' },
      { name: 'Executive office with seating', detail: 'A large desk, wall-to-wall shelving and a seating area for meetings.', image: 'office-executive-desk-seating', pos: '50% 50%' },
    ],
    pieces: ['office-loungers', 'study-and-office-tables', 'chairs', 'shelves-and-drawers'] },
]
export const roomBySlug = (s) => ROOMS.find((r) => r.slug === s)
