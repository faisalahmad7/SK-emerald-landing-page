// Site-wide SEO constants. Business facts themselves live in src/data/business.js.
export const SITE_URL = 'https://sk-emeraldinterior.in'
export const BRAND = 'SK Emerald Interior'
export const LOCALE = 'en_IN'
// Date the static pages' content last changed meaningfully (used as <lastmod> in the sitemap). Update when you edit page copy.
export const CONTENT_UPDATED = '2026-11-13'
// Default share image (generated at build from the home hero photo).
export const DEFAULT_OG = '/og/home.jpg'

// Section names used for automatic breadcrumbs: /collections/sofas -> Home > Collections > Sofas.
export const SECTION_NAMES = {
  collections: ['Collections', '/collections'],
  interiors: ['Interiors', '/interiors'],
  blog: ['Guides', '/blog'],
}

// /collections/sofas -> "collections-sofas"; "/" -> "home". Used for share-image file names.
export const pageKey = (path) => (path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '-'))
export const absUrl = (path) => (/^https?:/.test(path) ? path : SITE_URL + (path === '/' ? '/' : path))
