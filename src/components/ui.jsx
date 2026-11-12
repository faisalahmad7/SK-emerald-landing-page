import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link } from '../router'
import { waLink } from '../data/business'
import { img } from '../data/images'
import { buildMeta, applyHead } from '../seo/head'

// Photo: reserves its ratio (no layout shift) and falls back to a placeholder if a file is missing.
// Images render immediately without load, clip-mask, or scale-in animations; `caption` is neutral editorial text.
export function Photo({ id, ratio = '4/3', pos = 'center', eager = false, caption, className = '', sizes, reveal = false, alt }) {
  const im = img(id)
  const ref = useRef(null)
  const [state, setState] = useState('loading')
  const [usingFallback, setUsingFallback] = useState(false)
  const fail = () => {
    if (!usingFallback && im?.fallbackSrc) { setUsingFallback(true); setState('loading') }
    else setState('error')
  }
  // Pre-rendered pages: the image may finish (or fail) before React attaches its handlers, so check once on mount.
  useEffect(() => {
    const el = ref.current
    if (el?.complete) { if (el.naturalWidth) setState('ready'); else if (el.currentSrc) fail() }
  }, [])
  if (!im || state === 'error') return <Placeholder ratio={ratio} label={alt || im?.alt} className={className} />
  return (
    <figure className={`photo ${state} ${className}`} style={{ aspectRatio: ratio }}>
      <img ref={ref} src={usingFallback && im.fallbackSrc ? im.fallbackSrc : im.src} srcSet={!usingFallback ? im.srcSet : undefined} sizes={!usingFallback && im.srcSet ? sizes || '(min-width: 900px) 50vw, 100vw' : undefined} alt={alt ?? im.alt}
        loading={eager ? 'eager' : 'lazy'} fetchpriority={eager ? 'high' : undefined}
        decoding="async" style={{ objectPosition: pos }}
        onLoad={() => setState('ready')}
        onError={fail} />
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
// Collects the page's head data while pre-rendering (the build passes an object through this context).
export const HeadContext = createContext(null)
let firstApply = true

/**
 * Page metadata. Props: path, title (full title with "|", or a short one that gets "| SK Emerald Interior"),
 * name (short page name for breadcrumbs), description, image (image id or /path), type (schema page type),
 * faqs [[q, a]], service {name, type}, items [[name, detail]], article {...}, noindex.
 */
export function Seo(props) {
  const collector = useContext(HeadContext)
  const meta = buildMeta(props)
  if (collector) collector.meta = meta
  const key = JSON.stringify([props.path, props.title, props.description, props.faqs?.length])
  useEffect(() => {
    // The pre-rendered HTML already carries this page's tags; only rewrite them after client-side navigation.
    if (firstApply && document.querySelector('script[type="application/ld+json"]')) { firstApply = false; return }
    firstApply = false
    applyHead(meta)
  }, [key])
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
export function Enquire({ title = 'Tell us about your room', text = 'Send a photo and rough measurements on WhatsApp and we will suggest what to make and what it involves.', message = 'Hi SK Emerald Interior, I would like to discuss a furniture or interior requirement. Please share the available options, customisation details and indicative pricing. Thank you.' }) {
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
