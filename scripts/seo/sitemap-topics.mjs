#!/usr/bin/env node
// Competitor content map from public XML sitemaps: robots.txt -> sitemap index -> page URLs, filtered by topic words.
// Sitemaps are published for crawlers, so reading them is polite; still capped (default 40 sitemap files, 300 ms apart).
//
// Usage: node scripts/seo/sitemap-topics.mjs --site https://www.example.com --include sofa,wardrobe,kitchen
//        [--prefer blog,post] [--max-files 40] [--out docs/seo/research/sitemaps/example]
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { gunzipSync } from 'node:zlib'

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d }
const site = arg('site')?.replace(/\/$/, '')
if (!site) { console.error('Missing --site'); process.exit(1) }
const include = (arg('include', '') || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
const prefer = (arg('prefer', '') || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
const maxFiles = Number(arg('max-files', 40))
const out = arg('out', `docs/seo/research/sitemaps/${new URL(site).hostname.replace(/^www\./, '')}`)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const UA = { 'User-Agent': 'Mozilla/5.0 (sitemap research script)' }

async function get(url) {
  try {
    const res = await fetch(url, { headers: UA, redirect: 'follow' })
    if (!res.ok) return ''
    const buf = Buffer.from(await res.arrayBuffer())
    return (url.endsWith('.gz') || buf[0] === 0x1f) ? gunzipSync(buf).toString('utf8') : buf.toString('utf8')
  } catch { return '' }
}
const locs = (xml, tag) => [...xml.matchAll(new RegExp(`<${tag}>[\\s\\S]*?<loc>\\s*([^<\\s]+)\\s*</loc>`, 'g'))].map((m) => m[1].replace(/&amp;/g, '&'))

// 1. Find sitemap entry points.
const robots = await get(`${site}/robots.txt`)
let queue = [...robots.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1])
if (!queue.length) queue = [`${site}/sitemap.xml`, `${site}/sitemap_index.xml`]
const score = (u) => prefer.some((p) => u.toLowerCase().includes(p)) ? 0 : 1 // preferred child sitemaps first

// 2. Walk sitemap indexes breadth-first, collecting page URLs.
const seen = new Set(), pages = new Set()
let files = 0
while (queue.length && files < maxFiles) {
  const url = queue.shift()
  if (seen.has(url)) continue
  seen.add(url); files++
  const xml = await get(url)
  const children = locs(xml, 'sitemap')
  queue.push(...children); queue.sort((a, b) => score(a) - score(b))
  locs(xml, 'url').forEach((u) => pages.add(u))
  await sleep(300)
}

// 3. Filter and group by topic word (matched against the URL path).
const groups = {}
for (const u of pages) {
  let path; try { path = decodeURIComponent(new URL(u).pathname.toLowerCase()) } catch { continue }
  const hit = include.length ? include.filter((w) => path.includes(w)) : ['all']
  for (const w of hit) (groups[w] ||= []).push(path)
}
for (const w in groups) groups[w].sort()
mkdirSync(dirname(out), { recursive: true })
writeFileSync(`${out}.json`, JSON.stringify({ site, generated: new Date().toISOString(), sitemapFiles: files, pages: pages.size, groups }, null, 2))
const summary = Object.entries(groups).sort((a, b) => b[1].length - a[1].length).map(([w, l]) => `${w}: ${l.length}`).join(', ')
console.log(`${site}: ${files} sitemap files, ${pages.size} URLs. Matches -> ${summary || 'none'}. Saved ${out}.json`)
