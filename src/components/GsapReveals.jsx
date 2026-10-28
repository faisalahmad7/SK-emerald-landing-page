import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouter } from '../router'
import { useHeroParallax } from './Layout'

gsap.registerPlugin(ScrollTrigger)

// GSAP scroll reveals are scoped to the active client-side route and fully reverted on navigation.
// Photographs are excluded: no GSAP clip-mask or scale-in effects are applied to images.
export default function GsapReveals() {
  const { path } = useRouter()
  useHeroParallax()

  useEffect(() => {
    const elements = [...document.querySelectorAll('.rv:not(.rv-mask)')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !elements.length) {
      elements.forEach((el) => el.setAttribute('data-in', ''))
      return
    }

    const ctx = gsap.context(() => {
      elements.forEach((el, index) => {
        el.classList.add('gsap-managed')
        const isTile = el.classList.contains('editorial-tile')
        const isRoomImage = el.classList.contains('tri-reveal')
        const roomStartY = el.classList.contains('tri-reveal-1') ? -26
          : el.classList.contains('tri-reveal-2') ? 18 : 28
        const from = { autoAlpha: 0, y: isTile ? 14 : isRoomImage ? roomStartY : 22 }
        if (isRoomImage && el.classList.contains('tri-reveal-2')) from.scale = 0.975
        gsap.fromTo(el, from, {
          autoAlpha: 1, y: 0, scale: 1,
          duration: isTile ? 0.96 : isRoomImage ? 1.08 : 0.82,
          delay: isTile ? (index % 3) * 0.075 : isRoomImage ? (index % 3) * 0.09 : Math.min(index % 4, 3) * 0.045,
          ease: isTile || isRoomImage ? 'power2.out' : 'power3.out',
          overwrite: 'auto',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onComplete: () => el.setAttribute('data-in', ''),
        })
      })
      ScrollTrigger.refresh()
    })

    return () => {
      ctx.revert()
      elements.forEach((el) => el.classList.remove('gsap-managed'))
    }
  }, [path])

  return null
}
