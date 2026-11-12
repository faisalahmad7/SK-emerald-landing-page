"""Browser QA for every route: hydration/console errors, one H1, no horizontal overflow, broken images,
redirects and 404 status. Run against `npm run preview` (Cloudflare Pages emulator) or a deployed URL.

Usage (Python with Playwright, e.g. the claude-seo venv):
  python scripts/qa/route_audit.py http://127.0.0.1:8788 [--widths 375,1360] [--sitemap]
"""
import re
import sys
import json
import urllib.request
from playwright.sync_api import sync_playwright

base = sys.argv[1].rstrip('/') if len(sys.argv) > 1 and sys.argv[1].startswith('http') else 'http://127.0.0.1:8788'
widths = [375, 1360]
if '--widths' in sys.argv:
    widths = [int(w) for w in sys.argv[sys.argv.index('--widths') + 1].split(',')]

sitemap = urllib.request.urlopen(urllib.request.Request(base + '/sitemap.xml', headers={'User-Agent': 'Mozilla/5.0 (route audit)'})).read().decode()
routes = [re.sub(r'^https?://[^/]+', '', u) or '/' for u in re.findall(r'<loc>([^<]+)</loc>', sitemap)]
problems = []

def note(where, msg):
    problems.append(f'{where}: {msg}')

with sync_playwright() as p:
    browser = p.chromium.launch()
    # HTTP-level checks: status codes and redirects (no JS).
    req = browser.new_context().request
    for path, want in [('/this-page-does-not-exist', 404), ('/collections/nope', 404), ('/robots.txt', 200), ('/sitemap.xml', 200), ('/llms.txt', 200)]:
        r = req.get(base + path, max_redirects=0)
        if r.status != want:
            note(path, f'status {r.status}, expected {want}')
    for old, new in [('/interiors/kitchen', '/interiors/modular-kitchen'), ('/collections/office-spaces', '/interiors/office-spaces')]:
        r = req.get(base + old, max_redirects=0)
        if r.status != 301 or not r.headers.get('location', '').endswith(new):
            note(old, f'redirect {r.status} -> {r.headers.get("location")}, expected 301 -> {new}')

    for w in widths:
        ctx = browser.new_context(viewport={'width': w, 'height': 860})
        page = ctx.new_page()
        errors = []
        page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
        page.on('pageerror', lambda e: errors.append(f'PAGEERROR {e}'))
        for path in routes:
            errors.clear()
            resp = page.goto(base + path, wait_until='load')
            if resp.status != 200:
                note(f'{w} {path}', f'status {resp.status}')
            page.wait_for_function('window.__skHydrated === true', timeout=10000)
            height = page.evaluate('document.documentElement.scrollHeight')
            for y in range(0, height, 700):
                page.evaluate(f'window.scrollTo(0, {y})')
                page.wait_for_timeout(30)
            page.wait_for_timeout(300)
            o = page.evaluate('''() => ({
                sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
                h1: document.querySelectorAll('h1').length,
                broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.src.startsWith(location.origin)).map(i => i.src),
                hidden: [...document.querySelectorAll('.rv')].filter(e => getComputedStyle(e).opacity === '0').length,
                title: document.title,
            })''')
            if o['sw'] > o['cw']:
                note(f'{w} {path}', f'horizontal overflow {o["sw"]}>{o["cw"]}')
            if o['h1'] != 1:
                note(f'{w} {path}', f'{o["h1"]} h1 elements')
            if o['broken']:
                note(f'{w} {path}', f'broken local images {o["broken"][:3]}')
            if o['hidden']:
                note(f'{w} {path}', f'{o["hidden"]} reveal elements still hidden after scrolling')
            real = [e for e in errors if 'favicon' not in e]
            if real:
                note(f'{w} {path}', 'console: ' + ' | '.join(e[:160] for e in real[:3]))
        # Client-side navigation: title and canonical must follow the route.
        page.goto(base + '/', wait_until='load')
        page.wait_for_function('window.__skHydrated === true')
        page.locator('a[href="/collections"]:visible').first.click()
        page.wait_for_timeout(400)
        nav = page.evaluate('''() => ({ t: document.title, c: document.querySelector('link[rel=canonical]')?.href,
            ld: document.querySelectorAll('script[type="application/ld+json"]').length })''')
        if '/collections' not in (nav['c'] or '') or 'Collections' not in nav['t'] or nav['ld'] != 1:
            note(f'{w} client-nav', json.dumps(nav))
        ctx.close()
    browser.close()

print(f'Checked {len(routes)} routes at widths {widths}.')
print('\n'.join(problems) if problems else 'No problems found.')
sys.exit(1 if problems else 0)
