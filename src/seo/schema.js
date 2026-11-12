// JSON-LD @graph builder. Every page describes the same business entity (#business) so search engines and AI tools
// connect them. Only confirmed facts are used: hours, geo, sameAs and priceRange are emitted only when set in business.js.
import { BUSINESS, mapsLink } from '../data/business'
import { SITE_URL, BRAND, SECTION_NAMES, absUrl } from './site'

const ID = { business: `${SITE_URL}/#business`, website: `${SITE_URL}/#website`, logo: `${SITE_URL}/#logo` }

export function businessNode() {
  const b = BUSINESS
  const node = {
    '@type': 'FurnitureStore',
    '@id': ID.business,
    name: b.name,
    alternateName: b.altName,
    slogan: b.tagline,
    description: 'Custom furniture maker and showroom in Kondhwa, Pune. Sofas, recliners, beds, wardrobes, modular kitchens, TV units, false ceilings and office furniture, made to measure at our own factory in Kondhwa.',
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', '@id': ID.logo, url: `${SITE_URL}/images/logo.png`, caption: b.name },
    image: [`${SITE_URL}/images/13.webp`, `${SITE_URL}/images/logo.png`],
    telephone: b.phones[0].tel,
    email: b.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.showroom.street,
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411048',
      addressCountry: 'IN',
    },
    hasMap: mapsLink,
    areaServed: [{ '@type': 'City', name: 'Pune' }, ...b.areas.map((name) => ({ '@type': 'Place', name: `${name}, Pune` }))],
    contactPoint: b.phones.map((p) => ({ '@type': 'ContactPoint', telephone: p.tel, contactType: 'sales', areaServed: 'IN' })),
    knowsAbout: ['Custom sofas', 'Recliners', 'Storage beds', 'Wardrobes', 'Modular kitchens', 'TV units', 'False ceilings', 'Office furniture'],
  }
  if (b.geo) node.geo = { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng }
  if (b.hours?.length) node.openingHoursSpecification = b.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes }))
  if (b.sameAs?.length) node.sameAs = b.sameAs
  if (b.priceRange) node.priceRange = b.priceRange
  if (b.established) node.foundingDate = String(b.established)
  return node
}

function websiteNode() {
  return { '@type': 'WebSite', '@id': ID.website, url: `${SITE_URL}/`, name: BRAND, inLanguage: 'en-IN', publisher: { '@id': ID.business } }
}

// Home > Section > Page, from the URL. `name` is the short page name.
export function breadcrumbs(path, name) {
  if (path === '/') return null
  const items = [['Home', '/']]
  const [section] = path.split('/').filter(Boolean)
  const known = SECTION_NAMES[section]
  if (known && known[1] !== path) items.push(known)
  items.push([name, path])
  return items
}

/**
 * @param {object} m page meta: path, title, name, description, image (absolute URL or null), type, faqs [[q, a]],
 *                   nodes (extra schema nodes), article ({ datePublished, dateModified }), items (ItemList entries)
 */
export function buildGraph(m) {
  const url = absUrl(m.path)
  const graph = [businessNode(), websiteNode()]
  const types = [m.type || 'WebPage']
  if (m.faqs?.length) types.push('FAQPage')
  const page = {
    '@type': types.length > 1 ? types : types[0],
    '@id': `${url}#webpage`,
    url,
    name: m.title,
    description: m.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': ID.website },
  }
  if (m.path === '/') page.about = { '@id': ID.business }
  if (m.image) page.primaryImageOfPage = { '@type': 'ImageObject', url: m.image }
  if (m.faqs?.length) page.mainEntity = m.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  const crumbs = breadcrumbs(m.path, m.name || m.title)
  if (crumbs) {
    page.breadcrumb = { '@id': `${url}#breadcrumb` }
    graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: crumbs.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absUrl(p) })) })
  }
  graph.push(page)
  if (m.service) {
    graph.push({
      '@type': 'Service', '@id': `${url}#service`, name: m.service.name, serviceType: m.service.type || m.service.name,
      description: m.description, url, provider: { '@id': ID.business }, areaServed: { '@type': 'City', name: 'Pune' },
      ...(m.image ? { image: m.image } : {}),
    })
  }
  if (m.items?.length) {
    graph.push({ '@type': 'ItemList', '@id': `${url}#options`, name: m.itemsName || `${m.name} options`, itemListElement: m.items.map(([name, description], i) => ({ '@type': 'ListItem', position: i + 1, name, ...(description ? { description } : {}) })) })
  }
  if (m.article) {
    graph.push({
      '@type': 'BlogPosting', '@id': `${url}#article`, headline: m.name || m.title, description: m.description,
      datePublished: m.article.datePublished, dateModified: m.article.dateModified || m.article.datePublished,
      inLanguage: 'en-IN', mainEntityOfPage: { '@id': `${url}#webpage` }, ...(m.image ? { image: m.image } : {}),
      author: { '@type': 'Organization', name: `${BRAND} team`, url: `${SITE_URL}/about` },
      publisher: { '@id': ID.business }, articleSection: m.article.section, wordCount: m.article.words,
    })
  }
  if (m.nodes) graph.push(...m.nodes)
  return { '@context': 'https://schema.org', '@graph': graph }
}
