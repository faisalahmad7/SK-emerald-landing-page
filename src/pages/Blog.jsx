import { useEffect, useState } from 'react'
import { Link, useRouter } from '../router'
import { Photo, Seo, PageHead, Enquire } from '../components/ui'
import { POSTS, postBySlug, cachedPost, loadPost } from '../content/posts'
import { bySlug } from '../data/collections'
import { roomBySlug } from '../data/rooms'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// Formatted by hand (not toLocaleDateString) so the build and the browser always print the same text.
export const fmtDate = (d) => { const [y, m, day] = d.split('-').map(Number); return `${day} ${MONTHS[m - 1]} ${y}` }
// "/images/2.webp" -> 2, "/images/sofa-olive.webp" -> "sofa-olive" (ids in src/data/images.js)
export const imageId = (path) => { const id = path?.match(/\/images\/(.+)\.webp$/)?.[1]; return id && /^\d+$/.test(id) ? Number(id) : id }
const catId = (c) => `cat-${c.toLowerCase().replace(/[^a-z]+/g, '-')}`
const logo = `${import.meta.env.BASE_URL}images/logo-160.webp`
const PAGE_NAMES = { '/materials': 'Materials and care', '/faq': 'FAQs', '/contact': 'Contact and showroom', '/about': 'About us', '/reviews': 'Reviews', '/interiors': 'Interiors', '/collections': 'All collections' }
function linkName(path) {
  const [, section, slug] = path.split('/')
  if (section === 'collections' && slug) return bySlug(slug)?.name
  if (section === 'interiors' && slug) return roomBySlug(slug)?.name
  if (section === 'blog' && slug) return postBySlug(slug)?.title
  return PAGE_NAMES[path]
}

// A guide as a card: photo, category, title, reading time. Used on the guides page and under each guide.
export function GuideCard({ post, headingLevel: H = 'h3' }) {
  return (
    <li className="guide-card">
      <Link to={post.path}>
        <Photo id={imageId(post.image)} ratio="3/2" alt="" />
        <span className="guide-card-body">
          <span className="guide-card-cat">{post.category}</span>
          <H className="guide-card-title">{post.title}</H>
          <span className="guide-card-meta">{post.readingMinutes} min read</span>
        </span>
      </Link>
    </li>
  )
}

