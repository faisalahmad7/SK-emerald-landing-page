import { useEffect, useState } from 'react'
import { Link, useRouter } from '../router'
import { Photo, Seo } from '../components/ui'
import { POSTS, postBySlug, cachedPost, loadPost } from '../content/posts'
import { bySlug } from '../data/collections'
import { roomBySlug } from '../data/rooms'
import { img } from '../data/images'
import { waLink } from '../data/business'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// Formatted by hand (not toLocaleDateString) so the build and the browser always print the same text.
export const fmtDate = (d) => { const [y, m, day] = d.split('-').map(Number); return `${day} ${MONTHS[m - 1]} ${y}` }
// "/images/2.webp" -> 2, "/images/sofa-olive.webp" -> "sofa-olive" (ids in src/data/images.js)
export const imageId = (path) => { const id = path?.match(/\/images\/(.+)\.webp$/)?.[1]; return id && /^\d+$/.test(id) ? Number(id) : id }
const logo = `${import.meta.env.BASE_URL}images/logo-160.webp`
const PAGE_NAMES = { '/materials': 'Materials and care', '/faq': 'FAQs', '/contact': 'Contact and showroom', '/about': 'About us', '/reviews': 'Reviews', '/interiors': 'Interiors', '/collections': 'All collections' }
function linkName(path) {
  const [, section, slug] = path.split('/')
  if (section === 'collections' && slug) return bySlug(slug)?.name
  if (section === 'interiors' && slug) return roomBySlug(slug)?.name
  if (section === 'blog' && slug) return postBySlug(slug)?.title
  return PAGE_NAMES[path]
}
const isPostPath = (path) => path.startsWith('/blog/')
// Rooms and ranges linked at the foot of the blogs page.
const EXPLORE = [['/collections/sofas', 'Sofas'], ['/collections/recliners', 'Recliners'], ['/collections/beds', 'Beds'], ['/collections/wardrobes', 'Wardrobes'],
  ['/interiors/modular-kitchen', 'Modular kitchens'], ['/collections/tv-units', 'TV units'], ['/collections/false-ceilings', 'False ceilings'], ['/interiors', 'Whole rooms']]

// A story card: photo, category and date, title, reading time.
export function StoryCard({ post }) {
  return (
    <li className="story-card">
      <Link to={post.path}>
        <Photo id={imageId(post.image)} ratio="4/3" alt="" sizes="(min-width: 1000px) 33vw, (min-width: 680px) 50vw, 100vw" />
        <span className="story-card-body">
          <span className="story-card-meta"><span>{post.category}</span><time dateTime={post.date}>{fmtDate(post.date)}</time></span>
          <h3 className="story-card-title">{post.title}</h3>
          <span className="story-card-dek">{post.description}</span>
          <span className="story-card-read">{post.readingMinutes} min read</span>
        </span>
      </Link>
    </li>
  )
}

