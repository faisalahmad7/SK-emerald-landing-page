import { Link } from '../router'
import { Photo, Seo, Dim, PageHead, Enquire } from '../components/ui'
import { waLink } from '../data/business'
import { img } from '../data/images'
import { COLLECTIONS, MORE_COLLECTIONS, ALSO_MADE, bySlug } from '../data/collections'

// Collections whose option cards show each photo whole, in one fixed card shape.
const FIT_VARIANTS = { 'dressing-tables': '3/4', 'shelves-and-drawers': '2/3', 'mirrors-and-wall-decor': '3/4', wardrobes: '3/4', 'crockery-units': '3/4', 'office-chairs': '2/3', recliners: '3/4' }

export function Collections() {
  return (
    <>
      <Seo path="/collections" title="Furniture collections" description="Browse furniture by piece, with made-to-measure options from SK Emerald Interior, Pune." />
      <PageHead crumbs={[['Home', '/'], ['Collections']]} title="Furniture collections" lead="Choose a particular piece, then explore the layouts, sizes and finishes that suit your space." />
      <section className="collections-offer-band">
        <div className="wrap collections-offer-inner">
          <div><p className="editorial-eyebrow"><span /> Selected combinations</p><h2>Ask about current combo offers.</h2><p>Check current set pricing and any limited-period offers before you decide. Every offer, finish and final price is confirmed in your quotation.</p></div>
          <a className="btn" href={waLink('Hello SK Emerald Interior, please share your current sofa set, room combination and limited-period offers.')} target="_blank" rel="noopener noreferrer">Check current offers <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="wrap catalog catalog-cards">
        <div className="collections-subhead">
          <p className="editorial-eyebrow"><span /> Browse by product</p>
          <h2>Choose the piece you need.</h2>
          <p>Each range includes different layouts, sizes and finishes to discuss.</p>
        </div>
        <div className="collections-space-grid collections-product-grid">
          {COLLECTIONS.filter((c) => c.slug !== 'office-spaces').map((c) => (
            <Link to={`/collections/${c.slug}`} className="collections-space-card rv" key={c.slug}>
              <Photo id={c.tile} ratio="16/10" pos={c.tilePos} />
              <span><b>{c.name}</b><i>{c.tag}</i></span>
            </Link>
          ))}
          {MORE_COLLECTIONS.map((c) => (
            <Link to={`/collections/${c.slug}`} className="collections-space-card rv" key={c.slug}>
              <Photo id={c.tile} ratio="16/10" pos={c.tilePos} />
              <span><b>{c.name}</b><i>{c.tag}</i></span>
            </Link>
          ))}
        </div>
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
        <div className={`variant-grid${FIT_VARIANTS[c.slug] ? ' variant-grid--fit' : ''}`} style={FIT_VARIANTS[c.slug] ? { '--vc-ratio': FIT_VARIANTS[c.slug] } : undefined}>
          {(c.variants || []).map((variant, i) => (
            <article className={`variant-card rv${variant.fill ? ' variant-card--fill' : ''}`} key={variant.name} style={FIT_VARIANTS[c.slug] && img(variant.image) ? { '--vc-bg': `url("${img(variant.image).src}")`, '--vc-pos': variant.pos || 'center' } : undefined}>
              <Photo id={variant.image} ratio="4/3" pos={variant.pos} alt={variant.name} />
              <div className="variant-card-copy">
                <span>OPTION 0{i + 1}</span>
                <h3>{variant.name}</h3>
                <p>{variant.detail}</p>
                <a href={waLink(`Hi SK Emerald Interior, I am interested in the ${variant.name} shown in your ${c.name} collection. Could you share more details about its available sizes, materials, finishes, customisation options and indicative price? Thank you.`)} target="_blank" rel="noopener noreferrer">Ask about this option ↗</a>
              </div>
            </article>
          ))}
        </div>
        <div className="collection-more-cta">
          <p>Looking for a different look?</p>
          <a className="btn" href={waLink(`Hi SK Emerald Interior, I explored your ${c.name} collection on your website and would love to see more ${c.name.toLowerCase()} styles and design options. Please share additional designs, available customisation, finishes and indicative pricing. Thank you.`)} target="_blank" rel="noopener noreferrer">AND MORE <span aria-hidden="true">↗</span></a>
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
