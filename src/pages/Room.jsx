import { Link } from '../router'
import { Photo, Seo, Enquire } from '../components/ui'
import { waLink } from '../data/business'
import { bySlug } from '../data/collections'
import { roomBySlug } from '../data/rooms'
import { ROOM_SEO } from '../data/seo-pages'
import { Facts, FaqList } from './Sections'

export function Room({ slug }) {
  const r = roomBySlug(slug)
  const msg = `Hello SK Emerald Interior, I would like to plan my ${r.short}.`
  const seo = ROOM_SEO[slug] || {}
  return (
    <>
      <Seo path={`/interiors/${slug}`} title={seo.title || `${r.name} setups`} name={r.name} image={r.hero} faqs={seo.faqs}
        description={seo.description || `${r.name} setups and the furniture to go with them, made to measure at our factory in Kondhwa, Pune. Send us your room size for ideas.`}
        service={{ name: `${r.name} interiors`, type: `${r.name} interior design and furniture` }} items={r.setups.map((x) => [x.name, x.detail])} itemsName={`${r.name} setups`} />
      <header className="pagehead wrap room-pagehead">
        <div className="room-pagehead-copy">
          <nav aria-label="Breadcrumb" className="crumbs"><ol>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/interiors">Plan a room</Link></li>
            <li><span aria-current="page">{r.name}</span></li>
          </ol></nav>
          <h1>{seo.h1 || r.name}</h1>
          <p className="lead">{r.lead}</p>
          <div className="collection-quick-actions">
            <a className="btn small" href={waLink(msg)} target="_blank" rel="noopener noreferrer">Plan my {r.short} <span aria-hidden="true">↗</span></a>
            <Link className="textlink" to="/interiors">All rooms</Link>
          </div>
        </div>
        <div className="room-pagehead-photo"><Photo id={r.hero} ratio="4/3" pos={r.heroPos} eager alt={`${r.name} setup`} /></div>
      </header>
      <section className="wrap product-variants" aria-labelledby="setups-heading">
        <div className="collections-subhead">
          <p className="editorial-eyebrow"><span /> {r.name} setups</p>
          <h2 id="setups-heading">Different ways to set up your {r.short}.</h2>
          <p>Start with a look you like. Layout, colours, sizes and finishes can be discussed for your space.</p>
        </div>
        <div className="variant-grid">
          {r.setups.map((s) => (
            <article className="variant-card setup-card rv" key={s.name}>
              <Photo id={s.image} ratio="4/3" pos={s.pos} alt={s.name} />
              <div className="variant-card-copy">
                <a href={waLink(`${msg} I like this setup: ${s.name}.`)} target="_blank" rel="noopener noreferrer">Ask about this setup ↗</a>
              </div>
            </article>
          ))}
        </div>
        <p className="muted note">Photos show styles and finishes we can build to. Some are illustrative and are not completed SK Emerald projects.</p>
      </section>
      <section className="wrap catalog catalog-cards" aria-labelledby="pieces-heading">
        <div className="collections-subhead">
          <p className="editorial-eyebrow"><span /> For your {r.short}</p>
          <h2 id="pieces-heading">Furniture for the {r.short}.</h2>
          <p>Choose a piece to see its options and ask for a price.</p>
        </div>
        <div className="collections-space-grid collections-product-grid">
          {r.pieces.map(bySlug).filter(Boolean).map((c) => (
            <Link to={`/collections/${c.slug}`} className="collections-space-card rv" key={c.slug}>
              <Photo id={c.tile} ratio="16/10" pos={c.tilePos} />
              <span><b>{c.name}</b><i>{c.tag}</i></span>
            </Link>
          ))}
        </div>
      </section>
      {seo.facts && <Facts title={`${r.name} at a glance`} facts={seo.facts} />}
      {seo.faqs && <FaqList title={`${r.name}: common questions`} faqs={seo.faqs} />}
      {slug === 'modular-kitchen' && (
        <section className="wrap related-guides"><p className="muted">Comparing options? Read <Link to="/blog/modular-vs-carpenter-kitchen">modular or carpenter-made kitchen</Link> and <Link to="/blog/bwp-vs-bwr-vs-mr-plywood">which board to choose for a kitchen</Link>.</p></section>
      )}
      <Enquire message={msg} title={`Planning your ${r.short}?`} />
    </>
  )
}
