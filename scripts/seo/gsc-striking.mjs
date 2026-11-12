#!/usr/bin/env node
// Search Console "striking distance" finder. Input: the Queries.csv or Pages.csv from a GSC Performance export
// (Performance > Export > Download CSV, then unzip). Free; no API key needed.
//   - striking distance: average position 8-20 with real impressions -> refresh/expand that content
//   - CTR gap: position <= 5 but CTR far below normal -> rewrite title and meta description
//
// Usage: node scripts/seo/gsc-striking.mjs Queries.csv [--from 8] [--to 20] [--min-impr 20] [--out docs/seo/research/gsc-YYYY-MM]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const args = process.argv.slice(2)
const arg = (k, d) => { const i = args.indexOf(`--${k}`); return i > -1 ? args[i + 1] : d }
const file = args.find((a) => a.toLowerCase().endsWith('.csv'))
if (!file) { console.error('Give the path to a GSC Queries.csv or Pages.csv'); process.exit(1) }
const from = Number(arg('from', 8)), to = Number(arg('to', 20)), minImpr = Number(arg('min-impr', 20)), out = arg('out')

// Small CSV parser (handles quoted fields with commas and doubled quotes).
function parse(csv) {
  const rows = []; let row = [], cell = '', q = false
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i]
    if (q) { if (c === '"' && csv[i + 1] === '"') { cell += '"'; i++ } else if (c === '"') q = false; else cell += c }
    else if (c === '"') q = true
    else if (c === ',') { row.push(cell); cell = '' }
    else if (c === '\n' || c === '\r') { if (c === '\r' && csv[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = '' }
    else cell += c
  }
  if (cell || row.length) { row.push(cell); rows.push(row) }
  return rows.filter((r) => r.some((x) => x.trim()))
}
const [header, ...data] = parse(readFileSync(file, 'utf8').replace(/^﻿/, ''))
const col = (re) => header.findIndex((h) => re.test(h))
const iKey = 0, iClicks = col(/click/i), iImpr = col(/impression/i), iCtr = col(/ctr/i), iPos = col(/position/i)
if ([iClicks, iImpr, iPos].includes(-1)) { console.error(`Unexpected columns: ${header.join(', ')}`); process.exit(1) }
const num = (s) => Number(String(s).replace(/[%,]/g, '')) || 0
const rows = data.map((r) => ({ key: r[iKey], clicks: num(r[iClicks]), impressions: num(r[iImpr]), ctr: iCtr > -1 ? num(r[iCtr]) : 0, position: num(r[iPos]) }))

// Rough organic CTR by position (industry averages; only used to spot outliers).
const expected = (p) => p <= 1.5 ? 25 : p <= 2.5 ? 15 : p <= 3.5 ? 10 : p <= 5.5 ? 6 : 3
const striking = rows.filter((r) => r.position >= from && r.position <= to && r.impressions >= minImpr).sort((a, b) => b.impressions - a.impressions)
const ctrGap = rows.filter((r) => r.position <= 5.5 && r.impressions >= minImpr && r.ctr < expected(r.position) / 2).sort((a, b) => b.impressions - a.impressions)

const table = (list, note) => list.length ? ['| Query / page | Impr. | Clicks | CTR % | Pos. | Action |', '|---|---|---|---|---|---|', ...list.map((r) => `| ${r.key} | ${r.impressions} | ${r.clicks} | ${r.ctr} | ${r.position.toFixed(1)} | ${note(r)} |`)].join('\n') : '_None._'
const md = [`# Search Console opportunities (${file})`, '',
  `## Striking distance: position ${from}-${to}, ≥ ${minImpr} impressions (${striking.length})`, '',
  table(striking, (r) => r.position <= 12 ? 'Expand the ranking page; add an FAQ answering this query' : 'Add a section or a dedicated post; link to it internally'), '',
  `## CTR gap: top-5 position but CTR under half the norm (${ctrGap.length})`, '',
  table(ctrGap, (r) => `Rewrite title/meta (expected ~${expected(r.position)}%)`), ''].join('\n')
if (out) { mkdirSync(dirname(out), { recursive: true }); writeFileSync(`${out}.md`, md); console.log(`Saved ${out}.md`) }
else console.log(md)
