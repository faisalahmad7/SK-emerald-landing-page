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
        gsap.fromTo(el, { autoAlpha: 0, y: 22 }, {
          autoAlpha: 1, y: 0,
          duration: 0.82,
          delay: Math.min(index % 4, 3) * 0.045,
          ease: 'power3.out',
          overwrite: 'auto',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onComplete: () => el.setAttribute('data-in', ''),
        })
      })

      // Homepage-only motion: staggered editorial entrances and restrained scroll-linked drift.
      // The existing hero photo and its mapping are deliberately untouched.
      if (path === '/') {
        const tiles = [...document.querySelectorAll('.editorial-mosaic .editorial-tile')]
        tiles.forEach((el, index) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 30 }, {
            autoAlpha: 1, y: 0,
            duration: 0.9,
            delay: (index % 3) * 0.055,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          })
        })

        const roomCards = [...document.querySelectorAll('.editorial-triptych .tri')]
        roomCards.forEach((el, index) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 24 }, {
            autoAlpha: 1, y: 0,
            duration: 0.85,
            delay: index * 0.07,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })

        const introVisual = document.querySelector('.editorial-intro-visual')
        if (introVisual) {
          gsap.fromTo(introVisual, { y: 16 }, {
            y: -12,
            ease: 'none',
            scrollTrigger: { trigger: introVisual, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
          })
        }

        const materialStack = document.querySelector('.editorial-material-stack')
        if (materialStack) {
          gsap.fromTo(materialStack, { y: 20 }, {
            y: -18,
            ease: 'none',
            scrollTrigger: { trigger: '.editorial-materials', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          })
        }
      }

      ScrollTrigger.refresh()
    })

    return () => {
      ctx.revert()
      elements.forEach((el) => el.classList.remove('gsap-managed'))
    }
  }, [path])

  return null
}
