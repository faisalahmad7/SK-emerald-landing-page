import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { marked } from 'marked'

const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const plain = (md) => md.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`>#|]/g, '').replace(/\s+/g, ' ').trim()

// Blog posts: `src/content/blog/<slug>.md` with JSON front matter between --- lines.
//   import x from './post.md?meta' -> front matter + word count (small; bundled for lists)
//   import x from './post.md'      -> the same plus `html` (rendered at build time) and `faqs` (for FAQPage schema)
function blogMarkdown() {
  return {
    name: 'blog-markdown',
    enforce: 'pre',
    transform(src, id) {
      const [file, query = ''] = id.split('?')
      if (!file.endsWith('.md')) return
      const m = src.replace(/\r\n/g, '\n').match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
      if (!m) this.error(`${file}: missing JSON front matter`)
      let meta
      try { meta = JSON.parse(m[1]) } catch (e) { this.error(`${file}: front matter is not valid JSON (${e.message})`) }
      const body = m[2]
      const words = body.split(/\s+/).filter(Boolean).length
      Object.assign(meta, { words, readingMinutes: Math.max(1, Math.round(words / 200)) })
      if (query.includes('meta')) return { code: `export default ${JSON.stringify(meta)}`, map: null }
      // FAQ pairs from the "## Frequently asked questions" section (### question + answer text).
      const faqs = []
      const faqPart = body.split(/^## +Frequently asked questions\s*$/im)[1]
      if (faqPart) {
        for (const block of faqPart.split(/^### +/m).slice(1)) {
          const [q, ...rest] = block.split('\n')
          const a = plain(rest.join(' ').split(/^## /m)[0])
          if (q.trim() && a) faqs.push([q.trim(), a])
        }
      }
      let html = marked.parse(body, { gfm: true })
      html = html
        .replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, l, t) => `<h${l} id="${slugify(t)}">${t}</h${l}>`)
        .replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>')
        .replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" rel="noopener" target="_blank"')
        .replace(/<img /g, '<img loading="lazy" decoding="async" ')
      // Structure for styling: the "What to ask for in your quotation" section becomes a checklist card, and each FAQ
      // question + answer becomes its own group. Both run to the next <h2> (or the end of the post).
      const section = (id, wrap) => {
        html = html.replace(new RegExp(`(<h2 id="${id}">[\\s\\S]*?<\\/h2>)([\\s\\S]*?)(?=<h2 |$)`), (_, h, body) => wrap(h, body))
      }
      // The checklist card holds the heading, its intro and the first list only; any closing paragraphs stay outside.
      html = html.replace(/(<h2 id="what-to-ask-for-in-your-quotation">[\s\S]*?<\/h2>)((?:\s*<p>[\s\S]*?<\/p>)*?\s*)<ul>([\s\S]*?<\/ul>)/,
        (_, h, intro, list) => `<section class="post-checklist" aria-labelledby="what-to-ask-for-in-your-quotation">${h}${intro}<ul class="checklist">${list}</section>`)
      section('frequently-asked-questions', (h, body) => {
        const parts = body.split(/(?=<h3 )/)
        const intro = parts[0].startsWith('<h3') ? '' : parts.shift()
        return `<section class="post-faq" aria-labelledby="frequently-asked-questions">${h}${intro}${parts.map((p) => `<div class="faq-item">${p.trim()}</div>`).join('')}</section>`
      })
      // Table of contents from the H2s (id + text without tags), rendered beside the article.
      const toc = [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map(([, id, t]) => [id, t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"')])
      return { code: `export default ${JSON.stringify({ ...meta, html, faqs, toc })}`, map: null }
    },
  }
}

// base '/' is required: nested routes such as /collections/sofas load assets from the site root.
export default defineConfig({
  base: '/',
  plugins: [blogMarkdown(), react()],
  ssr: { noExternal: ['gsap'] },
})
