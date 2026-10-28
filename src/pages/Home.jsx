import { Link } from '../router'
import { Photo, Seo, Dim, Enquire } from '../components/ui'
import { BUSINESS, waLink, mapsLink } from '../data/business'
import { COLLECTIONS } from '../data/collections'
import { SLOTS, img } from '../data/images'
import { PROCESS } from '../data/content'

const ld = {
  '@context': 'https://schema.org', '@type': 'FurnitureStore', name: BUSINESS.name, alternateName: BUSINESS.altName, slogan: BUSINESS.tagline,
  telephone: BUSINESS.phones.map((p) => p.tel), email: BUSINESS.email,
  address: { '@type': 'PostalAddress', streetAddress: 'Shop No. 226, First Floor, Unitas Fashion Centre Mall, Parge Nagar, Kondhwa Khurd', addressLocality: 'Pune', addressRegion: 'Maharashtra', postalCode: '411048', addressCountry: 'IN' },
}

const TILES = [
  { slug: 'sofas', area: 'a', ratio: '4/3', delay: 0, imageId: 27 },
  { slug: 'modular-kitchens', area: 'b', ratio: '4/5', delay: 1, imageId: 33 },
  { slug: 'wardrobes', area: 'c', ratio: '4/5', delay: 0, imageId: 18 },
  { slug: 'tv-units', area: 'd', ratio: '16/10', delay: 0, imageId: 23 },
  { slug: 'beds', area: 'e', ratio: '16/10', delay: 1, imageId: 19 },
  { slug: 'recliners', area: 'f', ratio: '1/1', delay: 0, imageId: 39 },
]

