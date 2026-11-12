#!/usr/bin/env node
// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver; Bing feeds ChatGPT search and Copilot) that the site's
// pages changed. Runs after `npm run deploy`. The key file public/<key>.txt proves we own the domain.
// Usage: node scripts/seo/indexnow.mjs [--site https://sk-emeraldinterior.in] [--urls /a,/b]   (default: every URL in the live sitemap)
import { readdirSync, readFileSync } from 'node:fs'

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d }
const site = arg('site', 'https://sk-emeraldinterior.in').replace(/\/$/, '')
const keyFile = readdirSync('public').find((f) => /^[a-f0-9]{32}\.txt$/.test(f))
if (!keyFile) { console.error('No IndexNow key file (public/<32 hex>.txt)'); process.exit(1) }
const key = readFileSync(`public/${keyFile}`, 'utf8').trim()

let urls = arg('urls') ? arg('urls').split(',').map((p) => site + p.trim()) : null
if (!urls) {
  const xml = await (await fetch(`${site}/sitemap.xml`)).text()
  urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList: urls }),
})
console.log(`IndexNow: submitted ${urls.length} URLs → HTTP ${res.status} ${res.status === 200 || res.status === 202 ? '(accepted)' : await res.text()}`)
