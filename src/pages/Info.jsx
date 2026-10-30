import { Link } from '../router'
import { Photo, Seo, PageHead, Enquire, Dim } from '../components/ui'
import { BUSINESS, waLink } from '../data/business'
import { SLOTS } from '../data/images'
import { PROCESS, MATERIALS, CARE, FAQS } from '../data/content'

export function Interiors() {
  const rooms = [
    ['Living room', 'Sofa set, centre table and TV wall planned together so colours and finishes belong to one idea.', 'sofas'],
    ['Bedroom', 'A storage bed, wardrobe and matching pieces sized to the room.', 'beds'],
    ['Kitchen', 'Units drawn to your floor plan, with finishes and hardware agreed in writing.', 'modular-kitchens'],
    ['Storage', 'Wardrobes and lofts that use the full wall, with drawers and shelves where you need them.', 'wardrobes'],
    ['Office spaces', 'Reception counters, workstations, meeting tables and storage planned around the way your team works.', 'office-spaces'],
  ]
  return (
    <>
      <Seo path="/interiors" title="Plan a room" description="Plan coordinated furniture for living rooms, bedrooms, kitchens, storage and office spaces in Pune." />
      <PageHead crumbs={[['Home', '/'], ['Interiors']]} title="Plan a room" lead="Bring the furniture in a room together. We help you plan the main pieces, storage, sizes and finishes as one coordinated space. We make and fit furniture; we do not offer structural or architectural services." />
      <section className="wrap rooms">
        {rooms.map(([t, d, slug], i) => { const id = SLOTS.interiors[i][0]; return (
          <article key={t} className={i % 2 ? 'flip rv' : 'rv'}>
            <Photo id={id} ratio={i === 0 || i === 2 || i === 4 ? '4/3' : '4/5'} reveal />
            <div><h2>{t}</h2><p>{d}</p><Link className="textlink" to={`/collections/${slug}`}>See the range</Link></div>
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
      <Seo path="/materials" title="Materials and craftsmanship" description="Board, laminate, upholstery and hardware used by SK Emerald Interior, with care guidance." />
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
      <Seo path="/faq" title="FAQs" description="Answers about measurements, customisation, materials, quotations, delivery and visiting the SK Emerald Interior showroom." />
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
      <Seo path="/privacy" title="Privacy policy" description="How SK Emerald Interior handles the details you share through this website." />
      <PageHead crumbs={[['Home', '/'], ['Privacy']]} title="Privacy policy" />
      <section className="wrap prose">
        <h2>What this website collects</h2>
        <p>This website has no account system or database. If you use the enquiry form, the name, mobile number, interest and message you type are used only to prepare a WhatsApp message in your own browser. Nothing is sent to us until you press send in WhatsApp.</p>
        <h2>How we use your details</h2>
        <p>When you message, call or email us, we use the details you share to reply to your enquiry and prepare a quotation. We do not sell your details.</p>
        <h2>Third parties</h2>
        <p>WhatsApp, your phone network and your email provider handle messages under their own policies. This site loads fonts from Google Fonts, which may receive your IP address. Map links open Google Maps.</p>
        <h2>Cookies and analytics</h2>
        <p>This website does not set cookies or run analytics. If that changes, this page will be updated.</p>
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
      <Seo path="/404" title="Page not found" description="This page could not be found." />
      <PageHead title="That page is not here" lead="The link may be old or mistyped. Try one of these instead.">
        <div className="actions"><Link className="btn" to="/">Home</Link><Link className="btn ghost" to="/collections">Collections</Link><Link className="btn ghost" to="/contact">Contact</Link></div>
      </PageHead>
    </>
  )
}
