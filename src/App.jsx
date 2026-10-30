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

let introSoundPlayed = false

// A restrained, cinematic tonal swell: warm low harmonics, a slow airy rise and a soft release.
// It is attempted on arrival; browsers that block autoplay may allow it after an early user gesture.
function playWelcomeSoundAutomatically() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass || introSoundPlayed) return () => {}
  let context
  let cancelled = false
  let started = false
  let gestureTimer
  const listeners = ['pointerdown', 'keydown', 'touchstart']
  const removeListeners = () => listeners.forEach((name) => document.removeEventListener(name, resumeAndPlay, true))

  const createSound = () => {
    if (cancelled || started || !context || context.state !== 'running' || introSoundPlayed) return
    started = true
    introSoundPlayed = true
    removeListeners()
    const now = context.currentTime + 0.045
    const master = context.createGain()
    master.gain.setValueAtTime(0.0001, now)
    master.gain.exponentialRampToValueAtTime(0.42, now + 0.34)
    master.gain.setValueAtTime(0.42, now + 1.05)
    master.gain.exponentialRampToValueAtTime(0.0001, now + 2.65)
    master.connect(context.destination)

    const filter = context.createBiquadFilter()
    filter.type = 'lowpass'
    filter.Q.setValueAtTime(0.35, now)
    filter.frequency.setValueAtTime(520, now)
    filter.frequency.exponentialRampToValueAtTime(1750, now + 0.9)
    filter.frequency.exponentialRampToValueAtTime(920, now + 2.5)
    filter.connect(master)

    const voices = [
      { frequency: 73.42, level: 0.042, detune: -2 },
      { frequency: 146.83, level: 0.052, detune: 0 },
      { frequency: 220.00, level: 0.030, detune: 2 },
      { frequency: 293.66, level: 0.018, detune: -1 },
      { frequency: 440.00, level: 0.004, detune: 1 },
    ]
    voices.forEach(({ frequency, level, detune }) => {
      const oscillator = context.createOscillator()
      const envelope = context.createGain()
      oscillator.type = 'sine'
      oscillator.detune.setValueAtTime(detune, now)
      oscillator.frequency.setValueAtTime(frequency * 0.988, now)
      oscillator.frequency.exponentialRampToValueAtTime(frequency, now + 0.72)
      envelope.gain.setValueAtTime(0.0001, now)
      envelope.gain.exponentialRampToValueAtTime(level, now + 0.42)
      envelope.gain.setValueAtTime(level * 0.72, now + 1.05)
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + 2.6)
      oscillator.connect(envelope)
      envelope.connect(filter)
      oscillator.start(now)
      oscillator.stop(now + 2.72)
    })

    // A very soft low-frequency bloom adds body on headphones without a sharp impact.
    const bloom = context.createOscillator()
    const bloomGain = context.createGain()
    bloom.type = 'sine'
    bloom.frequency.setValueAtTime(54, now)
    bloom.frequency.exponentialRampToValueAtTime(42, now + 0.5)
    bloomGain.gain.setValueAtTime(0.0001, now)
    bloomGain.gain.exponentialRampToValueAtTime(0.028, now + 0.035)
    bloomGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.78)
    bloom.connect(bloomGain)
    bloomGain.connect(master)
    bloom.start(now)
    bloom.stop(now + 0.82)
    window.setTimeout(() => context?.close().catch(() => {}), 3150)
  }

  const resumeAndPlay = () => {
    if (!context || cancelled || started) return
    try {
      const result = context.resume()
      result.then(createSound).catch(() => {})
      if (context.state === 'running') createSound()
    } catch {
      // Audio is optional; visual intro continues even if audio is unavailable.
    }
  }

  try {
    context = new AudioContextClass()
    listeners.forEach((name) => document.addEventListener(name, resumeAndPlay, { once: true, capture: true, passive: name === 'touchstart' }))
    gestureTimer = window.setTimeout(removeListeners, 1950)
    resumeAndPlay()
  } catch {
    context?.close().catch(() => {})
  }

  return () => {
    cancelled = true
    if (gestureTimer) window.clearTimeout(gestureTimer)
    removeListeners()
    if (context && !started) context.close().catch(() => {})
  }
}
function IntroLoader() {
  const [phase, setPhase] = useState('showing')
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stopAudioAttempt = playWelcomeSoundAutomatically()
    const opening = window.setTimeout(() => setPhase('opening'), reduceMotion ? 80 : 1320)
    const finished = window.setTimeout(() => setPhase('gone'), reduceMotion ? 220 : 2180)
    return () => {
      window.clearTimeout(opening)
      window.clearTimeout(finished)
      stopAudioAttempt?.()
    }
  }, [])
  if (phase === 'gone') return null
  return (
    <div className={`sk-intro-loader${phase === 'opening' ? ' is-opening' : ''}`} role="status" aria-label="SK Emerald Interior is opening">
      <div className="sk-loader-content">
        <div className="sk-loader-mark"><img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="" width="76" height="76" /></div>
        <p className="sk-loader-wordmark">SK EMERALD <span>INTERIOR</span></p>
        <p className="sk-loader-caption">Thoughtfully made for living.</p>
      </div>
    </div>
  )
}

function Routes() {
  const { path } = useRouter()
  const isPhone = window.matchMedia?.('(max-width: 760px)').matches
  // Phone navigation keeps each merged destination to one simple page.
  if (isPhone && path === '/interiors') return <Collections />
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
