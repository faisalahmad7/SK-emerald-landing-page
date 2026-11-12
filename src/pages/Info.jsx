import { Link } from '../router'
import { Photo, Seo, PageHead, Enquire, Dim } from '../components/ui'
import { BUSINESS, waLink } from '../data/business'
import { SLOTS } from '../data/images'
import { PROCESS, MATERIALS, CARE, FAQS } from '../data/content'

export function Interiors() {
  const rooms = [
    ['Living room', 'Sofa set, centre table and TV wall planned together so colours and finishes belong to one idea.', 'living-room'],
    ['Bedroom', 'A storage bed, wardrobe and matching pieces sized to the room.', 'bedroom'],
    ['Modular kitchen', 'Units drawn to your floor plan, with finishes and hardware agreed in writing.', 'modular-kitchen'],
    ['Office spaces', 'Reception counters, workstations, meeting tables and storage planned around the way your team works.', 'office-spaces'],
  ]
  return (
    <>
      <Seo path="/interiors" title="Home Interiors in Kondhwa & South Pune | SK Emerald Interior" name="Interiors" type="CollectionPage" image={SLOTS.interiors[0][0]}
        description="Living rooms, bedrooms, modular kitchens and offices planned room by room, with furniture made to measure at our factory in Kondhwa, Pune."
        service={{ name: 'Home interiors', type: 'Interior design and custom furniture' }} />
      <PageHead crumbs={[['Home', '/'], ['Interiors']]} title="Home interiors, planned room by room" lead="Bring the furniture in a room together. We help you plan the main pieces, storage, sizes and finishes as one coordinated space. We make and fit furniture; we do not offer structural or architectural services." />
      <section className="wrap rooms">
        {rooms.map(([t, d, slug], i) => { const id = SLOTS.interiors[i][0]; return (
          <article key={t} className={i % 2 ? 'flip rv' : 'rv'}>
            <Link to={`/interiors/${slug}`} className="room-photo-link" aria-label={`See ${t.toLowerCase()} setups`}>
              <Photo id={id} ratio={slug === 'bedroom' ? '4/5' : '4/3'} reveal />
            </Link>
            <div><h2>{t}</h2><p>{d}</p><Link className="textlink" to={`/interiors/${slug}`}>See {t.toLowerCase()} setups</Link></div>
          </article>
        ) })}
      </section>
      <section className="green"><div className="wrap">
        <h2>How a project runs</h2>
        <ol className="steps">{PROCESS.map(([t, d], i) => <li key={t}><span className="step">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </div></section>
      <Enquire title="Send us the room" message="Hello SK Emerald Interior, I would like help planning a room." />
    </>
  )
}

export function Materials() {
  return (
    <>
      <Seo path="/materials" title="Materials We Use: Board, Laminates, Fabrics | SK Emerald" name="Materials" image={SLOTS.materialsPage[0][0]}
        description="The board, laminates, upholstery and hardware SK Emerald Interior uses for furniture in Pune, what to ask for in a quotation, and how to look after each finish." />
      <PageHead crumbs={[['Home', '/'], ['Materials']]} title="Materials and craftsmanship" lead="What we work with, and how to care for it. Specifications vary by product and are confirmed in your written quotation." />
      <section className="wrap mat-grid">
        <dl>{MATERIALS.map(([t, d], i) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
        <div className="mat-img">
          {SLOTS.materialsPage.map(([id, cap], i) => (
            <figure key={id} className={`mat-fig f${i}`}><Photo id={id} ratio={i % 3 === 0 ? '4/5' : '1/1'} reveal /><figcaption>{cap}</figcaption></figure>
          ))}
        </div>
      </section>
      <section className="wrap care">
        <h2>Looking after it</h2>
        <ul className="ticks">{CARE.map((c) => <li key={c}>{c}</li>)}</ul>
        <p className="muted note">Care needs depend on the finish. Ask us if you are unsure about your piece.</p>
      </section>
      <Enquire title="Ask about finishes" message="Hello SK Emerald Interior, I would like to know about finishes and materials." />
    </>
  )
}

export function Faq() {
  return (
    <>
      <Seo path="/faq" title="Custom Furniture FAQs: Prices, Materials, Visits | SK Emerald" name="FAQs" faqs={FAQS}
        description="Answers about custom furniture from SK Emerald Interior in Kondhwa, Pune: sizes, materials, quotations, kitchens, delivery areas and visiting the showroom." />
      <PageHead crumbs={[['Home', '/'], ['FAQs']]} title="Questions, answered" />
      <section className="wrap faq">
        {FAQS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        <p>Something else? <a href={waLink('Hello SK Emerald Interior, I have a question.')} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>.</p>
      </section>
    </>
  )
}

export function Privacy() {
  return (
    <>
      <Seo path="/privacy" title="Privacy Policy | SK Emerald Interior" name="Privacy policy" description="How SK Emerald Interior handles the details you share through this website, the enquiry form, WhatsApp and email. No accounts, no cookies, no data sold." />
      <PageHead crumbs={[['Home', '/'], ['Privacy']]} title="Privacy policy" />
      <section className="wrap prose">
        <h2>What this website collects</h2>
        <p>This website has no account system or database. If you use the enquiry form, the name, mobile number, interest and message you type are used only to prepare a WhatsApp message in your own browser. Nothing is sent to us until you press send in WhatsApp.</p>
        <h2>How we use your details</h2>
        <p>When you message, call or email us, we use the details you share to reply to your enquiry and prepare a quotation. We do not sell your details.</p>
        <h2>Third parties</h2>
        <p>WhatsApp, your phone network and your email provider handle messages under their own policies. Fonts and images are served from this website itself. Map links open Google Maps.</p>
        <h2>Cookies and analytics</h2>
        <p>This website does not set cookies. It may use Cloudflare Web Analytics, which counts page visits without cookies and without building a profile of you. If that changes, this page will be updated.</p>
        <h2>Your choices</h2>
        <p>To ask us to delete messages you have sent, contact us at <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.</p>
        <p className="muted note">This policy describes the website as built and has not been legally reviewed.</p>
      </section>
    </>
  )
}

export function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page not found | SK Emerald Interior" name="Page not found" noindex preload={false} description="This page could not be found. Browse SK Emerald Interior's furniture collections or contact our showroom in Kondhwa, Pune." />
      <PageHead title="That page is not here" lead="The link may be old or mistyped. Try one of these instead.">
        <div className="actions"><Link className="btn" to="/">Home</Link><Link className="btn ghost" to="/collections">Collections</Link><Link className="btn ghost" to="/contact">Contact</Link></div>
      </PageHead>
    </>
  )
}
