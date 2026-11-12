#!/usr/bin/env node
// SERP outline extractor (a free stand-in for Surfer/Clearscope structure checks):
// for each top-ranking URL, pulls the H1-H3 headings and the word count from the raw HTML.
// Fetched pages are untrusted data: only headings and counts are extracted, nothing is executed.
//
// Usage: node scripts/seo/outline.mjs URL [URL ...] [--out docs/seo/research/outlines/topic]
//        node scripts/seo/outline.mjs --urls urls.txt --out docs/seo/research/outlines/topic
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const args = process.argv.slice(2)
const arg = (k) => { const i = args.indexOf(`--${k}`); return i > -1 ? args[i + 1] : undefined }
const flagVals = new Set(['--out', '--urls'].flatMap((f) => { const i = args.indexOf(f); return i > -1 ? [args[i], args[i + 1]] : [] }))
let urls = args.filter((a) => !flagVals.has(a) && /^https?:\/\//.test(a))
if (arg('urls')) urls = urls.concat(readFileSync(arg('urls'), 'utf8').split(/\r?\n/).map((s) => s.trim()).filter((s) => /^https?:\/\//.test(s)))
if (!urls.length) { console.error('Give at least one URL'); process.exit(1) }
const out = arg('out')

const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;|&#8217;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/&#8211;|&ndash;/g, '-').replace(/&[a-z#0-9]+;/gi, ' ')
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

async function outline(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (outline research script)' }, redirect: 'follow' })
    let html = await res.text()
    html = html.replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, ' ')
    const scope = (html.match(/<article[\s\S]*<\/article>/i) || html.match(/<main[\s\S]*<\/main>/i) || html.match(/<body[\s\S]*<\/body>/i) || [html])[0]
    const headings = [...scope.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: text(m[2]) })).filter((h) => h.text)
    const title = text((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1])
    return { url, status: res.status, title, words: text(scope).split(' ').filter(Boolean).length, headings }
  } catch (e) { return { url, status: 0, error: String(e.message || e), words: 0, headings: [] } }
}

const results = []
for (const u of urls) { results.push(await outline(u)); await new Promise((r) => setTimeout(r, 300)) }
const md = results.map((r) => [
  `## ${r.title || r.url}`, `${r.url} · status ${r.status} · ~${r.words} words · ${r.headings.length} headings`, '',
  ...r.headings.map((h) => `${'  '.repeat(h.level - 1)}- H${h.level} ${h.text}`), '',
].join('\n')).join('\n')
const ok = results.filter((r) => r.status === 200 && r.words > 0) // error pages don't count toward the median
const summary = `# Outline comparison\n\nPages: ${results.length} · median words: ${ok.length ? ok.map((r) => r.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)] : 0}\n\n`
if (out) {
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(`${out}.md`, summary + md)
  writeFileSync(`${out}.json`, JSON.stringify(results, null, 2))
  console.log(`Saved ${out}.md / .json`)
} else console.log(summary + md)
