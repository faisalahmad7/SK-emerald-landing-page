// Search titles, headings, quick facts and FAQs for the main pages. Queries come from docs/seo/research/cluster-plan.md.
// Only confirmed facts: no prices, warranties or delivery times are promised here (they are confirmed in each quotation).
// title: <title> (≤ 65 chars) · h1: page heading · description: meta description (140-160 chars)
// facts: [label, value] quick-facts box · faqs: [question, answer] shown on the page and marked up as FAQPage.

const QUOTE = 'The materials, sizes and finish are written into your quotation before work starts.'

export const COLLECTION_SEO = {
  sofas: {
    title: 'Custom Sofas & Sofa Sets, Made in Kondhwa, Pune | SK Emerald',
    h1: 'Custom sofas and sofa sets, made in Pune',
    description: 'L-shaped, corner, 3+2 and 3+2+1 sofa sets made to your room size at our Kondhwa factory. We explain the frame, foam and fabric before you order.',
    facts: [['Layouts', '3+2+1, 3+2, 2+1, L-shaped, corner and chaise'], ['Upholstery', 'Fabric and velvet, chosen with you'], ['Made at', 'Our factory in Kondhwa, Pune'], ['Specification', 'Frame, foam and fabric listed in your quotation'], ['See it', 'Showroom at Unitas Fashion Centre, Kondhwa']],
    faqs: [
      ['Do you make sofas to custom sizes?', 'Yes. Every sofa is made to your room measurements at our factory in Kondhwa. You choose the layout, seat count, upholstery and leg style, and we confirm the final size in your quotation.'],
      ['What is inside your sofas?', 'It varies by model. Before you order, we explain the frame, the foam and the fabric used, and the agreed specification is written into your quotation so you know exactly what you are paying for.'],
      ['How much does a sofa set cost in Pune?', 'The price depends on the size, the layout (for example L-shaped or 3+2), the foam and the fabric. Send us your room measurements on WhatsApp and we will give you a written quotation.'],
      ['Can I see sofa fabrics before I decide?', 'Yes. Visit our showroom at Unitas Fashion Centre, Kondhwa to compare fabrics and finishes. Please call or message first to confirm visiting times.'],
    ],
  },
  recliners: {
    title: 'Recliner Sofas & Chairs in Pune | SK Emerald Interior',
    h1: 'Recliner chairs and recliner sofas in Pune',
    description: 'Single recliners and recliner sofa sets: push-back, wall-hugger, swivel-glider and power-lift styles, planned around the space in your Pune home.',
    facts: [['Seating', 'Single recliners, pairs or full sets'], ['Mechanisms', 'Manual push-back, wall-hugger, swivel-glider, power-lift (by model)'], ['Upholstery', 'Fabric, with leatherette on selected models'], ['Planning', 'We check wall and floor clearance with you'], ['Specification', 'Mechanism and upholstery confirmed in your quotation']],
    faqs: [
      ['Recliner or normal sofa: which should I buy?', 'A recliner suits a TV room or a reading corner where you want to put your feet up. A normal sofa seats more people in less depth. Many families choose a sofa with one or two recliner seats.'],
      ['What is a wall-hugger recliner?', 'A wall-hugger (zero-wall) recliner slides forward as it reclines, so it needs much less space behind it. It is a good choice for smaller living rooms in flats.'],
      ['Do you make power recliners?', 'Powered reclining and power-lift mechanisms are available on selected designs, subject to availability. We confirm the mechanism in your quotation.'],
      ['How much space does a recliner need?', 'Share the wall length and the floor depth you have. We will check the clearance needed for the design you like so it can open safely.'],
    ],
  },
  beds: {
    title: 'Hydraulic & Storage Beds in Pune, Made to Size | SK Emerald',
    h1: 'Storage beds, made to your mattress size',
    description: 'Hydraulic lift-up and box storage beds, upholstered headboards and bunk beds, made to your mattress size at our factory in Kondhwa, Pune.',
    facts: [['Sizes', 'Single, double, queen and king'], ['Storage', 'Hydraulic lift-up or box storage on selected designs'], ['Headboards', 'Upholstered or panelled'], ['Matching pieces', 'Bedside tables and dressing tables'], ['Specification', 'Board, laminate and lift hardware listed in your quotation']],
    faqs: [
      ['Hydraulic bed or box storage bed: which is better?', 'A hydraulic bed lifts the whole mattress platform, so you can reach all the storage easily. A box bed with drawers or flaps suits rooms where you prefer not to lift the mattress. We can show you both.'],
      ['Can you make a bed for my mattress size?', 'Yes. Tell us your mattress size (single, double, queen or king) and the room size, and we will make the bed to fit.'],
      ['How much does a hydraulic bed cost in Pune?', 'It depends on the size, the storage type, the headboard and the materials. Send us your mattress and room size on WhatsApp for a written quotation.'],
    ],
  },
  wardrobes: {
    title: 'Customised Wardrobes in Pune: Sliding & Hinged | SK Emerald',
    h1: 'Wardrobes built to your wall',
    description: 'Sliding and hinged wardrobes with lofts, drawers and hanging space, built to your wall size in gloss, matte or laminate finishes at our Kondhwa factory.',
    facts: [['Doors', 'Sliding, hinged or a mix'], ['Inside', 'Hanging rails, shelves, drawers and lofts'], ['Finishes', 'Gloss, matte and laminate, including two-tone'], ['Size', 'Built to your wall, up to the ceiling'], ['Specification', 'Board grade, laminate and hinges listed in your quotation']],
    faqs: [
      ['Sliding or hinged wardrobe: which is better?', 'Sliding doors save space in tight bedrooms because they do not swing open. Hinged doors give full access to the whole wardrobe at once. We can combine both in one wall.'],
      ['How is wardrobe cost worked out?', 'Mainly by size, the board and finish, and the inside fittings such as drawers and lofts. Send your wall width and height and we will give you a written quotation.'],
      ['Can the wardrobe go up to the ceiling?', 'Yes. We can build floor-to-ceiling wardrobes with loft cabinets for things you use less often.'],
    ],
  },
  'tv-units': {
    title: 'TV Units & TV Wall Panels in Pune | SK Emerald Interior',
    h1: 'TV units and feature walls',
    description: 'Floating TV consoles, fluted panels, lit shelves and full media walls, planned around your screen and made at our factory in Kondhwa, Pune.',
    facts: [['Styles', 'Floating consoles, floor units, full media walls'], ['Panels', 'Fluted and panelled feature walls'], ['Lighting', 'Warm LED and display niches'], ['Storage', 'Open shelves and closed cabinets'], ['Specification', QUOTE]],
    faqs: [
      ['Should a TV unit be wider than the TV?', 'Usually yes. A unit a little wider than the screen looks balanced and gives space for speakers and decor. Tell us your screen size and wall width and we will suggest proportions.'],
      ['Can you hide the wires?', 'We plan cable routes and openings with you when the unit is designed, so wires can run behind panels where the design allows.'],
      ['How is a TV unit priced?', 'By size, the panels and finish, lighting and storage. Share a photo of the wall and its width for a written quotation.'],
    ],
  },
  'false-ceilings': {
    title: 'False Ceiling Design & Installation in Pune | SK Emerald',
    h1: 'False ceilings for homes in Pune',
    description: 'Cove, tray and layered false ceilings with concealed lighting, planned around your fans, lights and AC, and fitted with your furniture in Pune.',
    faqs: [
      ['Which type of false ceiling is best?', 'It depends on the room. Gypsum board gives a smooth, quick finish for living rooms and bedrooms. Rooms with moisture need a suitable material. We suggest the right option when we see the space.'],
      ['How much ceiling height does a false ceiling take?', 'It depends on the design and the lights inside it. We plan the drop with you so the room does not feel low.'],
      ['How is the false ceiling rate worked out?', 'By the area, the design (simple or layered) and the lighting. Send your room size and a photo for a written quotation.'],
    ],
  },
  'sofa-cum-beds': { title: 'Sofa cum Beds in Pune, Made to Measure | SK Emerald Interior', h1: 'Sofa cum beds' },
  'dining-tables': { title: 'Dining Tables in Pune, Made to Size | SK Emerald Interior', h1: 'Dining tables made to size' },
  'study-and-office-tables': { title: 'Study & Office Tables in Pune | SK Emerald Interior', h1: 'Study and office tables' },
  'crockery-units': { title: 'Crockery Units in Pune, Made to Measure | SK Emerald Interior', h1: 'Crockery units' },
  cabinets: { title: 'Kitchen & Storage Cabinets in Pune | SK Emerald Interior', h1: 'Kitchen and storage cabinets' },
}

