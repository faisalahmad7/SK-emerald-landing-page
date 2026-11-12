#!/usr/bin/env node
// Readability check for Markdown drafts (a free, offline stand-in for Hemingway Editor).
// Reports Flesch Reading Ease, US grade level, average sentence length, long sentences and passive-voice hints.
// Targets for this site: Reading Ease >= 60, grade <= 8, average sentence <= 18 words.
//
// Usage: node scripts/seo/readability.mjs src/content/blog/*.md
import { readFileSync } from 'node:fs'

const files = process.argv.slice(2)
if (!files.length) { console.error('Give one or more Markdown files'); process.exit(1) }

const syllables = (w) => {
  w = w.toLowerCase().replace(/[^a-z]/g, '')
  if (w.length <= 3) return 1
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '')
  return Math.max(1, (w.match(/[aeiouy]{1,2}/g) || []).length)
}
let failed = false
for (const f of files) {
  const md = readFileSync(f, 'utf8')
    .replace(/^---[\s\S]*?---/, '')             // front matter
    .replace(/```[\s\S]*?```/g, ' ')            // code
    .replace(/^\s*[|#>].*$/gm, ' ')             // tables, headings, quotes
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')  // links/images -> text
    .replace(/[*_`]/g, '')
  const sentences = md.split(/(?<=[.!?])\s+|\n\s*[-*]\s+|\n{2,}/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length >= 3)
  const words = sentences.flatMap((s) => s.split(/\s+/).filter((w) => /[a-z]/i.test(w)))
  if (!words.length) { console.log(`${f}: no prose found`); continue }
  const syl = words.reduce((n, w) => n + syllables(w), 0)
  const wps = words.length / sentences.length, spw = syl / words.length
  const ease = 206.835 - 1.015 * wps - 84.6 * spw
  const grade = 0.39 * wps + 11.8 * spw - 15.59
  const long = sentences.filter((s) => s.split(/\s+/).length > 25)
  const passive = sentences.filter((s) => /\b(is|are|was|were|be|been|being)\s+\w+ed\b/i.test(s))
  const ok = ease >= 60 && grade <= 8 && wps <= 18
  if (!ok) failed = true
  console.log(`${ok ? 'PASS' : 'FIX '} ${f}: ${words.length} words · reading ease ${ease.toFixed(0)} · grade ${grade.toFixed(1)} · ${wps.toFixed(1)} words/sentence · ${long.length} long sentences · ${passive.length} passive hints`)
  long.slice(0, 5).forEach((s) => console.log(`     long: ${s.slice(0, 120)}${s.length > 120 ? '…' : ''}`))
}
process.exitCode = failed ? 1 : 0
