#!/usr/bin/env node
// On-page audit of the RAW HTML, i.e. what crawlers that don't run JavaScript (AI bots, link previews) see.
// A small, free stand-in for Screaming Frog on a site of this size.
//
// Usage: node scripts/seo/onpage-audit.mjs --dir dist                                 (built files, before deploy)
//        node scripts/seo/onpage-audit.mjs --sitemap https://sk-emeraldinterior.in/sitemap.xml
//        node scripts/seo/onpage-audit.mjs --base https://sk-emeraldinterior.in --paths /,/collections/sofas
//        [--out docs/seo/research/onpage]   exit code 1 when any error-level issue is found
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d }
const SITE = arg('site', 'https://sk-emeraldinterior.in')
const out = arg('out')

async function load() {
  if (arg('dir')) {
    const root = arg('dir'), pages = []
    const walk = (d) => readdirSync(d).forEach((f) => {
      const p = join(d, f)
      if (statSync(p).isDirectory()) return walk(p)
      if (!f.endsWith('.html') || f === '404.html') return
      const rel = relative(root, p).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '')
      pages.push({ path: '/' + rel.replace(/\/$/, ''), status: 200, html: readFileSync(p, 'utf8') })
    })
    walk(root)
    return pages.map((p) => ({ ...p, path: p.path === '/' ? '/' : p.path.replace(/\/$/, '') }))
  }
  let urls = []
  if (arg('sitemap')) urls = [...(await (await fetch(arg('sitemap'))).text()).matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])
  if (arg('paths')) urls = urls.concat(arg('paths').split(',').map((p) => arg('base', SITE).replace(/\/$/, '') + p.trim()))
  const pages = []
  for (const u of urls) {
    const res = await fetch(u, { redirect: 'manual', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; onpage-audit)' } })
    pages.push({ path: new URL(u).pathname, status: res.status, type: res.headers.get('content-type'), robotsHeader: res.headers.get('x-robots-tag'), html: await res.text() })
    await new Promise((r) => setTimeout(r, 200))
  }
  return pages
}

const one = (html, re) => (html.match(re) || [, ''])[1].trim()
// Honour the quote type, so apostrophes inside double-quoted values ("Interior's") are kept.
const attr = (tag, name) => { const m = tag.match(new RegExp(`${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i')); return m ? (m[1] ?? m[2]).trim() : '' }
const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim()

function audit(p) {
  const h = p.html, issues = []
  const add = (level, msg) => issues.push({ level, msg })
  const head = one(h, /<head[^>]*>([\s\S]*?)<\/head>/i)
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0])
  const meta = (key) => attr(metas.find((m) => new RegExp(`(name|property)\\s*=\\s*["']${key}["']`, 'i').test(m)) || '', 'content')
  const title = strip(one(head, /<title[^>]*>([\s\S]*?)<\/title>/i))
  const desc = meta('description')
  const canonical = attr((head.match(/<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/i) || [''])[0], 'href')
  const robots = meta('robots') + ' ' + (p.robotsHeader || '')
  const body = one(h, /<body[^>]*>([\s\S]*)<\/body>/i).replace(/<(script|style|noscript|template)[\s\S]*?<\/\1>/gi, ' ')
  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1]))
  const imgs = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
  const lds = [...h.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1])
  const words = strip(body).split(' ').filter(Boolean).length
  const links = [...body.matchAll(/<a\b[^>]*href\s*=\s*["']([^"'#]+)["']/gi)].map((m) => m[1]).filter((l) => l.startsWith('/') || l.startsWith(SITE))

  if (p.status !== 200) add('error', `HTTP ${p.status}`)
  if (p.type && !/text\/html/.test(p.type)) add('error', `content-type ${p.type}`)
  if (!title) add('error', 'missing <title>'); else if (title.length > 65) add('warn', `title ${title.length} chars (>65)`)
  if (!desc) add('error', 'missing meta description'); else if (desc.length < 70 || desc.length > 160) add('warn', `meta description ${desc.length} chars (want 70-160)`)
  if (!canonical) add('error', 'missing canonical')
  else if (canonical.replace(/\/$/, '') !== (SITE + p.path).replace(/\/$/, '')) add('warn', `canonical points elsewhere: ${canonical}`)
  if (/noindex/i.test(robots)) add('warn', 'noindex')
  if (h1s.length !== 1) add('error', `${h1s.length} <h1> elements in raw HTML`)
  const noAlt = imgs.filter((i) => !/\balt\s*=/.test(i)).length
  if (noAlt) add('warn', `${noAlt} <img> without alt`)
  const noSize = imgs.filter((i) => !/\bwidth\s*=/.test(i) || !/\bheight\s*=/.test(i)).length
  if (noSize) add('info', `${noSize} <img> without width/height`)
  if (!lds.length) add('warn', 'no JSON-LD')
  lds.forEach((j, i) => { try { JSON.parse(j) } catch { add('error', `JSON-LD block ${i + 1} does not parse`) } })
  if (!meta('og:image')) add('warn', 'no og:image')
  if (words < 150) add('warn', `thin raw HTML: ${words} words`)
  return { path: p.path, status: p.status, title, titleLen: title.length, desc, descLen: desc.length, canonical, h1: h1s[0] || '', h1Count: h1s.length, words, internalLinks: links.length, jsonLd: lds.length, issues }
}

const rows = (await load()).map(audit)
// Site-wide duplicate checks.
for (const key of ['title', 'desc', 'h1']) {
  const groups = {}
  rows.forEach((r) => r[key] && (groups[r[key]] ||= []).push(r.path))
  Object.values(groups).filter((g) => g.length > 1).forEach((g) => g.forEach((path) => rows.find((r) => r.path === path).issues.push({ level: 'error', msg: `duplicate ${key} (shared by ${g.length} pages)` })))
}
const count = (lvl) => rows.reduce((n, r) => n + r.issues.filter((i) => i.level === lvl).length, 0)
const lines = [`# On-page audit (raw HTML)`, ``, `Pages: ${rows.length} · errors: ${count('error')} · warnings: ${count('warn')} · info: ${count('info')}`, ``,
  `| Path | Title (len) | H1 | Words | JSON-LD | Issues |`, `|---|---|---|---|---|---|`,
  ...rows.sort((a, b) => a.path.localeCompare(b.path)).map((r) => { const c = (s) => String(s).replace(/\|/g, '\\|'); return `| ${r.path} | ${c(r.title.slice(0, 50))} (${r.titleLen}) | ${c(r.h1.slice(0, 40))} | ${r.words} | ${r.jsonLd} | ${c(r.issues.filter((i) => i.level !== 'info').map((i) => i.msg).join('; ') || 'OK')} |` })]
if (out) { mkdirSync(dirname(out), { recursive: true }); writeFileSync(`${out}.md`, lines.join('\n') + '\n'); writeFileSync(`${out}.json`, JSON.stringify(rows, null, 2)); console.log(`Saved ${out}.md / .json`) }
console.log(lines.slice(0, 3).join('\n'))
process.exitCode = count('error') ? 1 : 0