export const ROOM_SEO = {
  'living-room': { title: 'Living Room Interiors & Furniture, Pune | SK Emerald', h1: 'Living room interiors' },
  bedroom: { title: 'Bedroom Interiors & Furniture, Pune | SK Emerald Interior', h1: 'Bedroom interiors' },
  'modular-kitchen': {
    title: 'Modular Kitchens in Kondhwa, Pune | SK Emerald Interior',
    h1: 'Modular kitchens, designed and made in Pune',
    description: 'L-shaped, U-shaped, parallel and straight modular kitchens drawn to your floor plan and made at our Kondhwa factory, with finishes agreed in writing.',
    facts: [['Layouts', 'Straight, L-shaped, U-shaped and parallel'], ['Units', 'Base and wall cabinets, tall units, crockery units'], ['Finishes', 'Laminate and gloss shutters on selected designs'], ['Hardware', 'Soft-close hinges and drawer runners where the design calls for them'], ['Made at', 'Our factory in Kondhwa, Pune'], ['Specification', 'Board, finishes, counter top and hardware listed in your quotation']],
    faqs: [
      ['What comes in a modular kitchen?', 'The cabinet boxes (carcass), the doors (shutters), hinges and drawer runners, and usually the counter top and storage accessories. We list every item in your quotation so you can compare quotes properly.'],
      ['Modular kitchen or carpenter-made kitchen?', 'A modular kitchen is made in a factory and fitted on site, so finishing is cleaner and work at home is shorter. A carpenter-made kitchen is built on site. Our guide compares the two in detail.'],
      ['How much does a modular kitchen cost in Pune?', 'It depends on the size and layout, the board, the shutter finish, the counter top and the accessories. Send us your kitchen measurements or floor plan on WhatsApp for a written quotation.'],
      ['Which board is best for a kitchen?', 'Near the sink and under the counter, ask for a water-resistant grade. Our materials guide explains the common grades, and the grade used is named in your quotation.'],
    ],
  },
  'office-spaces': { title: 'Office Furniture & Interiors in Pune | SK Emerald Interior', h1: 'Office furniture and interiors' },
}

// Default title for pages without an entry: "<Name> in Pune, Made to Measure | SK Emerald Interior", shortened if long.
export function defaultTitle(name) {
  const long = `${name} in Pune, Made to Measure | SK Emerald Interior`
  return long.length <= 65 ? long : `${name} in Pune | SK Emerald Interior`
}
// First sentence of an intro + a local line, kept between 120 and 160 characters.
export function defaultDescription(intro, tail = ' Made to measure at our factory in Kondhwa, Pune.') {
  let first = intro.split(/(?<=\.)\s/)[0]
  if ((first + tail).length > 160) first = first.slice(0, 157 - tail.length).replace(/[\s,;:]+\S*$/, '') + '.'
  return first + tail
}
