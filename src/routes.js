// Every public URL, used by the pre-renderer (one HTML file per route) and the sitemap, plus the page chunks.
import { COLLECTIONS, MORE_COLLECTIONS, bySlug } from './data/collections'
import { ROOMS, roomBySlug } from './data/rooms'
import { POSTS, postBySlug, loadPost } from './content/posts'

const STATIC = ['/', '/collections', '/interiors', '/gallery', '/design-ideas', '/about', '/reviews', '/blog', '/materials', '/contact', '/faq', '/privacy']

export function routeList() {
  return [
    ...STATIC,
    ...[...COLLECTIONS, ...MORE_COLLECTIONS].filter((c) => c.slug !== 'office-spaces').map((c) => `/collections/${c.slug}`),
    ...ROOMS.map((r) => `/interiors/${r.slug}`),
    ...POSTS.map((p) => p.path),
  ]
}

// Each page file is its own JS chunk, so a visit downloads only the page it opens. `file` is the source path the
// pre-renderer looks up in Vite's manifest to add <link rel="modulepreload"> for that chunk.
const chunk = (file, load) => {
  let mod, promise
  return { file, get: () => mod, load: () => (promise ??= load().then((m) => (mod = m))) }
}
export const PAGES = {
  home: chunk('src/pages/Home.jsx', () => import('./pages/Home.jsx')),
  collections: chunk('src/pages/Collections.jsx', () => import('./pages/Collections.jsx')),
  room: chunk('src/pages/Room.jsx', () => import('./pages/Room.jsx')),
  blog: chunk('src/pages/Blog.jsx', () => import('./pages/Blog.jsx')),
  gallery: chunk('src/pages/Gallery.jsx', () => import('./pages/Gallery.jsx')),
  contact: chunk('src/pages/Contact.jsx', () => import('./pages/Contact.jsx')),
  about: chunk('src/pages/About.jsx', () => import('./pages/About.jsx')),
  info: chunk('src/pages/Info.jsx', () => import('./pages/Info.jsx')),
}

// Old URLs that moved (the host also answers these with a 301 via public/_redirects).
export const MOVED = { '/collections/office-spaces': '/interiors/office-spaces', '/interiors/kitchen': '/interiors/modular-kitchen' }

const NOT_FOUND = ['info', 'NotFound']
const SIMPLE = {
  '/': ['home', 'default'], '/collections': ['collections', 'Collections'], '/interiors': ['info', 'Interiors'],
  '/gallery': ['gallery', 'default', { set: 'work' }], '/design-ideas': ['gallery', 'default', { set: 'inspiration' }],
  '/about': ['about', 'About'], '/reviews': ['about', 'Reviews'], '/blog': ['blog', 'Blog'], '/materials': ['info', 'Materials'],
  '/contact': ['contact', 'default'], '/faq': ['info', 'Faq'], '/privacy': ['info', 'Privacy'],
}

// path -> [page chunk, export name, props]
export function pageFor(path) {
  const m = path.match(/^\/collections\/([^/]+)$/)
  if (m) return bySlug(m[1]) ? ['collections', 'Collection', { slug: m[1] }] : NOT_FOUND
  const rm = path.match(/^\/interiors\/([^/]+)$/)
  if (rm) return roomBySlug(rm[1]) ? ['room', 'Room', { slug: rm[1] }] : NOT_FOUND
  const bm = path.match(/^\/blog\/([^/]+)$/)
  if (bm) return postBySlug(bm[1]) ? ['blog', 'BlogPost', { slug: bm[1] }] : NOT_FOUND
  return SIMPLE[path] || NOT_FOUND
}

// Load a page's chunk (and a blog post's content) before it renders: before hydration, so the first render matches the
// pre-rendered HTML, and before each client-side navigation, so the old page stays until the new one is ready.
export function preloadRoute(pathname) {
  const path = (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname) || '/'
  if (MOVED[path]) return Promise.resolve()
  const [key, , props] = pageFor(path)
  return Promise.all([PAGES[key].load(), key === 'blog' && props ? loadPost(props.slug) : null])
}
export const preloadAllPages = () => Promise.all(Object.values(PAGES).map((p) => p.load()))

// Sitemap <lastmod>: blog posts use their own updated date, other pages the shared content date.
export function lastModified(path, fallback) {
  const post = POSTS.find((p) => p.path === path)
  return post ? post.updated || post.date : fallback
}
