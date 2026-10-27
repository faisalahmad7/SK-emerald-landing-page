import { useEffect, useState } from 'react'
import { Link } from '../router'
import { BUSINESS, waLink } from '../data/business'
import { img } from '../data/images'

// Photo: reserves its ratio (no layout shift), fades in, and falls back to a placeholder if a file is missing.
// `reveal` adds the clip-path entrance (see .rv-mask in styles.css); `caption` is a neutral editorial caption.
export function Photo({ id, ratio = '4/3', pos = 'center', eager = false, caption, className = '', sizes, reveal = false, alt }) {
  const im = img(id)
  const [state, setState] = useState('loading')
  if (!im || state === 'error') return <Placeholder ratio={ratio} label={alt || im?.alt} className={className} />
  return (
    <figure className={`photo ${state} ${reveal ? 'rv rv-mask' : ''} ${className}`} style={{ aspectRatio: ratio }}>
      <img src={im.src} srcSet={im.srcSet} sizes={im.srcSet ? sizes || '(min-width: 900px) 50vw, 100vw' : undefined} alt={alt ?? im.alt}
        loading={eager ? 'eager' : 'lazy'} fetchpriority={eager ? 'high' : undefined}
        decoding="async" style={{ objectPosition: pos }}
        onLoad={() => setState('ready')} onError={() => setState('error')} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
export function Placeholder({ ratio = '4/3', label, className = '' }) {
  return (
    <div className={`photo ph ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={label || 'Photograph to be added'}>
      <span>Photograph to be added</span>
    </div>
  )
}
// Dimension-line annotation: a drawn measure with end ticks, labelled with the parts of the piece.
export function Dim({ parts }) {
  return (
    <ul className="dim" aria-label="Made up of">
      {parts.map((p) => <li key={p}>{p}</li>)}
    </ul>
  )
}
export function Seo({ title, description, path = '/', ld }) {
  useEffect(() => {
    const full = path === '/' ? `${BUSINESS.name} | Furniture and interiors in Kondhwa, Pune` : `${title} | ${BUSINESS.name}`
    document.title = full
    const set = (sel, attr, val, make) => {
      let el = document.head.querySelector(sel)
      if (!el) { el = document.createElement(make.tag); Object.entries(make.attrs).forEach(([k, v]) => el.setAttribute(k, v)); document.head.appendChild(el) }
      el.setAttribute(attr, val)
    }
    const url = window.location.origin + path
    set('meta[name="description"]', 'content', description, { tag: 'meta', attrs: { name: 'description' } })
    set('link[rel="canonical"]', 'href', url, { tag: 'link', attrs: { rel: 'canonical' } })
    set('meta[property="og:title"]', 'content', full, { tag: 'meta', attrs: { property: 'og:title' } })
    set('meta[property="og:description"]', 'content', description, { tag: 'meta', attrs: { property: 'og:description' } })
    set('meta[property="og:url"]', 'content', url, { tag: 'meta', attrs: { property: 'og:url' } })
    let s = document.getElementById('page-ld')
    if (ld) {
      if (!s) { s = document.createElement('script'); s.id = 'page-ld'; s.type = 'application/ld+json'; document.head.appendChild(s) }
      s.textContent = JSON.stringify(ld)
    } else s?.remove()
  }, [title, description, path, ld])
  return null
}
export function PageHead({ crumbs, title, lead, children }) {
  return (
    <header className="pagehead wrap">
      {crumbs && (
        <nav aria-label="Breadcrumb" className="crumbs"><ol>
          {crumbs.map(([label, to], i) => <li key={label}>{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</li>)}
        </ol></nav>
      )}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </header>
  )
}
export function Enquire({ title = 'Tell us about your room', text = 'Send a photo and rough measurements on WhatsApp and we will suggest what to make and what it involves.', message = 'Hello SK Emerald Interior, I would like a quotation.' }) {
  return (
    <section className="green enquire"><div className="wrap">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="actions">
        <a className="btn light" href={waLink(message)} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
        <Link className="btn ghost" to="/contact">Visit the showroom</Link>
      </div>
    </div></section>
  )
}
