import { Link } from '../router'
import { Photo, Seo, PageHead, Enquire } from '../components/ui'
import { BUSINESS, waLink, mapsLink, reviewLink, telLink } from '../data/business'
import { SLOTS } from '../data/images'
import { PROCESS } from '../data/content'
import { bySlug } from '../data/collections'
import { REVIEWS } from '../data/reviews'

const MAKES = ['sofas', 'recliners', 'beds', 'wardrobes', 'tv-units', 'false-ceilings', 'dining-tables', 'cabinets']

export function About() {
  const quotes = REVIEWS.filter((r) => ['Misbah Shaikh', 'Iqbal Shaikh', 'Abul Shaikh'].includes(r.name))
  return (
    <>
      <Seo path="/about" title="About Us: Furniture Makers in Kondhwa, Pune | SK Emerald Interior" name="About" type="AboutPage" image={SLOTS.aboutMain}
        description="SK Emerald Interior makes furniture to measure at its own factory in Kondhwa, Pune, with a showroom at Unitas Fashion Centre. How we work, and what we make." />
      <PageHead crumbs={[['Home', '/'], ['About']]} title="About SK Emerald Interior"
        lead="We are a furniture maker in Kondhwa, Pune. We make sofas, beds, wardrobes, kitchens and more to your measurements at our own factory, and you can see finishes and fabrics at our showroom in Unitas Fashion Centre." />
      <section className="wrap about-split">
        <div className="about-photos">
          <Photo id={SLOTS.aboutMain} ratio="4/5" eager alt="Furniture made by SK Emerald Interior" />
        </div>
        <div className="prose">
          <h2>Made in Kondhwa</h2>
          <p>Our furniture is made at our factory in Kondhwa Budruk ({BUSINESS.factory.oneLine}). Our showroom is at {BUSINESS.showroom.oneLine}. We make furniture for homes, offices and institutions.</p>
          <p>You may also know us as <b>{BUSINESS.altName}</b>. Our motto is <i>{BUSINESS.tagline}</i>.</p>
          <h2>Why we explain the materials</h2>
          <p>Frame, foam, board, laminate and hardware change how a piece feels and how long it lasts. We talk you through these choices before you order, and the agreed specification is written into your quotation, so you know what you are paying for.</p>
          <p>Customers notice it. In Misbah's words: “Starting from frame of sofa and foam everything is well explained and various colour options.”</p>
        </div>
      </section>
      <section className="green"><div className="wrap">
        <h2>How an order is made</h2>
        <ol className="steps">{PROCESS.map(([t, d], i) => <li key={t}><span className="step">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </div></section>
      <section className="wrap about-makes">
        <h2>What we make</h2>
        <ul className="about-make-list">
          {MAKES.map(bySlug).filter(Boolean).map((c) => <li key={c.slug}><Link to={`/collections/${c.slug}`}>{c.name}</Link></li>)}
          <li><Link to="/interiors/modular-kitchen">Modular kitchens</Link></li>
          <li><Link to="/interiors/office-spaces">Office furniture</Link></li>
          <li><Link to="/collections">All collections</Link></li>
        </ul>
      </section>
      <section className="wrap about-quotes">
        <h2>What customers say</h2>
        {quotes.map((r) => <blockquote key={r.name}><p>“{r.text}”</p><footer>{r.name}, Google review</footer></blockquote>)}
        <p><Link to="/reviews">Read all reviews</Link></p>
      </section>
      <section className="wrap about-visit">
        <h2>Visit or call</h2>
        <p>Showroom: {BUSINESS.showroom.oneLine}. Please call or message first to confirm visiting times.</p>
        <p>Call {BUSINESS.phones.map((p, i) => <span key={p.tel}>{i > 0 && ' or '}<a href={telLink(p)}>{p.display}</a></span>)}, or <a href={waLink('Hello SK Emerald Interior, I would like to visit the showroom.')} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>. <a href={mapsLink} target="_blank" rel="noopener noreferrer">Get directions</a>.</p>
      </section>
      <Enquire />
    </>
  )
}

export function Reviews() {
  return (
    <>
      <Seo path="/reviews" title="SK Emerald Interior Reviews (Google) | Kondhwa, Pune" name="Reviews"
        description="What customers say about SK Emerald Interior's sofas, kitchens, TV units and service: Google reviews of our furniture showroom and factory in Kondhwa, Pune." />
      <PageHead crumbs={[['Home', '/'], ['Reviews']]} title="What our customers say"
        lead="Reviews left by our customers on Google, quoted word for word. Rated 5.0 on Google." />
      <section className="wrap reviews-page">
        <div className="review-grid">
          {REVIEWS.map((r) => (
            <article className="editorial-review-card" key={r.name}>
              <div className="editorial-review-card-top"><span className="editorial-review-stars" aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}</span><span className="editorial-review-mark" aria-label="Google review">G</span></div>
              <blockquote>“{r.text}”</blockquote>
              <div className="editorial-review-author"><span className="editorial-review-avatar" aria-hidden="true">{r.name.charAt(0)}</span><span className="editorial-review-author-copy"><strong>{r.name}</strong><small>{r.meta}</small></span></div>
            </article>
          ))}
        </div>
        <div className="actions reviews-actions">
          <a className="btn" href={reviewLink} target="_blank" rel="noopener noreferrer">Write a review on Google <span aria-hidden="true">↗</span></a>
          <a className="btn ghost" href={mapsLink} target="_blank" rel="noopener noreferrer">See us on Google Maps</a>
        </div>
        <p className="muted note">Review dates are as shown on Google when they were copied to this page.</p>
      </section>
      <Enquire title="Bought from us?" text="We would be grateful if you shared your experience on Google. It helps other families in Pune find us." message="Hello SK Emerald Interior, I would like to share feedback about my order." />
    </>
  )
}
