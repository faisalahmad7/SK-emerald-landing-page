// Blog posts: Markdown files in ./blog, turned into HTML at build time by the blog-markdown plugin (vite.config.js).
// Post metadata is bundled (small); each post's HTML is its own chunk, loaded on demand.
// Drafts live in src/content/drafts/ and are not built.
const metas = import.meta.glob('./blog/*.md', { eager: true, query: '?meta', import: 'default' })
const loaders = import.meta.glob('./blog/*.md', { import: 'default' })
const slugOf = (file) => file.match(/([^/]+)\.md$/)[1]

export const POSTS = Object.entries(metas)
  .map(([file, meta]) => ({ ...meta, slug: slugOf(file), path: `/blog/${slugOf(file)}` }))
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))

export const postBySlug = (slug) => POSTS.find((p) => p.slug === slug)

const cache = {}
export const cachedPost = (slug) => cache[slug]
export async function loadPost(slug) {
  if (cache[slug]) return cache[slug]
  const load = loaders[`./blog/${slug}.md`]
  if (!load) return null
  cache[slug] = await load()
  return cache[slug]
}
export const preloadAllPosts = () => Promise.all(POSTS.map((p) => loadPost(p.slug)))
