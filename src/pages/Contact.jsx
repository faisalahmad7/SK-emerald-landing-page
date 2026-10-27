import { useState } from 'react'
import { Seo, PageHead } from '../components/ui'
import { BUSINESS, waLink, mapsLink, telLink } from '../data/business'

const INTERESTS = ['Sofa', 'Recliner', 'Bed', 'Wardrobe', 'Modular kitchen', 'TV unit', 'Whole room or home', 'Something else']

export default function Contact() {
  const [v, setV] = useState({ name: '', phone: '', interest: '', message: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const digits = v.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
    const er = {}
    if (v.name.trim().length < 2) er.name = 'Enter your name.'
    if (!/^[6-9]\d{9}$/.test(digits)) er.phone = 'Enter a 10-digit mobile number, for example 98765 43210.'
    if (!v.interest) er.interest = 'Choose what you are looking for.'
    setErr(er); setSent(false)
    if (Object.keys(er).length) { document.getElementById(`f-${Object.keys(er)[0]}`)?.focus(); return }
    const text = `Hello SK Emerald Interior, I am ${v.name.trim()}. I am looking for: ${v.interest}.${v.message.trim() ? `\n${v.message.trim()}` : ''}\nMy number: ${digits}`
    window.open(waLink(text), '_blank', 'noopener')
    setSent(true)
  }
  const field = (k, label, el) => (
    <div className={`field${err[k] ? ' bad' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>{el}
      {err[k] && <p className="err" id={`e-${k}`} role="alert">{err[k]}</p>}
    </div>
  )
  const aria = (k) => ({ id: `f-${k}`, 'aria-invalid': !!err[k], 'aria-describedby': err[k] ? `e-${k}` : undefined })
  return (
    <>
      <Seo path="/contact" title="Contact and showroom" description="Visit SK Emerald Interior at Unitas Fashion Centre, Kondhwa Khurd, Pune, or call and message us on WhatsApp." />
      <PageHead crumbs={[['Home', '/'], ['Contact']]} title="Contact and showroom" lead="Call, message on WhatsApp, or visit. Photos and rough measurements are the best way to start." />
      <section className="wrap contact">
        <div className="cinfo">
          <h2>Showroom</h2>
          <address>{BUSINESS.showroom.lines.map((l) => <span key={l}>{l}</span>)}</address>
          <p className="muted">Please call or message first to confirm visiting times.</p>
          <a className="btn small" href={mapsLink} target="_blank" rel="noopener noreferrer">Get directions</a>
          <h2>Talk to us</h2>
          <ul className="clist">
            {BUSINESS.phones.map((p) => <li key={p.tel}><span>Call</span><a href={telLink(p)}>{p.display}</a></li>)}
            <li><span>WhatsApp</span><a href={waLink()} target="_blank" rel="noopener noreferrer">Start a chat</a></li>
            <li><span>Email</span><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
          </ul>
        </div>
        <form className="eform" onSubmit={submit} noValidate>
          <h2>Send an enquiry</h2>
          {field('name', 'Your name', <input {...aria('name')} value={v.name} onChange={set('name')} autoComplete="name" />)}
          {field('phone', 'Mobile number', <input {...aria('phone')} value={v.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />)}
          {field('interest', 'Looking for', <select {...aria('interest')} value={v.interest} onChange={set('interest')}><option value="">Choose one</option>{INTERESTS.map((i) => <option key={i}>{i}</option>)}</select>)}
          {field('message', 'Message (optional)', <textarea {...aria('message')} rows="4" value={v.message} onChange={set('message')} />)}
          <button className="btn" type="submit">Continue on WhatsApp</button>
          <p className="muted note" aria-live="polite">
            {sent ? 'WhatsApp should now be open with your message. Your enquiry reaches us only when you press send there. If it did not open, email us instead.' : 'This opens WhatsApp with your message ready to send. Nothing is sent until you press send there.'}
          </p>
          <a className="textlink" href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Enquiry from website')}`}>Prefer email?</a>
        </form>
      </section>
    </>
  )
}
