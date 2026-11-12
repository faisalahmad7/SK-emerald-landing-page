#!/usr/bin/env node
// Builds the hub-and-spoke cluster plan from scripts/seo/clusters.json + research/autocomplete.json.
// Outputs: research/cluster-plan.json, research/cluster-plan.md, research/keywords-to-validate.csv,
//          research/cluster-map.html (if the seo-cluster skill template is installed).
// Evidence = Autocomplete phrases matched to each page. Autocomplete proves a phrase is searched, not its volume.
//
// Usage: node scripts/seo/cluster-plan.mjs [--clusters scripts/seo/clusters.json] [--autocomplete docs/seo/research/autocomplete.json] [--dir docs/seo/research]
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d }
const cfg = JSON.parse(readFileSync(arg('clusters', 'scripts/seo/clusters.json'), 'utf8'))
const ac = JSON.parse(readFileSync(arg('autocomplete', 'docs/seo/research/autocomplete.json'), 'utf8'))
const dir = arg('dir', 'docs/seo/research')
const re = (s) => new RegExp(s, 'i')
const exclude = re(cfg.exclude), rivals = re(cfg.competitorNames)

// Pages in priority order: specific posts first, then hubs, then the pillar, so a phrase lands on the most specific page.
const pages = []
cfg.clusters.forEach((c, ci) => c.posts.forEach((p, pi) => pages.push({ ...p, id: `cluster-${ci}-post-${pi + 1}`, cluster: c.name, role: p.url.startsWith('/blog') ? 'spoke' : 'money' })))
cfg.clusters.forEach((c, ci) => pages.push({ ...c.hub, id: `cluster-${ci}-post-0`, cluster: c.name, role: 'hub' }))
pages.push({ ...cfg.pillar, id: 'pillar', cluster: '(pillar)', role: 'pillar' })
pages.forEach((p) => { p.matcher = re(p.evidence); p.found = [] })

const competitorPhrases = [], unassigned = []
for (const row of ac.rows) {
  if (rivals.test(row.keyword)) { competitorPhrases.push(row); continue }
  if (exclude.test(row.keyword)) continue
  const page = pages.find((p) => p.matcher.test(row.keyword))
  if (page) page.found.push(row); else unassigned.push(row)
}

// Duplicate primary keywords = cannibalization.
const dupes = Object.entries(pages.reduce((m, p) => ((m[p.keyword] ||= []).push(p.url), m), {})).filter(([, u]) => u.length > 1)

// Link matrix: pillar <-> hubs, hub <-> its pages (mandatory); spokes <-> siblings (recommended).
const links = []
cfg.clusters.forEach((c, ci) => {
  const hub = `cluster-${ci}-post-0`
  links.push({ from: 'pillar', to: hub, type: 'mandatory' }, { from: hub, to: 'pillar', type: 'mandatory' })
  c.posts.forEach((_, pi) => {
    const id = `cluster-${ci}-post-${pi + 1}`
    links.push({ from: hub, to: id, type: 'mandatory' }, { from: id, to: hub, type: 'mandatory' })
    c.posts.forEach((__, pj) => { if (pj !== pi) links.push({ from: id, to: `cluster-${ci}-post-${pj + 1}`, type: 'recommended' }) })
  })
})

const strip = ({ matcher, found, evidence, ...p }) => ({ ...p, evidenceCount: found.length, evidence: found.slice(0, 12).map((r) => r.keyword) })
const plan = {
  generated: new Date().toLocaleDateString('en-CA'), source: `autocomplete (${ac.rows.length} phrases from ${ac.queries} queries, ${new Date(ac.generated).toLocaleDateString('en-CA')})`,
  pillar: strip(pages.find((p) => p.id === 'pillar')),
  clusters: cfg.clusters.map((c, ci) => ({ name: c.name, color: c.color, pages: pages.filter((p) => p.id.startsWith(`cluster-${ci}-`)).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true })).map(strip) })),
  links, cannibalization: dupes, unassigned: unassigned.slice(0, 80).map((r) => r.keyword), competitorPhrases: competitorPhrases.map((r) => r.keyword),
}
writeFileSync(join(dir, 'cluster-plan.json'), JSON.stringify(plan, null, 2))

// Keyword Planner shortlist: each page's primary keyword + its top 4 evidence phrases.
const csv = ['keyword,page,cluster,role,autocomplete_hits']
const seen = new Set()
for (const p of pages) {
  for (const [kw, hits] of [[p.keyword, ''], ...p.found.slice(0, 4).map((r) => [r.keyword, r.hits])]) {
    if (seen.has(kw)) continue
    seen.add(kw); csv.push(`"${kw}",${p.url},"${p.cluster}",${p.role},${hits}`)
  }
}
writeFileSync(join(dir, 'keywords-to-validate.csv'), csv.join('\n') + '\n')

