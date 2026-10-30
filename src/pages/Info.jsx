import { Link } from '../router'
import { Photo, Seo, PageHead, Enquire, Dim } from '../components/ui'
import { BUSINESS, waLink, mapsLink, telLink } from '../data/business'
import { SLOTS } from '../data/images'
import { PROCESS, MATERIALS, CARE, FAQS } from '../data/content'

export function Interiors() {
  const rooms = [
    ['Living room', 'Sofa set, centre table and TV wall planned together so colours and finishes belong to one idea.', 'sofas'],
    ['Bedroom', 'A storage bed, wardrobe and matching pieces sized to the room.', 'beds'],
    ['Kitchen', 'Units drawn to your floor plan, with finishes and hardware agreed in writing.', 'modular-kitchens'],
    ['Storage', 'Wardrobes and lofts that use the full wall, with drawers and shelves where you need them.', 'wardrobes'],
  ]
  return (
    <>
      <Seo path="/interiors" title="Interior solutions" description="Coordinated furniture for living rooms, bedrooms, kitchens and storage, made to measure in Pune." />
      <PageHead crumbs={[['Home', '/'], ['Interiors']]} title="Interior solutions" lead="Furniture that is planned as a set for one room, so the pieces match in size, colour and finish. We make and fit furniture. We do not offer structural or architectural services." />
      <section className="wrap rooms">
        {rooms.map(([t, d, slug], i) => { const id = SLOTS.interiors[i][0]; return (
          <article key={t} className={i % 2 ? 'flip' : ''}>
            <Photo id={id} ratio={i === 0 || i === 2 ? '4/3' : '4/5'} reveal />
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

export function About() {
  return (
    <>
      <Seo path="/about" title="About" description="SK Emerald Interior is a furniture manufacturer and retailer in Kondhwa, Pune, making sofas, kitchens, wardrobes, beds and TV units to measure." />
      <PageHead crumbs={[['Home', '/'], ['About']]} title="About SK Emerald Interior" lead="A furniture manufacturer and retailer in Kondhwa, Pune, also known as Emerald Furniture." />
      <section className="wrap about">
        <div className="about-img"><Photo id={SLOTS.aboutMain} ratio="4/3" reveal eager sizes="(min-width: 800px) 48vw, 90vw" /><Photo id={SLOTS.aboutInset} ratio="1/1" className="b" reveal eager sizes="(min-width: 800px) 18vw, 34vw" /></div>
        <div>
          <p>We make sofas, recliners, beds, wardrobes, kitchens and TV units, and take on wooden doors, wood polishing and furniture for offices and institutions. Customers come from Pune and from other parts of Maharashtra.</p>
          <p>Because the pieces are made to order, the size, fabric and finish can change before anything is cut. Our promise is on the logo: <i>{BUSINESS.tagline}</i>.</p>
          <p>Visit the showroom at Unitas Fashion Centre, Kondhwa Khurd, to see finishes in person.</p>
          <Link className="btn" to="/contact">Showroom and contact</Link>
        </div>
      </section>
      <section className="mobile-contact-merge">
        <div className="wrap mobile-contact-card">
          <div>
            <p className="editorial-eyebrow"><span /> Visit or get in touch</p>
            <h2>Talk through what you need.</h2>
            <p>Share a photo, rough measurements or a room idea. We can help you choose the next step.</p>
          </div>
          <address>{BUSINESS.showroom.lines.map((line) => <span key={line}>{line}</span>)}</address>
          <div className="mobile-contact-actions">
            {BUSINESS.phones.map((phone) => <a className="mobile-contact-call" href={telLink(phone)} key={phone.tel}>Call {phone.display}</a>)}
            <a className="btn" href={waLink('Hello SK Emerald Interior, I would like to discuss a furniture or interior enquiry.')} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            <a className="mobile-contact-directions" href={mapsLink} target="_blank" rel="noopener noreferrer">Get directions ↗</a>
          </div>
          <p className="mobile-contact-email"><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></p>
        </div>
      </section>
      <section className="green"><div className="wrap principles">
        <div><h2>Made to measure</h2><p>Your room sets the size. Colour and finish are your choice.</p></div>
        <div><h2>Explained clearly</h2><p>What goes into each piece is written in your quotation before you pay.</p></div>
        <div><h2>Made and sold by us</h2><p>You deal with the people who sell and make your order.</p></div>
      </div></section>
      <Enquire />
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
