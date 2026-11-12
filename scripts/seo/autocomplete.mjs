#!/usr/bin/env node
// Google Autocomplete keyword miner. Free public suggest endpoint, no key.
// It is unofficial and rate-limited, so it stays polite: one request every 400 ms, retries with back-off.
// Autocomplete shows that people search a phrase, not how many do. Validate volumes in Keyword Planner / Search Console.
//
// Usage: node scripts/seo/autocomplete.mjs [--config scripts/seo/seeds.json] [--out docs/seo/research/autocomplete] [--delay 400]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d }
const cfg = JSON.parse(readFileSync(arg('config', 'scripts/seo/seeds.json'), 'utf8'))
const out = arg('out', 'docs/seo/research/autocomplete')
const delay = Number(arg('delay', 400))
const { hl = 'en', gl = 'in', products = [], places = [], placeFirst = [], questions = [], questionProducts = [], alphabet = [], extra = [] } = cfg

// Build the query list: product x place, place x product, question x product, seed + a..z, and any extra phrases.
const queries = new Set(extra)
for (const p of products) for (const l of places) queries.add(`${p} ${l}`)
for (const l of placeFirst) for (const p of products) queries.add(`${l} ${p}`)
for (const q of questions) for (const p of questionProducts) queries.add(`${q} ${p}`)
for (const s of alphabet) for (const c of 'abcdefghijklmnopqrstuvwxyz') queries.add(`${s} ${c}`)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function suggest(q) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&gl=${gl}&ie=utf-8&oe=utf-8&q=${encodeURIComponent(q)}`
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (keyword research script)' } })
      if (res.ok) return (await res.json())[1] || []
    } catch { /* network blip: retry */ }
    await sleep(2000 * (attempt + 1))
  }
  console.error(`no answer for "${q}"`)
  return []
}

const found = new Map() // suggestion -> set of seed queries that returned it
let n = 0
for (const q of queries) {
  for (const s of await suggest(q)) {
    const k = s.toLowerCase().replace(/\s+/g, ' ').trim()
    if (!found.has(k)) found.set(k, new Set())
    found.get(k).add(q)
  }
  if (++n % 25 === 0) console.error(`${n}/${queries.size} queries, ${found.size} unique suggestions`)
  await sleep(delay)
}

// hits = how many different seed queries surfaced the phrase: a rough popularity signal, not a volume.
const rows = [...found]
  .map(([keyword, seeds]) => ({ keyword, hits: seeds.size, seeds: [...seeds] }))
  .sort((a, b) => b.hits - a.hits || a.keyword.localeCompare(b.keyword))
mkdirSync(dirname(out), { recursive: true })
writeFileSync(`${out}.json`, JSON.stringify({ generated: new Date().toISOString(), hl, gl, queries: queries.size, rows }, null, 2))
writeFileSync(`${out}.csv`, 'keyword,hits,seeds\n' + rows.map((r) => `"${r.keyword}",${r.hits},"${r.seeds.join(' | ')}"`).join('\n') + '\n')
console.log(`${queries.size} queries -> ${rows.length} unique suggestions -> ${out}.json / .csv`)
