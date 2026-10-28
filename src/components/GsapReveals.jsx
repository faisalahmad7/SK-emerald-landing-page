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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = [...document.querySelectorAll('.rv:not(.rv-mask)')]

    if (reduceMotion) {
      elements.forEach((el) => el.setAttribute('data-in', ''))
      return
    }

    let sceneMedia
    const ctx = gsap.context(() => {
      // Keep copy reveals understated. Photographs have their own editorial wipe below.
      elements.forEach((el, index) => {
        el.classList.add('gsap-managed')
        const isTile = el.classList.contains('editorial-tile')
        if (isTile) return
        gsap.fromTo(el, { autoAlpha: 0, y: 20 }, {
          autoAlpha: 1, y: 0,
          duration: 0.84,
          delay: Math.min(index % 4, 3) * 0.045,
          ease: 'power2.out',
          overwrite: 'auto',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onComplete: () => el.setAttribute('data-in', ''),
        })
      })

      // Collections: a clean top-to-bottom aperture with a fine gold edge.
      // The furniture photograph itself never scales or drifts.
      const tiles = gsap.utils.toArray('.editorial-mosaic .editorial-tile')
      tiles.forEach((tile, index) => {
        const photo = tile.querySelector('.tile-photo-reveal')
        const rule = tile.querySelector('.tile-reveal-rule')
        const caption = tile.querySelector('.tile-cap')
        if (!photo) return
        gsap.set(photo, { clipPath: 'inset(0% 0% 100% 0%)' })
        if (caption) gsap.set(caption, { autoAlpha: 0, y: 8 })
        const wipe = gsap.timeline({
          scrollTrigger: { trigger: tile, start: 'top 86%', once: true }
        })
        wipe.to(photo, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' }, 0)
        if (rule) {
          gsap.set(rule, { transformOrigin: 'left center', scaleX: 0, autoAlpha: 0 })
          wipe.to(rule, { scaleX: 1, autoAlpha: 0.85, duration: 1.0, ease: 'power2.inOut' }, 0.08)
          wipe.to(rule, { autoAlpha: 0, duration: 0.22, ease: 'power1.out' }, 0.94)
        }
        if (caption) wipe.to(caption, { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out' }, 0.72 + (index % 2) * 0.05)
      })

      // "Bring the whole room together": the three images travel with the scroll.
      // Their settled position is the focus point; the approach and exit reverse naturally on scroll-up.
      const roomScene = document.querySelector('.editorial-triptych')
      const roomCards = roomScene ? gsap.utils.toArray(roomScene.querySelectorAll('.tri-scroll-image')) : []
      if (roomScene && roomCards.length === 3) {
        const enterY = [-118, 138, 112]
        const enterRotation = [-2.1, 1.35, 1.8]
        const exitY = [-64, 62, 78]
        const exitX = [-12, 0, 14]
        const enterAt = [0.015, 0.055, 0.095]
        const exitAt = [0.74, 0.77, 0.80]

        sceneMedia = gsap.matchMedia()
        sceneMedia.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
          gsap.set(roomCards, { autoAlpha: 0 })
          const focusTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: roomScene,
              // Start as the photo row enters the viewport; no pin-spacing gap.
              // All motion is scrubbed to the visitor's scroll, so reversing scroll
              // naturally reverses the entrance and the long, soft exit.
              start: 'top 92%',
              end: 'bottom 16%',
              scrub: 0.72,
              invalidateOnRefresh: true,
            },
          })
          roomCards.forEach((card, i) => {
            gsap.set(card, {
              y: enterY[i],
              x: i === 0 ? -10 : i === 2 ? 10 : 0,
              rotation: enterRotation[i],
              scale: 0.975,
            })
            focusTimeline.to(card, {
              autoAlpha: 1, y: 0, x: 0, rotation: 0, scale: 1,
              duration: 0.30, ease: 'power2.out',
            }, enterAt[i])
          })
          // Hold the complete composition through the section midpoint, then ease it
          // away gradually as the row approaches the end of its viewport journey.
          focusTimeline.addLabel('focus', 0.53)
          roomCards.forEach((card, i) => {
            focusTimeline.to(card, {
              autoAlpha: 0,
              y: exitY[i],
              x: exitX[i],
              rotation: i === 0 ? -1.1 : i === 2 ? 1.2 : 0,
              scale: 0.99,
              duration: 0.24,
              ease: 'power2.inOut',
            }, exitAt[i])
          })
          return () => focusTimeline.scrollTrigger?.kill()
        })
        sceneMedia.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
          const reveals = roomCards.map((card, i) => gsap.fromTo(card,
            { autoAlpha: 0, y: i === 0 ? -28 : i === 1 ? 30 : 35, rotation: i === 0 ? -1 : i === 2 ? 1 : 0 },
            {
              autoAlpha: 1, y: 0, rotation: 0, duration: 0.9,
              ease: 'power2.out', overwrite: 'auto',
              scrollTrigger: { trigger: card, start: 'top 86%', once: true },
            },
          ))
          return () => reveals.forEach((t) => t.scrollTrigger?.kill())
        })
      }

      // The oversized footer signature should arrive as the last quiet brand moment.
      const footerMark = document.querySelector('.footer-wordmark')
      if (footerMark) {
        gsap.fromTo(footerMark, { autoAlpha: 0, y: 42, scale: 0.985 }, {
          autoAlpha: 0.38, y: 0, scale: 1,
          duration: 1.35, ease: 'power2.out', overwrite: 'auto',
          scrollTrigger: { trigger: footerMark, start: 'top 92%', once: true },
        })
      }
      ScrollTrigger.refresh()
    })

    return () => {
      sceneMedia?.revert()
      ctx.revert()
      document.querySelectorAll('.gsap-managed').forEach((el) => el.classList.remove('gsap-managed'))
    }
  }, [path])

  return null
}
