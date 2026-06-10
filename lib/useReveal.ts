'use client'

import { useEffect, useRef } from 'react'

/**
 * Staggered entrance animation. Attach the returned ref to a container and mark
 * the children you want revealed with `data-reveal`. They fade + slide up in
 * sequence on mount via a CSS keyframe (`animate-fade-up`), which always ends in
 * the visible state — so content can never get stuck hidden.
 *
 * The animation class is removed once it finishes so no `transform` lingers
 * (a leftover transform would create a stacking context and let later blocks
 * paint over the address dropdown). Respects `prefers-reduced-motion`.
 */
export function useReveal<T extends HTMLElement>(staggerMs = 80) {
  const scope = useRef<T>(null)

  useEffect(() => {
    const root = scope.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = root.querySelectorAll<HTMLElement>('[data-reveal]')
    items.forEach((el, i) => {
      el.style.animationDelay = `${i * staggerMs}ms`
      el.classList.add('animate-fade-up')
      el.addEventListener(
        'animationend',
        () => {
          el.classList.remove('animate-fade-up')
          el.style.animationDelay = ''
        },
        { once: true }
      )
    })
  }, [staggerMs])

  return scope
}
