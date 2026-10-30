import { Link } from '../router'
import { Photo, Seo, Dim, PageHead, Enquire } from '../components/ui'
import { waLink } from '../data/business'
import { COLLECTIONS, ALSO_MADE, bySlug } from '../data/collections'

const SPACE_LINKS = [
  { name: 'Living room', description: 'Sofas, seating and TV units', slug: 'sofas', image: 'sofa-pair' },
  { name: 'Bedroom', description: 'Beds and matching furniture', slug: 'beds', image: 'bed-storage' },
  { name: 'Kitchen', description: 'Modular layouts and storage', slug: 'modular-kitchens', image: 'kitchen-u' },
  { name: 'Storage', description: 'Wardrobes and fitted units', slug: 'wardrobes', image: 'wardrobe-sliding' },
  { name: 'Office spaces', description: 'Reception, desks and meeting areas', slug: 'office-spaces', image: 'office-reception' },
]

export function Collections() {
  return (
    <>
      <Seo path="/collections" title="Furniture and spaces" description="Explore made-to-measure furniture, room combinations and office furniture by SK Emerald Interior, Pune." />
      <PageHead crumbs={[['Home', '/'], ['Collections']]} title="Furniture, by piece or by space" lead="Choose a furniture type, or start with the room you want to bring together. We can plan a complete space or make one custom piece to fit." />
      <section className="collections-phone-spaces" aria-labelledby="space-links-title">
        <div className="wrap">
          <div className="collections-subhead">
            <p className="editorial-eyebrow"><span /> Start with a room</p>
            <h2 id="space-links-title">What are you furnishing?</h2>
            <p>Choose a space to see the furniture that can bring it together.</p>
          </div>
          <div className="collections-space-grid">
            {SPACE_LINKS.map((space) => (
              <Link to={`/collections/${space.slug}`} className="collections-space-card" key={space.name}>
                <Photo id={space.image} ratio="16/10" />
                <span><b>{space.name}</b><i>{space.description}</i></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="collections-offer-band">
        <div className="wrap collections-offer-inner">
          <div><p className="editorial-eyebrow"><span /> Selected combinations</p><h2>Ask about current combo offers.</h2><p>Check current set pricing and any limited-period offers before you decide. Every offer, finish and final price is confirmed in your quotation.</p></div>
          <a className="btn" href={waLink('Hello SK Emerald Interior, please share your current sofa set, room combination and limited-period offers.')} target="_blank" rel="noopener noreferrer">Check current offers <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="wrap catalog">
        <div className="collections-subhead">
          <p className="editorial-eyebrow"><span /> Browse by product</p>
          <h2>Choose the piece you need.</h2>
          <p>Each range includes different layouts, sizes and finishes to discuss.</p>
        </div>
        {COLLECTIONS.map((c, i) => (
          <article key={c.slug} className={`cat ${i % 2 ? 'flip' : ''}`}>
            <Link to={`/collections/${c.slug}`} aria-label={c.name}><Photo id={c.hero} ratio={c.layout === 'tall' ? '4/5' : '4/3'} reveal pos={c.tilePos} /></Link>
            <div>
              <h2>{c.name}</h2>
              <p>{c.intro}</p>
              <Dim parts={c.parts} />
              <div className="actions">
                <Link className="btn small" to={`/collections/${c.slug}`}>View options</Link>
                <a className="btn small ghost" href={waLink(c.wa)} target="_blank" rel="noopener noreferrer">Enquire</a>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="wrap also">
        <h2>Also made to order</h2>
        <p className="muted">Ask us about these additional pieces and services.</p>
        <ul>{ALSO_MADE.map(([n, m]) => <li key={n}><span>{n}</span><a href={waLink(m)} target="_blank" rel="noopener noreferrer">Enquire</a></li>)}</ul>
      </section>
      <Enquire />
    </>
  )
}

export function Collection({ slug }) {
  const c = bySlug(slug)
  const path = `/collections/${slug}`
  return (
    <>
      <Seo path={path} title={c.name} description={`${c.intro.split('.')[0]}. Made to measure by SK Emerald Interior, Kondhwa, Pune.`} />
      <PageHead crumbs={[[ 'Home', '/' ], ['Collections', '/collections'], [c.name]]} title={c.name} lead={c.tag}>
        <div className="collection-quick-actions">
          <a className="btn small" href={waLink(c.wa)} target="_blank" rel="noopener noreferrer">Ask for a price <span aria-hidden="true">↗</span></a>
          <Link className="textlink" to="/collections">View all furniture</Link>
        </div>
      </PageHead>
      <section className={`wrap cdetail l-${c.layout}`}>
        <div className="cd-main"><Photo id={c.hero} ratio={c.layout === 'tall' ? '4/5' : c.layout === 'wide' ? '16/9' : '1/1'} pos={c.tilePos} eager /></div>
        <div className="cd-side">
          <p className="lead">{c.intro}</p>
          <Dim parts={c.parts} />
          <ul className="ticks">{c.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <a className="btn" href={waLink(c.wa)} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
        </div>
        {c.layout === 'wide' && <div className="cd-inset"><Photo id={c.detail} ratio="4/3" /></div>}
      </section>
      <section className="wrap product-variants" aria-labelledby="variants-heading">
        <div className="collections-subhead">
          <p className="editorial-eyebrow"><span /> Explore the range</p>
          <h2 id="variants-heading">Different ways to make it yours.</h2>
          <p>Start with a style or configuration. Sizes, colours, materials and details can be discussed for your space.</p>
        </div>
        <div className="variant-grid">
          {(c.variants || []).map((variant, i) => (
            <article className="variant-card" key={variant.name}>
              <Photo id={variant.image} ratio="4/3" alt={variant.name} />
              <div className="variant-card-copy">
                <span>OPTION 0{i + 1}</span>
                <h3>{variant.name}</h3>
                <p>{variant.detail}</p>
                <a href={waLink(`${c.wa} I would like to ask about: ${variant.name}.`)} target="_blank" rel="noopener noreferrer">Ask about this option ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap options">
        <h2>What you can customise</h2>
        <dl>{c.options.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
        <p className="muted note">{c.materials} <Link to="/materials">Materials and care</Link></p>
      </section>
      <section className="wrap more">
        <h2>More views</h2>
        <div className="strip">{c.gallery.map((g, i) => <Photo key={`${g}-${i}`} id={g} ratio="4/5" />)}</div>
      </section>
      <section className="wrap related">
        <h2>Related ranges</h2>
        <div className="rel">{c.related.map((r) => { const x = bySlug(r); return x ? <Link key={r} to={`/collections/${r}`}><Photo id={x.tile} pos={x.tilePos} ratio="16/10" /><span>{x.name}</span></Link> : null })}</div>
      </section>
      <Enquire message={c.wa} title={`Planning ${c.name.toLowerCase()}?`} />
    </>
  )
}
