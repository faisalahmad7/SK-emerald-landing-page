#!/usr/bin/env node
// Step 3 of `npm run build` (after the client and SSR builds):
//   - renders every route to static HTML in dist/ (collections/sofas -> dist/collections/sofas.html, so Cloudflare Pages
//     and Vercel serve /collections/sofas with no redirect), plus dist/404.html for unknown URLs
//   - creates a 1200x630 share image per page in dist/og/ from that page's own photo
//   - writes dist/sitemap.xml and dist/llms.txt
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const DIST = resolve('dist')
const ssr = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const { render, routeList, lastModified, preloadAllPosts, renderHead, POSTS, BUSINESS, SITE_URL, CONTENT_UPDATED } = ssr

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
if (!template.includes('<!--seo-head-->') || !template.includes('<div id="root"></div>')) throw new Error('index.html template markers missing')

await preloadAllPosts()
const routes = routeList()
const outFile = (path) => (path === '/' ? 'index.html' : path === '/404' ? '404.html' : `${path.slice(1)}.html`)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Share image: the page's photo, cropped to 1200x630, with a dark band carrying the page name and the brand.
const ogDone = new Map()
async function makeOg(meta) {
  const file = join(DIST, meta.ogImage)
  const src = meta.ogSource ? join(DIST, meta.ogSource) : join(DIST, 'images/13.webp')
  if (!existsSync(src)) return
  const title = (meta.name && meta.path !== '/' ? meta.name : 'Made-to-measure furniture and interiors').slice(0, 60)
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.45" stop-color="#122B21" stop-opacity="0"/><stop offset="1" stop-color="#122B21" stop-opacity="0.92"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="56" y="476" width="64" height="2" fill="#C9AD78"/>
    <text x="56" y="532" font-family="Georgia, 'Times New Roman', serif" font-size="50" fill="#F8F5EE">${esc(title)}</text>
    <text x="56" y="580" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="3" fill="#D3D8D1">SK EMERALD INTERIOR · KONDHWA, PUNE</text>
  </svg>`
  mkdirSync(dirname(file), { recursive: true })
  await sharp(src).resize(1200, 630, { fit: 'cover', position: 'attention' }).composite([{ input: Buffer.from(svg) }]).jpeg({ quality: 78, mozjpeg: true }).toFile(file)
  ogDone.set(meta.ogImage, true)
}

const titles = new Map()
for (const path of [...routes, '/404']) {
  const { html, meta } = render(path)
  if (path !== '/404') {
    if (titles.has(meta.title)) throw new Error(`Duplicate title "${meta.title}" on ${path} and ${titles.get(meta.title)}`)
    titles.set(meta.title, path)
  }
  if (!ogDone.has(meta.ogImage)) await makeOg(meta)
  const page = template
    // The page is already complete HTML, so the app script can wait: let the hero image and fonts download first.
    .replace('<script type="module" crossorigin src=', '<script type="module" crossorigin fetchpriority="low" src=')
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace('<!--seo-head-->', renderHead(meta))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  const file = join(DIST, outFile(path))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page)
}

// Sitemap: every indexable route (not the 404).
const urls = routes.map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${lastModified(p, CONTENT_UPDATED)}</lastmod></url>`)
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)

// llms.txt: a plain summary for AI assistants (optional standard; Google ignores it).
const b = BUSINESS
const llms = `# ${b.name}

> Custom furniture maker with its own factory in Kondhwa, Pune (India) and a showroom at Unitas Fashion Centre, Kondhwa. Sofas, recliners, beds, wardrobes, modular kitchens, TV units, false ceilings, dining tables and office furniture, made to measure. Materials and finishes are written into each quotation.

- Showroom: ${b.showroom.oneLine}
- Factory: ${b.factory.oneLine}
- Phone / WhatsApp: ${b.phones.map((p) => p.tel).join(', ')}
- Email: ${b.email}
- Also known as: ${b.altName}

## Main pages
- [Furniture collections](${SITE_URL}/collections): every range, made to order
- [Custom sofas](${SITE_URL}/collections/sofas)
- [Recliners](${SITE_URL}/collections/recliners)
- [Storage beds](${SITE_URL}/collections/beds)
- [Wardrobes](${SITE_URL}/collections/wardrobes)
- [Modular kitchens](${SITE_URL}/interiors/modular-kitchen)
- [TV units](${SITE_URL}/collections/tv-units)
- [False ceilings](${SITE_URL}/collections/false-ceilings)
- [Home interiors](${SITE_URL}/interiors)
- [About](${SITE_URL}/about), [Reviews](${SITE_URL}/reviews), [FAQs](${SITE_URL}/faq), [Contact and showroom](${SITE_URL}/contact)

## Guides
${POSTS.map((p) => `- [${p.title}](${SITE_URL}${p.path}): ${p.description}`).join('\n')}
`
writeFileSync(join(DIST, 'llms.txt'), llms)

rmSync(resolve('dist-ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${routes.length} routes + 404, ${ogDone.size} share images, sitemap with ${routes.length} URLs, llms.txt`)
