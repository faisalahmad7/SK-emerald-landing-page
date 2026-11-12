// Every public URL, used by the pre-renderer (one HTML file per route) and the sitemap.
import { COLLECTIONS, MORE_COLLECTIONS } from './data/collections'
import { ROOMS } from './data/rooms'
import { POSTS, loadPost } from './content/posts'

const STATIC = ['/', '/collections', '/interiors', '/gallery', '/design-ideas', '/about', '/reviews', '/blog', '/materials', '/contact', '/faq', '/privacy']

export function routeList() {
  return [
    ...STATIC,
    ...[...COLLECTIONS, ...MORE_COLLECTIONS].filter((c) => c.slug !== 'office-spaces').map((c) => `/collections/${c.slug}`),
    ...ROOMS.map((r) => `/interiors/${r.slug}`),
    ...POSTS.map((p) => p.path),
  ]
}

// Before the browser hydrates a pre-rendered blog post, load its content so the first render matches the HTML.
export function preloadRoute(pathname) {
  const m = pathname.replace(/\/+$/, '').match(/^\/blog\/([^/]+)$/)
  return m ? loadPost(m[1]) : Promise.resolve()
}

// Sitemap <lastmod>: blog posts use their own updated date, other pages the shared content date.
export function lastModified(path, fallback) {
  const post = POSTS.find((p) => p.path === path)
  return post ? post.updated || post.date : fallback
}