export function Blog() {
  const [featured, ...rest] = POSTS
  const categories = [...new Set(rest.map((p) => p.category))]
  return (
    <>
      <Seo path="/blog" title="Furniture Guides for Pune Homes | SK Emerald Interior" name="Guides" type="CollectionPage" image={13}
        description="Plain-language guides to sofas, recliners, kitchens, plywood, laminates and false ceilings, written by a furniture maker in Kondhwa, Pune."
        items={POSTS.map((p) => [p.title, p.description])} itemsName="Guides" />
      <PageHead crumbs={[['Home', '/'], ['Guides']]} title="Furniture guides for Pune homes"
        lead="Straight answers about materials, sizes and choices, from the people who make the furniture. Read these before you compare quotations." />
      {featured && (
        <section className="wrap blog-featured" aria-label="Latest guide">
          <Link to={featured.path} className="blog-featured-link">
            <Photo id={imageId(featured.image)} ratio="4/3" eager alt="" />
            <span className="blog-featured-text">
              <span className="guide-card-cat">{featured.category}</span>
              <h2>{featured.title}</h2>
              <span className="blog-featured-dek">{featured.description}</span>
              <span className="guide-card-meta">Updated {fmtDate(featured.updated || featured.date)}, {featured.readingMinutes} min read</span>
              <span className="blog-featured-cta">Read the guide <span aria-hidden="true">↗</span></span>
            </span>
          </Link>
        </section>
      )}
      {categories.map((cat) => (
        <section className="wrap guide-section" key={cat} id={catId(cat)} aria-labelledby={`${catId(cat)}-h`}>
          <h2 id={`${catId(cat)}-h`}>{cat}</h2>
          <ul className="guide-grid">{rest.filter((p) => p.category === cat).map((p) => <GuideCard key={p.slug} post={p} />)}</ul>
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
  const [active, setActive] = useState(null)
  useEffect(() => {
    let live = true
    if (!cachedPost(slug)) loadPost(slug).then((p) => live && setPost(p))
    else setPost(cachedPost(slug))
    return () => { live = false }
  }, [slug])
  const current = post && post.title === meta.title ? post : null
  const toc = current?.toc || []
  // Highlight the section being read in the contents list.
  useEffect(() => {
    if (!toc.length || !('IntersectionObserver' in window)) return
    const heads = toc.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      const seen = entries.filter((e) => e.isIntersecting).map((e) => e.target.id)
      if (seen.length) setActive(seen[0])
    }, { rootMargin: '-90px 0px -65% 0px' })
    heads.forEach((h) => io.observe(h))
    return () => io.disconnect()
  }, [current])
  // Internal links inside the article navigate without a full page load.
  const onBodyClick = (e) => {
    const a = e.target.closest('a')
    const href = a?.getAttribute('href')
    if (!href || !href.startsWith('/') || a.target || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault(); go(href)
  }
  const related = (meta.related || []).map((p) => [p, linkName(p)]).filter(([p, n]) => n && !isPostPath(p))
  const more = POSTS.filter((p) => p.slug !== slug).sort((a, b) => (b.category === meta.category) - (a.category === meta.category)).slice(0, 3)
  const tocList = (
    <ol>{toc.map(([id, t]) => <li key={id}><a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{t}</a></li>)}</ol>
  )
  return (
    <>
      <Seo path={meta.path} title={meta.seoTitle || meta.title} name={meta.title} description={meta.description} image={imageId(meta.image)}
        faqs={current?.faqs} article={{ datePublished: meta.date, dateModified: meta.updated || meta.date, section: meta.category, words: meta.words }} />
      <article className="article">
        <div className="wrap article-wrap">
          <header className="article-head">
            <nav aria-label="Breadcrumb" className="crumbs"><ol>
              <li><Link to="/">Home</Link></li><li><Link to="/blog">Guides</Link></li><li><span aria-current="page">{meta.title}</span></li>
            </ol></nav>
            <Link className="article-cat" to={`/blog#${catId(meta.category)}`}>{meta.category}</Link>
            <h1>{meta.title}</h1>
            <p className="article-dek">{meta.description}</p>
            <div className="article-byline">
              <img src={logo} alt="" width="44" height="44" />
              <span className="article-byline-who"><b>SK Emerald Interior team</b><span>Furniture makers in Kondhwa, Pune</span></span>
              <span className="article-byline-when">Updated <time dateTime={meta.updated || meta.date}>{fmtDate(meta.updated || meta.date)}</time><br />{meta.readingMinutes} min read</span>
            </div>
          </header>
          <div className="article-hero"><Photo id={imageId(meta.image)} ratio="16/9" eager alt={meta.imageAlt} sizes="(min-width: 1100px) 1080px, 100vw" /></div>
          <div className="article-grid">
            {toc.length > 0 && <nav className="article-toc" aria-label="In this guide"><p>In this guide</p>{tocList}</nav>}
            <div className="article-main">
              {toc.length > 0 && <details className="article-toc-mobile"><summary>In this guide</summary>{tocList}</details>}
              {current
                ? <div className="post-body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: current.html }} />
                : <div className="post-body"><p>Loading the guide…</p></div>}
              <aside className="article-author" aria-label="About the authors">
                <img src={logo} alt="" width="56" height="56" />
                <div>
                  <p className="article-author-name">Written by the SK Emerald Interior team</p>
                  <p>We make sofas, beds, wardrobes and kitchens to measure at our factory in Kondhwa, Pune, and explain the materials before anyone orders. Read more <Link to="/about">about us</Link> or see what <Link to="/reviews">our customers say</Link>.</p>
                </div>
              </aside>
              {related.length > 0 && (
                <aside className="article-related" aria-labelledby="related-heading">
                  <h2 id="related-heading">Related pages</h2>
                  <ul>{related.map(([p, n]) => <li key={p}><Link to={p}>{n}</Link></li>)}</ul>
                </aside>
              )}
            </div>
          </div>
        </div>
        {more.length > 0 && (
          <section className="wrap article-wrap article-more" aria-labelledby="more-heading">
            <h2 id="more-heading">More guides</h2>
            <ul className="guide-grid">{more.map((p) => <GuideCard key={p.slug} post={p} />)}</ul>
          </section>
        )}
      </article>
      <Enquire title="Planning something similar?" text="Send a photo of your room and rough measurements on WhatsApp. We will suggest what to make and explain the materials."
        message={`Hello SK Emerald Interior, I read your guide "${meta.title}" and would like advice for my home.`} />
    </>
  )
}

// Related links that point to other guides are already shown as cards under "More guides".
function isPostPath(path) { return path.startsWith('/blog/') }
