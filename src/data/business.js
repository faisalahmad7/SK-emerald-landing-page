// Single source of truth for business facts. Items marked VERIFY need owner confirmation.
export const BUSINESS = {
  name: 'SK Emerald Interior',
  altName: 'Emerald Furniture',
  tagline: 'Deserve to Quality',
  phones: [
    { display: '90118 31169', tel: '+919011831169' },
    { display: '90759 01169', tel: '+919075901169' },
  ],
  whatsapp: '919011831169', // VERIFY: which number should receive WhatsApp enquiries
  email: 'emeraldfurniturepune@gmail.com',
  showroom: {
    lines: ['Shop No. 226, First Floor', 'Unitas Fashion Centre Mall', 'Parge Nagar, Ambedkar Nagar', 'Kondhwa Khurd, Pune, Maharashtra 411048'], // VERIFY
    oneLine: 'Shop No. 226, First Floor, Unitas Fashion Centre Mall, Parge Nagar, Ambedkar Nagar, Kondhwa Khurd, Pune, Maharashtra 411048',
  },
  // Sources disagree on hours (10 AM-9 PM vs 9 AM-9:30 PM), so none are published. VERIFY then set `hours`.
  hours: null,
  // Factory address is deliberately NOT public (showroom and factory are different places). VERIFY before using.
  established: null, // Reported as 2019 on directories. VERIFY before showing.
}

export const waLink = (text) =>
  `https://wa.me/${BUSINESS.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('SK Emerald Interior ' + BUSINESS.showroom.oneLine)}`
export const telLink = (p) => `tel:${p.tel}`
