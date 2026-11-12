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
    lines: ['Shop No. 226, First Floor', 'Unitas Fashion Centre Mall', 'Parge Nagar', 'Kondhwa Khurd, Pune, Maharashtra 411048'], // VERIFY: match the Google Business Profile wording exactly
    street: 'Shop No. 226, First Floor, Unitas Fashion Centre Mall, Parge Nagar, Kondhwa Khurd',
    oneLine: 'Shop No. 226, First Floor, Unitas Fashion Centre Mall, Parge Nagar, Kondhwa Khurd, Pune, Maharashtra 411048',
  },
  // Sources disagree on hours (10 AM-9 PM vs 9 AM-9:30 PM), so none are published. VERIFY, then set e.g.
  // hours: [{ days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '10:00', closes: '21:00' }]
  hours: null,
  // Factory where the furniture is made. Showroom and factory are different places.
  factory: {
    lines: ['S No 105', 'Opp HP Petrol Pump', 'Near Zudio Mall', 'Kondhwa BK, Pune'],
    oneLine: 'S No 105 Opp HP Petrol Pump Near Zudio Mall, Kondhwa BK, Pune',
  },
  established: null, // Reported as 2019 on directories. VERIFY before showing.
  // Areas we deliver to (structured data areaServed). VERIFY the list with the owner.
  areas: ['Kondhwa', 'NIBM Road', 'Undri', 'Pisoli', 'Wanowrie', 'Hadapsar'],
  geo: null,        // VERIFY: copy the exact pin from the Google Business Profile, e.g. { lat: 18.46, lng: 73.89 }
  sameAs: [],       // Add profile URLs: Google Business Profile (Maps), Justdial, IndiaMART, Instagram, Facebook, YouTube
  priceRange: null, // e.g. '₹₹' once the owner agrees
  reviewLink: null, // Paste the Business Profile "Ask for reviews" link here (https://g.page/r/.../review)
}

export const waLink = (text) =>
  `https://wa.me/${BUSINESS.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('SK Emerald Interior ' + BUSINESS.showroom.oneLine)}`
export const reviewLink = BUSINESS.reviewLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('SK Emerald Interior Kondhwa Pune')}`
export const telLink = (p) => `tel:${p.tel}`
