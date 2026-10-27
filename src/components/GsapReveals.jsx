import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouter } from '../router'
import { useHeroParallax } from './Layout'

gsap.registerPlugin(ScrollTrigger)

// GSAP reveals are scoped to the active client-side route and fully reverted on navigation.
export default function GsapReveals() {
  const { path } = useRouter()
  useHeroParallax()

  useEffect(() => {
    const elements = [...document.querySelectorAll('.rv')]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !elements.length) {
      elements.forEach((el) => el.setAttribute('data-in', ''))
      return
    }

    const ctx = gsap.context(() => {
      elements.forEach((el, index) => {
        el.classList.add('gsap-managed')
        const masked = el.classList.contains('rv-mask')
        gsap.fromTo(el,
          masked ? { clipPath: 'inset(0 0 100% 0)' } : { autoAlpha: 0, y: 22 },
          {
            ...(masked ? { clipPath: 'inset(0 0 0% 0)' } : { autoAlpha: 1, y: 0 }),
            duration: masked ? 1.12 : 0.82,
            delay: Math.min(index % 4, 3) * 0.045,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: { trigger: masked ? (el.parentElement || el) : el, start: 'top 88%', once: true },
            onComplete: () => el.setAttribute('data-in', ''),
          }
        )
        if (masked) {
          const image = el.querySelector('img')
          if (image) gsap.fromTo(image, { scale: 1.075 }, {
            scale: 1, duration: 1.3, ease: 'power3.out', overwrite: 'auto',
            scrollTrigger: { trigger: el.parentElement || el, start: 'top 88%', once: true },
          })
        }
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