export function Blog() {
  const [featured, ...rest] = POSTS
  const categories = [...new Set(POSTS.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? rest : POSTS.filter((p) => p.category === cat)
  const credit = img(imageId(featured?.image))?.credit
  return (
    <>
      <Seo path="/blog" title="Blogs: Furniture Guides for Pune Homes | SK Emerald Interior" name="Blogs" type="CollectionPage" image={imageId(featured?.image)}
        description="Stories and plain-language guides on sofas, recliners, kitchens, plywood, laminates and false ceilings, from a furniture maker in Kondhwa, Pune."
        items={POSTS.map((p) => [p.title, p.description])} itemsName="Blogs" />

      <header className="wrap blog-intro">
        <nav aria-label="Breadcrumb" className="crumbs"><ol><li><Link to="/">Home</Link></li><li><span aria-current="page">Blogs</span></li></ol></nav>
        <div className="blog-intro-row">
          <h1>Blogs</h1>
          <p>Stories, guides and straight answers for Pune homes, written by the people who make the furniture.</p>
        </div>
      </header>

      {featured && (
        <section className="blog-hero" aria-label="Latest story">
          <Link to={featured.path} className="blog-hero-link">
            <Photo id={imageId(featured.image)} ratio="auto" eager alt={featured.imageAlt} className="blog-hero-photo" sizes="100vw" />
            <span className="blog-hero-panel wrap">
              <span className="blog-hero-text">
                <span className="blog-hero-meta"><span>{featured.category}</span><time dateTime={featured.date}>{fmtDate(featured.date)}</time></span>
                <h2>{featured.title}</h2>
                <span className="blog-hero-dek">{featured.description}</span>
                <span className="blog-hero-cta">Read the story <span aria-hidden="true">↗</span></span>
              </span>
            </span>
          </Link>
          {credit && <p className="wrap blog-hero-credit">{credit}</p>}
        </section>
      )}

      <section className="wrap blog-stories" aria-labelledby="stories-heading">
        <div className="blog-stories-head">
          <h2 id="stories-heading">Recent stories</h2>
          <div className="blog-filter" role="group" aria-label="Filter stories by topic">
            {['All', ...categories].map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
        <ul className="story-grid">{list.map((p) => <StoryCard key={p.slug} post={p} />)}</ul>
      </section>

      <section className="blog-band" aria-labelledby="band-heading">
        <Photo id="blog-cozy-sofa-lamp" ratio="auto" alt="" className="blog-band-photo" sizes="100vw" />
        <div className="wrap blog-band-inner">
          <h2 id="band-heading">Planning a room in Pune?</h2>
          <p>Send a photo of your room and rough measurements on WhatsApp. We will suggest what to make, explain the materials and give you a written quotation.</p>
          <div className="blog-band-actions">
            <a className="btn light" href={waLink('Hello SK Emerald Interior, I read your blog and would like advice for my home.')} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
            <Link className="btn ghost" to="/contact">Visit the showroom</Link>
          </div>
        </div>
        <p className="wrap blog-band-credit">{img('blog-cozy-sofa-lamp')?.credit}</p>
      </section>

      <section className="wrap blog-explore" aria-labelledby="explore-heading">
        <h2 id="explore-heading">Explore by room</h2>
        <ul>{EXPLORE.map(([to, name]) => <li key={to}><Link to={to}>{name}</Link></li>)}</ul>
      </section>
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
  // Highlight the section being read: the last heading that has scrolled past the top (below the sticky header).
  useEffect(() => {
    if (!toc.length) return
    const heads = toc.map(([id]) => document.getElementById(id)).filter(Boolean)
    let raf = 0
    const update = () => {
      raf = 0
      let id = null
      for (const h of heads) { if (h.getBoundingClientRect().top <= 140) id = h.id; else break }
      setActive(id)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
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
  const credit = img(imageId(meta.image))?.credit
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
              <li><Link to="/">Home</Link></li><li><Link to="/blog">Blogs</Link></li><li><span aria-current="page">{meta.title}</span></li>
            </ol></nav>
            <Link className="article-cat" to="/blog">{meta.category}</Link>
            <h1>{meta.title}</h1>
            <p className="article-dek">{meta.description}</p>
            <div className="article-byline">
              <img src={logo} alt="" width="44" height="44" />
              <span className="article-byline-who"><b>SK Emerald Interior team</b><span>Furniture makers in Kondhwa, Pune</span></span>
              <span className="article-byline-when"><time dateTime={meta.date}>{fmtDate(meta.date)}</time><br />{meta.readingMinutes} min read</span>
            </div>
          </header>
          <figure className="article-hero">
            <Photo id={imageId(meta.image)} ratio="16/9" eager alt={meta.imageAlt} sizes="(min-width: 1100px) 1080px, 100vw" />
            {credit && <figcaption>{credit}</figcaption>}
          </figure>
          <div className="article-grid">
            {toc.length > 0 && <nav className="article-toc" aria-label="In this guide"><p>In this guide</p>{tocList}</nav>}
            <div className="article-main">
              {toc.length > 0 && <details className="article-toc-mobile"><summary>In this guide</summary>{tocList}</details>}
              {current
                ? <div className="post-body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: current.html }} />
                : <div className="post-body"><p>Loading the story…</p></div>}
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
            <div className="article-more-head"><h2 id="more-heading">More from the blog</h2><Link to="/blog" className="editorial-underlink">All blogs <span aria-hidden="true">↗</span></Link></div>
            <ul className="story-grid">{more.map((p) => <StoryCard key={p.slug} post={p} />)}</ul>
          </section>
        )}
      </article>
      <section className="green enquire"><div className="wrap">
        <h2>Planning something similar?</h2>
        <p>Send a photo of your room and rough measurements on WhatsApp. We will suggest what to make and explain the materials.</p>
        <div className="actions">
          <a className="btn light" href={waLink(`Hello SK Emerald Interior, I read your blog "${meta.title}" and would like advice for my home.`)} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
          <Link className="btn ghost" to="/contact">Visit the showroom</Link>
        </div>
      </div></section>
    </>
  )
}
