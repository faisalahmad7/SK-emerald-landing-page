// Turns page meta into <head> tags. The same list is rendered to a string at build time (pre-render) and applied to
// document.head on client-side navigation, so both always agree.
import { img } from '../data/images'
import { BRAND, LOCALE, DEFAULT_OG, pageKey, absUrl } from './site'
import { buildGraph } from './schema'

// Resolve an image id or path to a local (same-site) image, or null. Images hot-linked from other sites are never used
// for share cards, preloads or structured data.
export function localImage(ref) {
  if (ref == null) return null
  const im = typeof ref === 'string' && ref.startsWith('/') ? { src: ref } : img(ref)
  if (!im || !im.src?.startsWith('/')) return null
  return { src: im.src, srcSet: im.srcSet }
}

export function buildMeta(p) {
  const title = p.title.includes('|') ? p.title : `${p.title} | ${BRAND}`
  const local = localImage(p.image)
  const og = p.path === '/404' ? DEFAULT_OG : `/og/${pageKey(p.path)}.jpg`
  const graph = buildGraph({ ...p, title, image: local ? absUrl(local.src) : null })
  return { ...p, title, ogImage: og, ogSource: local?.src || null, preload: p.preload !== false ? local : null, graph }
}

export function headTags(m) {
  const url = absUrl(m.path === '/404' ? '/' : m.path)
  const t = []
  t.push(['title', {}, m.title])
  t.push(['meta', { name: 'description', content: m.description }])
  if (m.path !== '/404') t.push(['link', { rel: 'canonical', href: url }])
  t.push(['meta', { name: 'robots', content: m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1' }])
  t.push(['meta', { property: 'og:type', content: m.article ? 'article' : 'website' }])
  t.push(['meta', { property: 'og:site_name', content: BRAND }])
  t.push(['meta', { property: 'og:locale', content: LOCALE }])
  t.push(['meta', { property: 'og:title', content: m.title }])
  t.push(['meta', { property: 'og:description', content: m.description }])
  t.push(['meta', { property: 'og:url', content: url }])
  t.push(['meta', { property: 'og:image', content: absUrl(m.ogImage) }])
  t.push(['meta', { property: 'og:image:width', content: '1200' }])
  t.push(['meta', { property: 'og:image:height', content: '630' }])
  t.push(['meta', { property: 'og:image:alt', content: m.name || m.title }])
  if (m.article) {
    t.push(['meta', { property: 'article:published_time', content: m.article.datePublished }])
    t.push(['meta', { property: 'article:modified_time', content: m.article.dateModified || m.article.datePublished }])
  }
  t.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
  t.push(['meta', { name: 'twitter:title', content: m.title }])
  t.push(['meta', { name: 'twitter:description', content: m.description }])
  t.push(['meta', { name: 'twitter:image', content: absUrl(m.ogImage) }])
  t.push(['script', { type: 'application/ld+json' }, JSON.stringify(m.graph)])
  return t
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function renderHead(m) {
  const tags = headTags(m).map(([tag, attrs, text]) => {
    const a = Object.entries(attrs).map(([k, v]) => ` ${k}="${esc(v)}"`).join('')
    if (tag === 'script') return `<script${a}>${text.replace(/</g, '\\u003c')}</script>`
    if (tag === 'title') return `<title>${esc(text)}</title>`
    return `<${tag}${a}>`
  })
  if (m.preload) {
    const { src, srcSet } = m.preload
    tags.push(srcSet ? `<link rel="preload" as="image" href="${src}" imagesrcset="${esc(srcSet)}" imagesizes="(min-width: 900px) 50vw, 100vw" fetchpriority="high">` : `<link rel="preload" as="image" href="${src}" fetchpriority="high">`)
  }
  return tags.join('\n  ')
}

// Client-side: replace the managed tags (marked data-sk) with the new page's tags.
export function applyHead(m) {
  if (typeof document === 'undefined') return
  const head = document.head
  head.querySelectorAll('[data-sk]').forEach((el) => el.remove())
  // Tags written by the pre-renderer carry no marker; drop them on the first client navigation.
  head.querySelectorAll('meta[name="description"],link[rel="canonical"],meta[name="robots"],meta[property^="og:"],meta[property^="article:"],meta[name^="twitter:"],script[type="application/ld+json"]').forEach((el) => el.remove())
  for (const [tag, attrs, text] of headTags(m)) {
    if (tag === 'title') { document.title = text; continue }
    const el = document.createElement(tag)
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    if (text) el.textContent = text
    el.setAttribute('data-sk', '')
    head.appendChild(el)
  }
}
