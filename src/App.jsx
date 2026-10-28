import { useEffect, useState } from 'react'
import { Router, useRouter } from './router'
import { Header, Footer, WhatsAppFab } from './components/Layout'
import GsapReveals from './components/GsapReveals'
import Home from './pages/Home'
import { Collections, Collection } from './pages/Collections'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import { Interiors, About, Materials, Faq, Privacy, NotFound } from './pages/Info'
import { bySlug } from './data/collections'

function playWelcomeChime() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return
  let context
  try {
    context = new AudioContextClass()
    const now = context.currentTime + 0.025
    const notes = [
      { frequency: 1318.51, delay: 0, duration: 0.54, level: 0.065 },
      { frequency: 1760.00, delay: 0.075, duration: 0.62, level: 0.038 },
      { frequency: 2637.02, delay: 0.15, duration: 0.42, level: 0.016 },
    ]
    notes.forEach(({ frequency, delay, duration, level }) => {
      const tone = context.createOscillator()
      const envelope = context.createGain()
      tone.type = 'sine'
      tone.frequency.setValueAtTime(frequency, now + delay)
      envelope.gain.setValueAtTime(0.0001, now + delay)
      envelope.gain.exponentialRampToValueAtTime(level, now + delay + 0.018)
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration)
      tone.connect(envelope)
      envelope.connect(context.destination)
      tone.start(now + delay)
      tone.stop(now + delay + duration + 0.04)
    })
    window.setTimeout(() => context?.close().catch(() => {}), 1200)
  } catch {
    context?.close().catch(() => {})
  }
}

function IntroLoader() {
  const [phase, setPhase] = useState('showing')
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Play on entry only when this browser already permits audio; otherwise the
    // visible chime control provides a user-gesture fallback without surprise audio.
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      let probe
      try {
        probe = new AudioContextClass()
        if (probe.state === 'running') {
          probe.close().catch(() => {})
          playWelcomeChime()
        } else probe.close().catch(() => {})
      } catch {
        probe?.close().catch(() => {})
      }
    }
    const opening = window.setTimeout(() => setPhase('opening'), reduceMotion ? 80 : 1320)
    const finished = window.setTimeout(() => setPhase('gone'), reduceMotion ? 220 : 2180)
    return () => { window.clearTimeout(opening); window.clearTimeout(finished) }
  }, [])
  if (phase === 'gone') return null
  return (
    <div className={`sk-intro-loader${phase === 'opening' ? ' is-opening' : ''}`} role="status" aria-label="SK Emerald Interior is opening">
      <div className="sk-loader-content">
        <div className="sk-loader-mark"><img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="" width="76" height="76" /></div>
        <p className="sk-loader-wordmark">SK EMERALD <span>INTERIOR</span></p>
        <p className="sk-loader-caption">Thoughtfully made for living.</p>
        <button className="sk-loader-sound" type="button" onClick={playWelcomeChime} aria-label="Play the welcome chime">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 8v4h3l4 3V5L6 8H3Z" /><path d="M13 7.2c1.8 1.6 1.8 4 0 5.6M15 5c3 2.6 3 7.4 0 10" /></svg>
          <span>Play welcome chime</span>
        </button>
      </div>
    </div>
  )
}

function Routes() {
  const { path } = useRouter()
  const m = path.match(/^\/collections\/([^/]+)$/)
  if (m) return bySlug(m[1]) ? <Collection slug={m[1]} /> : <NotFound />
  switch (path) {
    case '/': return <Home />
    case '/collections': return <Collections />
    case '/interiors': return <Interiors />
    case '/gallery': return <Gallery />
    case '/about': return <About />
    case '/materials': return <Materials />
    case '/contact': return <Contact />
    case '/faq': return <Faq />
    case '/privacy': return <Privacy />
    default: return <NotFound />
  }
}
export default function App() {
  return (
    <Router>
      <IntroLoader />
      <Header />
      <main id="main" tabIndex={-1}><Routes /></main>
      <GsapReveals />
      <Footer />
      <WhatsAppFab />
    </Router>
  )
}
