import { Link } from '../router'
import { Photo, Seo, Dim, Enquire } from '../components/ui'
import { BUSINESS, waLink, mapsLink } from '../data/business'
import { COLLECTIONS } from '../data/collections'
import { SLOTS } from '../data/images'
import { PROCESS } from '../data/content'

const ld = {
  '@context': 'https://schema.org', '@type': 'FurnitureStore', name: BUSINESS.name, alternateName: BUSINESS.altName, slogan: BUSINESS.tagline,
  telephone: BUSINESS.phones.map((p) => p.tel), email: BUSINESS.email,
  address: { '@type': 'PostalAddress', streetAddress: 'Shop No. 226, First Floor, Unitas Fashion Centre Mall, Parge Nagar, Kondhwa Khurd', addressLocality: 'Pune', addressRegion: 'Maharashtra', postalCode: '411048', addressCountry: 'IN' },
}

// Collection mosaic. `area` maps to a grid area in styles.css (.t-a … .t-f); `ratio` is the phone/tablet crop,
// desktop proportions come from the grid itself. Images, focal points and captions come from collections.js.
const TILES = [
  { slug: 'sofas', area: 'a', ratio: '4/3', delay: 0 },
  { slug: 'modular-kitchens', area: 'b', ratio: '4/5', delay: 1 },
  { slug: 'wardrobes', area: 'c', ratio: '4/5', delay: 0 },
  { slug: 'tv-units', area: 'd', ratio: '16/10', delay: 0 },
  { slug: 'beds', area: 'e', ratio: '16/10', delay: 1 },
  { slug: 'recliners', area: 'f', ratio: '1/1', delay: 0 },
]

function Tile({ slug, area, ratio, delay }) {
  const c = COLLECTIONS.find((x) => x.slug === slug)
  return (
    <Link to={`/collections/${slug}`} className={`tile t-${area}`} aria-label={`${c.name}: ${c.tag}`} style={{ '--d': delay }}>
      <Photo id={c.tile} ratio={ratio} pos={c.tilePos} reveal sizes="(min-width: 900px) 50vw, 100vw" />
      <span className="tile-cap">
        <span className="tile-name">{c.name}</span>
        <span className="tile-tag">{c.tag}</span>
        <span className="tile-go">View range</span>
      </span>
    </Link>
  )
}

export default function Home() {
  return (
    <>
      <Seo path="/" description="Sofas, recliners, beds, wardrobes, modular kitchens and TV units made to measure, from a showroom in Kondhwa, Pune." ld={ld} />

      <section className="hero">
        <div className="hero-text wrap">
          <p className="vert" aria-hidden="true">Kondhwa, Pune</p>
          <h1 className="rv" style={{ '--d': 0 }}>Furniture made to the measure of your home</h1>
          <p className="lead rv" style={{ '--d': 1 }}>{BUSINESS.name} makes and sells sofas, kitchens, wardrobes, beds and TV units to your size, fabric and finish. Visit the showroom in Kondhwa, Pune.</p>
          <div className="actions rv" style={{ '--d': 2 }}>
            <Link to="/collections" className="btn">Explore collections</Link>
            <a className="btn ghost" href={waLink('Hello SK Emerald Interior, I would like a quotation.')} target="_blank" rel="noopener noreferrer">Request a quotation</a>
          </div>
        </div>
        <div className="hero-img">
          <Photo id={SLOTS.hero} ratio="4/3" pos="42% 50%" eager reveal sizes="(min-width: 900px) 62vw, 100vw" />
          <p className="hero-note">Sofa set, living room</p>
        </div>
        <nav className="hero-index wrap" aria-label="Collections">
          {COLLECTIONS.map((c) => <Link key={c.slug} to={`/collections/${c.slug}`}>{c.name}</Link>)}
        </nav>
      </section>

      <section className="wrap intro">
        <div className="intro-copy rv">
          <h2>Made for the room it will live in</h2>
          <p className="lead">Every piece starts with your measurements. We show you finishes and fabrics, write the specification into a quotation, and then make the piece to that size.</p>
          <Link to="/about" className="textlink">How we work</Link>
        </div>
        <div className="overlap">
          <Photo id={SLOTS.intro[0]} ratio="4/3" className="a" reveal />
          <Photo id={SLOTS.intro[1]} ratio="1/1" className="b" reveal />
        </div>
      </section>

      <section className="wrap showcase" aria-labelledby="coll-h">
        <div className="sec-head">
          <div>
            <h2 id="coll-h">Six ranges, drawn to your room</h2>
            <p className="muted">Pick a range to see what can be changed: size, fabric, finish and fittings.</p>
          </div>
          <Link to="/collections" className="textlink">Explore all collections</Link>
        </div>
        <div className="mosaic">
          {TILES.map((t) => <Tile key={t.slug} {...t} />)}
        </div>
      </section>

      <section className="green materials-band"><div className="wrap split">
        <div className="rv">
          <h2>Know what is inside before you pay</h2>
          <p>Frame, foam, board, laminate and hardware differ from one piece to the next. We name them in your quotation, so the price you are given matches what is built.</p>
          <Dim parts={['Frame', 'Foam', 'Fabric']} />
          <Link to="/materials" className="btn light">Materials and care</Link>
        </div>
        <div className="mat-stack">
          <Photo id={SLOTS.materials[0]} ratio="16/10" pos="center 70%" reveal className="m-main" />
          <Photo id={SLOTS.materials[1]} ratio="4/3" reveal className="m-a" />
          <Photo id={SLOTS.materials[2]} ratio="4/3" reveal className="m-b" />
        </div>
      </div></section>

      <section className="wrap rooms-home">
        <div className="sec-head">
          <div><h2>Planned room by room</h2><p className="muted">Sofa, kitchen or storage: pieces for one room are made to match in size, colour and finish.</p></div>
          <Link to="/interiors" className="textlink">Interior solutions</Link>
        </div>
        <div className="triptych">
          {[['Living room', 'sofas'], ['Kitchen', 'modular-kitchens'], ['Storage', 'wardrobes']].map(([t, slug], i) => (
            <Link key={t} to={`/collections/${slug}`} className="tri">
              <Photo id={SLOTS.rooms[i]} ratio={i === 1 ? '4/5' : '3/4'} reveal />
              <span>{t}</span>
            </Link>
          ))}
        </div>
        <p className="muted note"><Link to="/gallery" className="textlink">Open the gallery</Link> for more photographs of our furniture, and design inspiration.</p>
      </section>

      <section className="wrap process">
        <h2>From first message to fitted</h2>
        <ol>{PROCESS.map(([t, d], i) => <li key={t} className="rv" style={{ '--d': i }}><span className="step">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </section>

      <section className="wrap visit">
        <h2>Visit the showroom</h2>
        <address>{BUSINESS.showroom.lines.map((l) => <span key={l}>{l}</span>)}</address>
        <p className="muted">Please call or message first to confirm visiting times.</p>
        <div className="actions"><a className="btn" href={mapsLink} target="_blank" rel="noopener noreferrer">Get directions</a><Link className="btn ghost" to="/contact">Contact details</Link></div>
      </section>
      <Enquire />
    </>
  )
}