// Human-readable plan.
const esc = (s) => String(s).replace(/\|/g, '\\|')
const row = (p) => `| ${p.role} | [${esc(p.title)}](${p.url}) | ${esc(p.keyword)} | ${p.status} | ${p.template}, ~${p.wordCount} | ${p.found.length} | ${esc(p.found.slice(0, 5).map((r) => r.keyword).join('; ')) || '_none: judgment call_'} |`
const head = '| Role | Page | Primary query | Status | Template, words | Evidence phrases | Top evidence (Google Autocomplete, India) |\n|---|---|---|---|---|---|---|'
const md = [
  '# Topic cluster plan', '',
  `Generated ${plan.generated.slice(0, 10)} by \`scripts/seo/cluster-plan.mjs\` from \`scripts/seo/clusters.json\` and ${plan.source}.`,
  'Status: **live** as is · **rewrite** existing page · **planned** new · **gated** needs owner confirmation first. "Evidence phrases" = Autocomplete suggestions matched to the page (proof of demand, not volume).', '',
  '## Pillar', '', head, row(pages.find((p) => p.id === 'pillar')), '',
  ...cfg.clusters.flatMap((c, ci) => [`## ${ci + 1}. ${c.name}`, '', head, ...pages.filter((p) => p.id.startsWith(`cluster-${ci}-`)).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true })).map(row), '']),
  '## Internal links', '', `${links.filter((l) => l.type === 'mandatory').length} mandatory links (pillar ↔ hubs, hub ↔ each page in its cluster) and ${links.filter((l) => l.type === 'recommended').length} recommended sibling links. Full matrix in \`cluster-plan.json\`. Anchors use the target page's primary query or a close variant.`, '',
  '## Checks', '', dupes.length ? `**Cannibalization:** ${dupes.map(([k, u]) => `"${k}" → ${u.join(', ')}`).join('; ')}` : 'No duplicate primary queries (no cannibalization).', '',
  `## Unassigned phrases (${unassigned.length}): review for new pages`, '', unassigned.slice(0, 60).map((r) => r.keyword).join(' · '), '',
  `## Competitor names seen in Autocomplete (${competitorPhrases.length} phrases): navigational, excluded`, '', [...new Set(competitorPhrases.map((r) => r.keyword))].slice(0, 60).join(' · '), '',
].join('\n')
writeFileSync(join(dir, 'cluster-plan.md'), md)

// Interactive map from the seo-cluster skill template (optional).
const tpl = join(homedir(), '.claude', 'skills', 'seo-cluster', 'templates', 'cluster-map.html')
if (existsSync(tpl)) {
  const node = (p) => ({ title: p.title, keyword: p.keyword, volume: null, template: p.template, wordCount: p.wordCount, url: p.url, status: p.status === 'written' ? 'written' : `${p.status} (${p.found.length} autocomplete phrases)` })
  const data = {
    pillar: node(pages.find((p) => p.id === 'pillar')),
    clusters: cfg.clusters.map((c, ci) => ({ name: c.name, color: c.color, posts: pages.filter((p) => p.id.startsWith(`cluster-${ci}-`)).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true })).map(node) })),
    links, meta: { totalPosts: pages.length, totalClusters: cfg.clusters.length, totalLinks: links.length, estimatedWords: pages.reduce((n, p) => n + p.wordCount, 0) },
  }
  // The template may use Windows line endings; a function replacement avoids "$" in the data being read as a pattern.
  const html = readFileSync(tpl, 'utf8').replace(/const CLUSTER_DATA = \{[\s\S]*?\r?\n\s*\};\r?\n\s*\/\/ === END CLUSTER DATA ===/, () => `const CLUSTER_DATA = ${JSON.stringify(data).replace(/</g, '\\u003c')};\n    // === END CLUSTER DATA ===`)
  if (html.includes('Sample Pillar Page')) throw new Error('cluster-map.html: CLUSTER_DATA placeholder was not replaced')
  writeFileSync(join(dir, 'cluster-map.html'), html)
}
console.log(`Pages: ${pages.length} · phrases assigned: ${pages.reduce((n, p) => n + p.found.length, 0)} · unassigned: ${unassigned.length} · competitor phrases: ${competitorPhrases.length} · cannibalization: ${dupes.length}`)
