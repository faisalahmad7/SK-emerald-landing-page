import { useEffect, useRef, useState } from 'react'
import { Link } from '../router'
import { waLink } from '../data/business'

const VIDEO = `${import.meta.env.BASE_URL}videos/interior-transformation.mp4`
const POSTER = `${import.meta.env.BASE_URL}videos/interior-transformation-poster.webp`

// The clip is a ~15s portrait video. The work-in-progress wall runs to ~5s, a white flash covers the cut, and the finished
// bedroom follows. SWITCH_AT is where the label flips from "Before" to "After" and where the second toggle seeks to.
const SWITCH_AT = 5.2
const FALLBACK_DURATION = 14.7

const STEPS = [
  ['01', 'Measure & plan', 'The room’s own proportions decide the layout.'],
  ['02', 'Build & finish', 'Wall panelling, storage and lighting come first.'],
  ['03', 'Furnish & style', 'Bed, soft furnishings and finishing touches are fitted around it.'],
]

const Icon = ({ d, filled }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
)

export default function TransformationVideo() {
  const videoRef = useRef(null)
  const frameRef = useRef(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(FALLBACK_DURATION)

  const stage = time < SWITCH_AT ? 'before' : 'after'
  const switchPct = Math.min(100, (SWITCH_AT / duration) * 100)

  // Play (muted) while the video is on screen, pause when it scrolls away. Reduced-motion visitors get a poster and press play.
  useEffect(() => {
    const video = videoRef.current
    const frame = frameRef.current
    if (!video || !frame) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!reduce && !userPaused.current) video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { threshold: 0.5 })
    io.observe(frame)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) { userPaused.current = false; video.play().catch(() => {}) } else { userPaused.current = true; video.pause() }
  }

  const seek = (seconds) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = seconds
    setTime(seconds)
    userPaused.current = false
    video.play().catch(() => {})
  }

  const scrub = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    seek(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * duration)
  }

  return (
    <section className="sk-tf" aria-labelledby="sk-tf-title">
      <div className="wrap">
        <div className="sk-tf-panel">
          <div className="sk-tf-copy rv">
            <p className="editorial-eyebrow"><span /> The transformation</p>
            <h2 id="sk-tf-title">From bare boards to <em>a room you’ll love.</em></h2>
            <p className="sk-tf-lead">Watch a plain plywood wall become a finished bedroom — shaped around the space, then furnished and finished to match.</p>
            <p className="sk-tf-body">A fluted TV wall with warm edge lighting, a floating console, a quilted headboard and a mirrored wardrobe. Each piece is planned together, so the finished room feels like one idea rather than a set of separate purchases.</p>

            <ol className="sk-tf-steps">
              {STEPS.map(([n, title, text]) => (
                <li key={n}><span>{n}</span><div><b>{title}</b><p>{text}</p></div></li>
              ))}
            </ol>

            <div className="sk-tf-actions">
              <a className="btn editorial-btn" href={waLink('Hello SK Emerald Interior, I watched the before and after video and would like to plan my interiors.')} target="_blank" rel="noopener noreferrer">Plan your own room <span aria-hidden="true">↗</span></a>
              <Link to="/interiors" className="editorial-text-link">See our interiors <span aria-hidden="true">↗</span></Link>
            </div>
          </div>

          <div className="sk-tf-stage rv" style={{ '--d': 2 }}>
            <div className="sk-tf-frame" ref={frameRef} data-stage={stage} data-playing={playing ? '' : undefined}>
              <video
                ref={videoRef}
                className="sk-tf-video"
                src={VIDEO}
                poster={POSTER}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Before and after: a plywood TV wall under construction becomes a finished bedroom"
                onClick={toggle}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || FALLBACK_DURATION)}
              />

              <div className="sk-tf-tags" aria-live="polite">
                <span className="sk-tf-tag sk-tf-tag-before">Before</span>
                <span className="sk-tf-tag sk-tf-tag-after">After</span>
              </div>

              <button type="button" className="sk-tf-bigplay" onClick={toggle} aria-label="Play video">
                <Icon d="M8 5.5v13l11-6.5z" filled />
              </button>

              <div className="sk-tf-bar">
                <button type="button" className="sk-tf-round" onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'}>
                  {playing ? <Icon d="M8 5v14M16 5v14" /> : <Icon d="M8 5.5v13l11-6.5z" filled />}
                </button>
                <div className="sk-tf-track" onClick={scrub} role="presentation">
                  <span className="sk-tf-fill" style={{ width: `${Math.min(100, (time / duration) * 100)}%` }} />
                  <span className="sk-tf-notch" style={{ left: `${switchPct}%` }} />
                </div>
              </div>
            </div>

            <div className="sk-tf-switch" role="group" aria-label="Jump to before or after">
              <button type="button" className={stage === 'before' ? 'on' : ''} aria-pressed={stage === 'before'} onClick={() => seek(0)}>
                <span>01</span><b>Before</b><small>Work in progress</small>
              </button>
              <button type="button" className={stage === 'after' ? 'on' : ''} aria-pressed={stage === 'after'} onClick={() => seek(SWITCH_AT + 0.5)}>
                <span>02</span><b>After</b><small>Finished &amp; furnished</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
