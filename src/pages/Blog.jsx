import { useEffect, useState } from 'react'
import { Link, useRouter } from '../router'
import { Photo, Seo, PageHead, Enquire } from '../components/ui'
import { POSTS, postBySlug, cachedPost, loadPost } from '../content/posts'
import { bySlug } from '../data/collections'
import { roomBySlug } from '../data/rooms'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// Formatted by hand (not toLocaleDateString) so the build and the browser always print the same text.
const fmt = (d) => { const [y, m, day] = d.split('-').map(Number); return `${day} ${MONTHS[m - 1]} ${y}` }
// "/images/2.webp" -> 2, "/images/sofa-olive.webp" -> "sofa-olive" (ids in src/data/images.js)
const imageId = (path) => { const id = path?.match(/\/images\/(.+)\.webp$/)?.[1]; return id && /^\d+$/.test(id) ? Number(id) : id }
const PAGE_NAMES = { '/materials': 'Materials and care', '/faq': 'FAQs', '/contact': 'Contact and showroom', '/about': 'About us', '/reviews': 'Reviews', '/interiors': 'Interiors', '/collections': 'All collections' }
function linkName(path) {
  const [, section, slug] = path.split('/')
  if (section === 'collections' && slug) return bySlug(slug)?.name
  if (section === 'interiors' && slug) return roomBySlug(slug)?.name
  if (section === 'blog' && slug) return postBySlug(slug)?.title
  return PAGE_NAMES[path]
}

export function Blog() {
  const categories = [...new Set(POSTS.map((p) => p.category))]
  return (
    <>
      <Seo path="/blog" title="Furniture Guides for Pune Homes | SK Emerald Interior" name="Guides" type="CollectionPage" image={13}
        description="Plain-language guides to sofas, recliners, kitchens, plywood, laminates and false ceilings, written by a furniture maker in Kondhwa, Pune."
        items={POSTS.map((p) => [p.title, p.description])} itemsName="Guides" />
      <PageHead crumbs={[['Home', '/'], ['Guides']]} title="Furniture guides for Pune homes"
        lead="Straight answers about materials, sizes and choices, from the people who make the furniture. Read these before you compare quotations." />
      {categories.map((cat) => (
        <section className="wrap guide-section" key={cat} aria-labelledby={`cat-${cat}`}>
          <h2 id={`cat-${cat}`}>{cat}</h2>
          <ul className="guide-cards">
            {POSTS.filter((p) => p.category === cat).map((p) => (
              <li key={p.slug}>
                <Link to={p.path}>
                  <Photo id={imageId(p.image)} ratio="16/10" alt="" />
                  <b>{p.title}</b>
                  <span className="guide-desc">{p.description}</span>
                  <span className="muted">{p.readingMinutes} min read · Updated {fmt(p.updated || p.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <Enquire title="Have a question we have not answered?" message="Hello SK Emerald Interior, I have a question about furniture for my home." />
    </>
  )
}

export function BlogPost({ slug }) {
  const meta = postBySlug(slug)
  const { go } = useRouter()
  const [post, setPost] = useState(() => cachedPost(slug))
  useEffect(() => {
    let live = true
    if (!cachedPost(slug)) loadPost(slug).then((p) => live && setPost(p))
    else setPost(cachedPost(slug))
    return () => { live = false }
  }, [slug])
  const current = post && post.title === meta.title ? post : null
  // Internal links inside the article navigate without a full page load.
  const onBodyClick = (e) => {
    const a = e.target.closest('a')
    const href = a?.getAttribute('href')
    if (!href || !href.startsWith('/') || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault(); go(href)
  }
  const related = (meta.related || []).map((p) => [p, linkName(p)]).filter(([, n]) => n)
  return (
    <>
      <Seo path={meta.path} title={meta.seoTitle || meta.title} name={meta.title} description={meta.description} image={imageId(meta.image)}
        faqs={current?.faqs} article={{ datePublished: meta.date, dateModified: meta.updated || meta.date, section: meta.category, words: meta.words }} />
      <article className="post">
        <header className="pagehead wrap post-head">
          <nav aria-label="Breadcrumb" className="crumbs"><ol>
            <li><Link to="/">Home</Link></li><li><Link to="/blog">Guides</Link></li><li><span aria-current="page">{meta.title}</span></li>
          </ol></nav>
          <p className="editorial-eyebrow"><span /> {meta.category}</p>
          <h1>{meta.title}</h1>
          <p className="post-meta">By the SK Emerald Interior team, Kondhwa, Pune · Updated <time dateTime={meta.updated || meta.date}>{fmt(meta.updated || meta.date)}</time> · {meta.readingMinutes} min read</p>
        </header>
        <div className="wrap post-hero"><Photo id={imageId(meta.image)} ratio="16/9" eager alt={meta.imageAlt} sizes="(min-width: 900px) 900px, 100vw" /></div>
        {current
          ? <div className="wrap prose post-body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: current.html }} />
          : <div className="wrap prose post-body"><p className="muted">Loading the guide…</p></div>}
        {related.length > 0 && (
          <aside className="wrap post-related" aria-labelledby="related-heading">
            <h2 id="related-heading">Related</h2>
            <ul>{related.map(([p, n]) => <li key={p}><Link to={p}>{n}</Link></li>)}</ul>
          </aside>
        )}
      </article>
      <Enquire title="Planning something similar?" text="Send a photo of your room and rough measurements on WhatsApp. We will suggest what to make and explain the materials."
        message={`Hello SK Emerald Interior, I read your guide "${meta.title}" and would like advice for my home.`} />
    </>
  )
}
