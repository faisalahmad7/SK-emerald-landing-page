import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useRouter } from '../router'
import { BUSINESS, waLink, telLink } from '../data/business'
import { COLLECTIONS } from '../data/collections'

const NAV = [['/', 'Home'], ['/collections', 'Collections'], ['/interiors', 'Interiors'], ['/gallery', 'Our work'], ['/contact', 'Contact'], ['/faq', 'FAQs']]
const MOBILE_NAV = [['/', 'Home'], ['/collections', 'Collections'], ['/interiors', 'Interiors'], ['/gallery', 'Our work'], ['/contact', 'Contact'], ['/faq', 'FAQs']]
const logo = `${import.meta.env.BASE_URL}images/logo.png`

// Sets data-in on every .rv element as it scrolls into view (an attribute, because React rewrites className when a photo
// finishes loading). Elements with their own clip-path report zero intersection, so masked photos are observed through
// their parent. Without IntersectionObserver everything is simply shown.
export function RevealObserver() {
  const { path } = useRouter()
  useHeroParallax()
  useEffect(() => {
    const els = [...document.querySelectorAll('.rv:not([data-in])')]
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.setAttribute('data-in', '')); return }
    const watch = new Map()
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return
      watch.get(e.target)?.forEach((t) => t.setAttribute('data-in', '')); io.unobserve(e.target)
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    els.forEach((el) => {
      const host = el.classList.contains('rv-mask') ? el.parentElement : el
      watch.set(host, [...(watch.get(host) || []), el]); io.observe(host)
    })
    return () => io.disconnect()
  }, [path])
  return null
}

// Gentle hero parallax: the photo drifts a few pixels against the scroll. Desktop only, off under reduced motion.
export function useHeroParallax() {
  const { path } = useRouter()
  useEffect(() => {
    const el = document.querySelector('.hero-img')
    if (!el || !window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)').matches) return
    let raf = 0
    const tick = () => { raf = 0; el.style.setProperty('--py', `${Math.min(window.scrollY, 700) * 0.03}px`) }
    const on = () => { if (!raf) raf = requestAnimationFrame(tick) }
    window.addEventListener('scroll', on, { passive: true }); tick()
    return () => { window.removeEventListener('scroll', on); if (raf) cancelAnimationFrame(raf) }
  }, [path])
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { path } = useRouter()
  const btn = useRef(null), drawer = useRef(null)
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    document.body.classList.toggle('locked', open)
    if (!open) return
    const first = drawer.current?.querySelector('a'); first?.focus()
    const key = (e) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus() }
      if (e.key === 'Tab') { // keep focus inside the drawer
        const els = [btn.current, ...drawer.current.querySelectorAll('a')]
        const i = els.indexOf(document.activeElement)
        if (e.shiftKey && i <= 0) { e.preventDefault(); els.at(-1).focus() }
        else if (!e.shiftKey && i === els.length - 1) { e.preventDefault(); els[0].focus() }
      }
    }
    document.addEventListener('keydown', key)
    return () => document.removeEventListener('keydown', key)
  }, [open])
  return (
    <header className={`site-header header-ribbon-contact${open ? ' menu-open' : ''}`}>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>Skip to content</a>
      <div className="bar wrap header-ribbon-contact-inner">
        <Link to="/" className="brand" aria-label={`${BUSINESS.name}, home`}>
          <img src={logo} alt="" width="40" height="40" />
          <span><b>SK Emerald</b><i>Interior</i></span>
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map(([to, l]) => <NavLink key={to} to={to}>{l}</NavLink>)}
        </nav>
        <Link to="/contact" className="btn small quote">Get a quotation</Link>
        <button ref={btn} className="burger" aria-expanded={open} aria-controls="drawer" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>
          <span /><span />
        </button>
      </div>
      <button
        type="button"
        className="drawer-backdrop"
        aria-label="Close navigation menu"
        tabIndex={-1}
        hidden={!open}
        onClick={() => { setOpen(false); btn.current?.focus() }}
      />
      <div id="drawer" ref={drawer} className={`drawer${open ? ' open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          {MOBILE_NAV.map(([to, l]) => <NavLink key={to} to={to}>{l}</NavLink>)}
        </nav>
        <a className="btn" href={waLink('Hello SK Emerald Interior, I would like a quotation.')} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap grid">
        <div className="f-brand">
          <img src={logo} alt="" width="52" height="52" />
          <p className="fname">{BUSINESS.name}</p>
          <p className="muted">{BUSINESS.altName} &middot; <i>{BUSINESS.tagline}</i></p>
          <address>{BUSINESS.showroom.lines.map((l) => <span key={l}>{l}</span>)}</address>
        </div>
        <div className="footer-desktop-column"><h2>Collections</h2>{COLLECTIONS.map((c) => <Link key={c.slug} to={`/collections/${c.slug}`}>{c.name}</Link>)}<Link to="/collections">All collections</Link></div>
        <div className="footer-desktop-column"><h2>Explore</h2><Link to="/interiors">Interior solutions</Link><Link to="/gallery">Our work</Link><Link to="/materials">Materials</Link><Link to="/faq">FAQs</Link></div>
        <div className="footer-desktop-column"><h2>Contact</h2>
          {BUSINESS.phones.map((p) => <a key={p.tel} href={telLink(p)}>{p.display}</a>)}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <Link to="/contact">Showroom and directions</Link>
        </div>
        <div className="footer-mobile-accordions" aria-label="Footer navigation">
          <details><summary>Collections</summary><div className="footer-accordion-links">{COLLECTIONS.map((c) => <Link key={c.slug} to={`/collections/${c.slug}`}>{c.name}</Link>)}<Link to="/collections">All collections</Link></div></details>
          <details><summary>Explore</summary><div className="footer-accordion-links"><Link to="/gallery">Our work</Link><Link to="/materials">Materials</Link><Link to="/faq">FAQs</Link></div></details>
          <details><summary>Contact</summary><div className="footer-accordion-links">
            {BUSINESS.phones.map((p) => <a key={p.tel} href={telLink(p)}>{p.display}</a>)}
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div></details>
        </div>
        <p className="legal">Specifications, finishes and prices are confirmed in your written quotation. Interior inspiration is for reference only. <Link to="/privacy">Privacy policy</Link></p>
      </div>
      <div className="f-mark footer-wordmark" aria-hidden="true">SK Emerald</div>
    </footer>
  )
}

export function WhatsAppFab() {
  return (
    <a className="fab" href={waLink('Hello SK Emerald Interior, I would like a quotation.')} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 19L4 20Z" /><path d="M9 9c0 3 3 6 6 6l1.2-1.4-2-1-1 .7c-.9-.4-1.6-1.1-2-2l.7-1-1-2L9 9Z" /></svg>
      <span>WhatsApp</span>
    </a>
  )
}
