import { Link } from '../router'
import { Photo, Seo, Dim, PageHead, Enquire } from '../components/ui'
import { waLink } from '../data/business'
import { COLLECTIONS, ALSO_MADE, bySlug } from '../data/collections'

export function Collections() {
  return (
    <>
      <Seo path="/collections" title="Furniture collections" description="Sofas, recliners, beds, wardrobes, modular kitchens and TV units made to measure in Pune." />
      <PageHead crumbs={[['Home', '/'], ['Collections']]} title="Furniture collections" lead="Six ranges, each made to the size of your room. Choose one to see what can be customised." />
      <section className="wrap catalog">
        {COLLECTIONS.map((c, i) => (
          <article key={c.slug} className={`cat ${i % 2 ? 'flip' : ''}`}>
            <Link to={`/collections/${c.slug}`} aria-label={c.name}><Photo id={c.hero} ratio={c.layout === 'tall' ? '4/5' : '4/3'} reveal pos={c.tilePos} /></Link>
            <div>
              <h2>{c.name}</h2>
              <p>{c.intro}</p>
              <Dim parts={c.parts} />
              <div className="actions">
                <Link className="btn small" to={`/collections/${c.slug}`}>See {c.name.toLowerCase()}</Link>
                <a className="btn small ghost" href={waLink(c.wa)} target="_blank" rel="noopener noreferrer">Enquire</a>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="wrap also">
        <h2>Also made to order</h2>
        <p className="muted">Ask us about these on WhatsApp.</p>
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
      <PageHead crumbs={[['Home', '/'], ['Collections', '/collections'], [c.name]]} title={c.name} lead={c.tag} />
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
      <section className="wrap options">
        <h2>What you can change</h2>
        <dl>{c.options.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
        <p className="muted note">{c.materials} <Link to="/materials">Materials and care</Link></p>
      </section>
      <section className="wrap more">
        <h2>More views</h2>
        <div className="strip">{c.gallery.map((g) => <Photo key={g} id={g} ratio="4/5" />)}</div>
      </section>
      <section className="wrap related">
        <h2>Related</h2>
        <div className="rel">{c.related.map((r) => { const x = bySlug(r); return <Link key={r} to={`/collections/${r}`}><Photo id={x.tile} pos={x.tilePos} ratio="16/10" /><span>{x.name}</span></Link> })}</div>
      </section>
      <Enquire message={c.wa} title={`Planning ${c.name.toLowerCase()}?`} />
    </>
  )
}