function Tile({ slug, area, ratio, delay, imageId }) {
  const c = COLLECTIONS.find((x) => x.slug === slug)
  const image = img(imageId ?? c.tile)
  return (
    <Link to={`/collections/${slug}`} className={`tile t-${area} editorial-tile`} aria-label={`${c.name}: ${c.tag}`} style={{ '--d': delay }}>
      <Photo id={imageId ?? c.tile} ratio={ratio} pos={c.tilePos} alt={image?.alt} reveal sizes="(min-width: 900px) 50vw, 100vw" />
      <span className="tile-cap">
        <span className="tile-number">0{TILES.findIndex((t) => t.slug === slug) + 1}</span>
        {image?.kind === 'inspiration' && <span className="tile-visual-note">Design inspiration</span>}
        <span className="tile-name">{c.name}</span>
        <span className="tile-tag">{c.tag}</span>
        <span className="tile-go">Explore range</span>
      </span>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="homepage-v2">
      <Seo path="/" description="Sofas, recliners, beds, wardrobes, modular kitchens and TV units made to measure, from a showroom in Kondhwa, Pune." ld={ld} />

      <section className="hero editorial-hero">
        <div className="hero-text editorial-hero-copy">
          <p className="editorial-eyebrow"><span /> Furniture, thoughtfully made <span className="eyebrow-city">Kondhwa · Pune</span></p>
          <h1>Make room for <em>living.</em></h1>
          <p className="lead">Furniture and interiors shaped around the way you live — measured for your home, finished to your taste, and specified clearly before the work begins.</p>
          <div className="actions">
            <Link to="/collections" className="btn editorial-btn">Discover the collections <span aria-hidden="true">↗</span></Link>
            <a className="editorial-text-link" href={waLink('Hello SK Emerald Interior, I would like a quotation.')} target="_blank" rel="noopener noreferrer">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-proof"><span>01</span><p>Made around your measurements.<br />Not the other way around.</p><span className="hero-proof-rule" /></div>
        </div>
        <div className="hero-img editorial-hero-image">
          <Photo id={SLOTS.hero} ratio="4/5" pos="48% 50%" eager sizes="(min-width: 900px) 58vw, 100vw" alt="Dark emerald living room with coordinated sofa furniture" />
          <div className="hero-image-caption"><span>SK EMERALD INTERIOR</span><span>Living, in a deeper shade of green</span></div>
        </div>
        <nav className="hero-index editorial-hero-index wrap" aria-label="Explore furniture ranges">
          {COLLECTIONS.map((c, i) => <Link key={c.slug} to={`/collections/${c.slug}`}><span>0{i + 1}</span>{c.name}</Link>)}
        </nav>
      </section>

      <div className="home-marquee" aria-label="Furniture collections: sofas, modular kitchens, wardrobes, TV units, beds and recliners">
        <div className="home-marquee-track" aria-hidden="true">
          <span>SOFAS <i>✳</i> MODULAR KITCHENS <i>✳</i> WARDROBES <i>✳</i> TV UNITS <i>✳</i> BEDS <i>✳</i> RECLINERS <i>✳</i> MADE TO MEASURE <i>✳</i></span>
          <span>SOFAS <i>✳</i> MODULAR KITCHENS <i>✳</i> WARDROBES <i>✳</i> TV UNITS <i>✳</i> BEDS <i>✳</i> RECLINERS <i>✳</i> MADE TO MEASURE <i>✳</i></span>
        </div>
      </div>

      <section className="wrap intro editorial-intro">
        <div className="overlap editorial-intro-visual">
          <Photo id={27} ratio="4/5" className="a" caption="Design inspiration · illustrative concept" reveal />
          <Photo id={SLOTS.intro[1]} ratio="1/1" className="b" reveal />
          <span className="editorial-image-index">A home is made in the details.</span>
        </div>
        <div className="intro-copy rv editorial-intro-copy">
          <p className="editorial-eyebrow"><span /> A considered approach</p>
          <h2>Not just furniture. <em>A feeling.</em></h2>
          <p className="lead">A room comes together when the proportions feel right, the materials work hard, and every finish belongs. We help you make those choices with confidence.</p>
          <p>Start with a room, a measurement or an idea you saved. We will work through size, fabric, finish and specification with you — so the piece feels considered before it ever arrives home.</p>
          <Link to="/about" className="editorial-underlink">Our approach <span aria-hidden="true">↗</span></Link>
          <div className="editorial-quote"><span>“</span><p>Good design makes everyday life feel a little more extraordinary.</p></div>
        </div>
      </section>

      <section className="showcase editorial-showcase" aria-labelledby="coll-h">
        <div className="wrap sec-head editorial-section-head">
          <div><p className="editorial-eyebrow"><span /> Find your starting point</p><h2 id="coll-h">The pieces that shape a room.</h2><p className="muted">Explore the range, then make it yours — from proportions and upholstery to storage and finish.</p></div>
          <Link to="/collections" className="editorial-underlink">View all collections <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="mosaic editorial-mosaic">
          {TILES.map((t) => <Tile key={t.slug} {...t} />)}
        </div>
        <p className="editorial-image-disclosure">Images marked “Design inspiration” are illustrative room concepts, not completed SK Emerald projects. <Link to="/gallery">Explore the gallery</Link> to distinguish furniture photographs from inspiration.</p>
      </section>

      <section className="green materials-band editorial-materials">
        <div className="wrap split">
          <div className="editorial-materials-copy rv">
            <p className="editorial-eyebrow"><span /> Beauty, with substance</p>
            <h2>Details you can see. Materials you can understand.</h2>
            <p>Frame, foam, board, laminate and hardware can change the feel and life of a piece. We explain the choices and include the agreed specification in your quotation, so you know what you are paying for.</p>
            <Dim parts={['Frame', 'Foam', 'Fabric', 'Finish']} />
            <Link to="/materials" className="btn light">Explore materials <span aria-hidden="true">↗</span></Link>
            <p className="editorial-small-note">The right details make the difference.</p>
          </div>
          <div className="mat-stack editorial-material-stack">
            <Photo id={SLOTS.materials[0]} ratio="4/5" pos="center" reveal className="m-main" />
            <Photo id={SLOTS.materials[1]} ratio="4/3" reveal className="m-a" />
            <Photo id={SLOTS.materials[2]} ratio="4/3" reveal className="m-b" />
            <span className="material-index">MATERIAL STUDY / 01</span>
          </div>
        </div>
      </section>

      <section className="wrap rooms-home editorial-rooms">
        <div className="sec-head editorial-section-head">
          <div><p className="editorial-eyebrow"><span /> One home, many possibilities</p><h2>Bring the whole room together.</h2><p className="muted">From the first impression in the living room to the everyday rhythm of a kitchen, each element can be planned around your space.</p></div>
          <Link to="/interiors" className="editorial-underlink">Explore interiors <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="triptych editorial-triptych">
          {[['Living room', 'sofas'], ['Kitchen', 'modular-kitchens'], ['Storage', 'wardrobes']].map(([t, slug], i) => (
            <Link key={t} to={`/collections/${slug}`} className={`tri tri-${i + 1}`}>
              <Photo id={SLOTS.rooms[i]} ratio={i === 1 ? '4/5' : '3/4'} caption={i < 2 ? 'Design inspiration · illustrative concept' : undefined} reveal />
              <span>{t}</span>
            </Link>
          ))}
        </div>
        <p className="muted note editorial-gallery-note"><Link to="/gallery" className="editorial-underlink">Step inside the gallery <span aria-hidden="true">↗</span></Link> for furniture photographs and design inspiration.</p>
      </section>

      <section className="editorial-process-band">
        <div className="wrap process editorial-process">
          <div className="editorial-process-intro"><p className="editorial-eyebrow"><span /> From idea to everyday</p><h2>A thoughtful process. A better fit.</h2><p>Clear choices at each step, from the first conversation to the final installation.</p></div>
          <ol>{PROCESS.map(([t, d], i) => <li key={t} className="rv" style={{ '--d': i }}><span className="step">0{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </div>
      </section>

      <section className="wrap visit editorial-visit">
        <div className="editorial-visit-heading"><p className="editorial-eyebrow"><span /> Come see it in person</p><h2>Let's make your space feel like home.</h2></div>
        <div className="editorial-visit-details">
          <p>See finishes, compare fabrics and talk through your measurements at our showroom in Kondhwa, Pune.</p>
          <address>{BUSINESS.showroom.lines.map((l) => <span key={l}>{l}</span>)}</address>
          <p className="muted">Please call or message first to confirm visiting times.</p>
          <div className="actions"><a className="btn" href={mapsLink} target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a><Link className="editorial-underlink" to="/contact">Contact the showroom <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
      <Enquire title="Your room, your way." text="Send a photo, share a few measurements or tell us what you have in mind. Let's explore what will work for your home." />
    </div>
  )
}
