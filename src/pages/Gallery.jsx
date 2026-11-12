import { useEffect, useRef, useState } from 'react'
import { Link } from '../router'
import { Photo, Seo, PageHead, Enquire } from '../components/ui'
import { GALLERY_IMAGES } from '../data/images'

const FILTERS = [['all', 'All'], ['living', 'Living rooms'], ['sofas', 'Sofas'], ['recliners', 'Recliners'], ['kitchens', 'Kitchens'], ['wardrobes', 'Wardrobes'], ['beds', 'Beds'], ['tv', 'TV units']]
const RATIOS = ['4/3', '4/5', '1/1', '3/4', '5/4']

// Two pages: /gallery shows the shop's own furniture; /design-ideas shows clearly labelled illustrative interiors.
export default function Gallery({ set = 'work' }) {
  const [f, setF] = useState('all')
  const [open, setOpen] = useState(null)
  useEffect(() => { setF('all'); setOpen(null) }, [set])
  const pool = GALLERY_IMAGES.filter((i) => i.kind === set && i.src.startsWith('/'))
  const filters = FILTERS.filter(([k]) => k === 'all' || pool.some((i) => i.tags.includes(k)))
  const list = pool.filter((i) => f === 'all' || i.tags.includes(f))
  const work = set === 'work'
  return (
    <>
      {work
        ? <Seo path="/gallery" title="Our Work: Furniture We Have Made in Pune | SK Emerald Interior" name="Our work" type="CollectionPage" image={13}
            description="Photographs of sofas, recliners, kitchens, wardrobes, beds and TV units made by SK Emerald Interior at our factory in Kondhwa, Pune." />
        : <Seo path="/design-ideas" title="Design Ideas: Interiors We Can Build To | SK Emerald Interior" name="Design ideas" type="CollectionPage" image="living-sage"
            description="Illustrative living rooms, bedrooms, kitchens and TV walls showing styles and finishes SK Emerald Interior can make to measure in Pune." />}
      <PageHead crumbs={[['Home', '/'], [work ? 'Our work' : 'Design ideas']]} title={work ? 'Our work' : 'Design ideas'}
        lead={work ? 'Photographs of furniture made by SK Emerald Interior.' : 'Illustrative interiors that show a style or finish we can build to. They are not completed SK Emerald projects.'} />
      <section className="wrap">
        <div className="gtabs" role="group" aria-label="Choose a set of photographs">
          <Link to="/gallery" aria-current={work ? 'page' : undefined} className={work ? 'on' : ''}>Our furniture</Link>
          <Link to="/design-ideas" aria-current={!work ? 'page' : undefined} className={!work ? 'on' : ''}>Design ideas</Link>
        </div>
                {set === 'inspiration' && (
          <div className="chips" role="group" aria-label="Filter design inspiration">
            {filters.map(([k, l]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>)}
          </div>
        )}
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
      <p>{im.alt}</p>
    </div>
  )
}
