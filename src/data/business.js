// Single source of truth for business facts. Items marked VERIFY need owner confirmation.
// Fields left null/empty are simply left out of the page and the structured data until they are filled in.
export const BUSINESS = {
  name: 'SK Emerald Interior',
  altName: 'Emerald Furniture',
  tagline: 'Deserve to Quality',
  phones: [
    { display: '90118 31169', tel: '+919011831169' },
    { display: '90759 01169', tel: '+919075901169' },
  ],
  whatsapp: '919011831169', // VERIFY: which number should receive WhatsApp enquiries
  email: 'Skemeraldinterior@gmail.com',
  showroom: {
    // Wording matches the verified Google Business Profile (checked 17 Nov 2026).
    lines: ['Shop No. 226, First Floor', 'Unitas Fashion Center', 'Parge Nagar, Kondhwa', 'Pune, Maharashtra 411048'],
    street: 'Shop No. 226, First Floor, Unitas Fashion Center, Parge Nagar, Kondhwa',
    oneLine: 'Shop No. 226, First Floor, Unitas Fashion Center, Parge Nagar, Kondhwa, Pune, Maharashtra 411048',
  },
  // Showroom hours from the verified Google Business Profile (17 Nov 2026). Keep both in sync.
  hours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '12:00', closes: '21:00' }],
  hoursText: 'Open every day, 12 pm to 9 pm',
  // Factory where the furniture is made. Showroom and factory are different places.
  factory: {
    lines: ['S No 105', 'Opp HP Petrol Pump', 'Near Zudio Mall', 'Kondhwa BK, Pune'],
    oneLine: 'S No 105 Opp HP Petrol Pump Near Zudio Mall, Kondhwa BK, Pune',
  },
  established: null, // Reported as 2019 on directories. VERIFY before showing.
  // Areas we deliver to (structured data areaServed). VERIFY the list with the owner.
  areas: ['Kondhwa', 'NIBM Road', 'Undri', 'Pisoli', 'Wanowrie', 'Hadapsar'],
  geo: { lat: 18.4643763, lng: 73.8932152 }, // Google Business Profile pin (17 Nov 2026)
  instagram: 'https://www.instagram.com/s.k_emeraldinterior/',
  instagramHandle: '@s.k_emeraldinterior',
  googleProfile: 'https://www.google.com/maps?cid=13440211058621275175', // Google Business Profile (Maps listing)
  // Profile URLs for structured data. Add Justdial, IndiaMART, Facebook, YouTube when confirmed.
  sameAs: ['https://www.instagram.com/s.k_emeraldinterior/', 'https://www.google.com/maps?cid=13440211058621275175'],
  priceRange: null, // e.g. '₹₹' once the owner agrees
  reviewLink: 'https://search.google.com/local/writereview?placeid=ChIJI6022AvrwjsRJ9xln784hbo', // opens the Google review form for this listing
}

export const waLink = (text) =>
  `https://wa.me/${BUSINESS.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const mapsLink = BUSINESS.googleProfile // the verified listing itself, so Directions lands on the right pin
export const reviewLink = BUSINESS.reviewLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('SK Emerald Interior Kondhwa Pune')}`
export const telLink = (p) => `tel:${p.tel}`
export const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(BUSINESS.email)}&su=${encodeURIComponent('Enquiry from website')}`
