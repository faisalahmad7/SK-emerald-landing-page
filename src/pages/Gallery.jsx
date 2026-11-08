import { useEffect, useRef, useState } from 'react'
import { Photo, Seo, PageHead, Enquire } from '../components/ui'
import { GALLERY_IMAGES } from '../data/images'

const FILTERS = [['all', 'All'], ['living', 'Living rooms'], ['sofas', 'Sofas'], ['recliners', 'Recliners'], ['kitchens', 'Kitchens'], ['wardrobes', 'Wardrobes'], ['beds', 'Beds'], ['tv', 'TV units']]
const SETS = [['work', 'Our furniture'], ['inspiration', 'Design inspiration']]
const RATIOS = ['4/3', '4/5', '1/1', '3/4', '5/4']

export default function Gallery() {
  const [set, setSet] = useState('work')
  const [f, setF] = useState('all')
  const [open, setOpen] = useState(null)
  const pool = GALLERY_IMAGES.filter((i) => i.kind === set)
  const filters = FILTERS.filter(([k]) => k === 'all' || pool.some((i) => i.tags.includes(k)))
  const list = pool.filter((i) => f === 'all' || i.tags.includes(f))
  const choose = (k) => { setSet(k); setF('all'); setOpen(null) }
  return (
    <>
      <Seo path="/gallery" title="Our work" description="Photographs of sofas, recliners, kitchens, wardrobes, beds and TV units from SK Emerald Interior, Pune." />
      <PageHead crumbs={[['Home', '/'], ['Our work']]} title="Our work" lead="Photographs of furniture from SK Emerald Interior, and a separate set of design inspiration for finishes and layouts we can build to." />
      <section className="wrap">
        <div className="gtabs" role="group" aria-label="Choose a set of photographs">
          {SETS.map(([k, l]) => <button key={k} type="button" aria-pressed={set === k} onClick={() => choose(k)}>{l}</button>)}
        </div>
        {set === 'inspiration' && <p className="muted note gnote">Illustrative interiors that show a style or finish we can build to. They are not completed SK Emerald projects.</p>}
        <div className="chips" role="group" aria-label="Filter photographs">
          {filters.map(([k, l]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>)}
        </div>
        <p className="muted count" aria-live="polite">{list.length} photographs</p>
        <div className="masonry">
          {list.map((i, n) => (
            <button key={i.id} type="button" className="mitem" onClick={() => setOpen(n)} aria-label={`View larger: ${i.alt}`}>
              <Photo id={i.id} ratio={RATIOS[(i.id * 7) % RATIOS.length]} />
            </button>
          ))}
        </div>
      </section>
      {open !== null && <Lightbox list={list} index={open} setIndex={setOpen} />}
      <Enquire title="Like what you see?" text="Send us a photo of the look you want and your room measurements." />
    </>
  )
}

function Lightbox({ list, index, setIndex }) {
  const close = useRef(null), prior = useRef(document.activeElement)
  const n = list.length
  const step = (d) => setIndex((index + d + n) % n)
  useEffect(() => {
    close.current?.focus(); document.body.classList.add('locked')
    const back = prior.current
    return () => { document.body.classList.remove('locked'); back?.focus?.() }
  }, [])
  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') setIndex(null)
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Tab') { const b = [...document.querySelectorAll('.lightbox button')]; const i = b.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); b.at(-1).focus() } else if (!e.shiftKey && i === b.length - 1) { e.preventDefault(); b[0].focus() } }
    }
    document.addEventListener('keydown', key); return () => document.removeEventListener('keydown', key)
  })
  const im = list[index]
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photograph viewer" onClick={(e) => e.target === e.currentTarget && setIndex(null)}>
      <button ref={close} className="lb-x" onClick={() => setIndex(null)} aria-label="Close">&times;</button>
      <button className="lb-nav prev" onClick={() => step(-1)} aria-label="Previous photograph">&lsaquo;</button>
      <img key={im.id} src={im.src} alt={im.alt} />
      <button className="lb-nav next" onClick={() => step(1)} aria-label="Next photograph">&rsaquo;</button>
      <p>{im.alt} &middot; {index + 1} of {n}</p>
    </div>
  )
}
