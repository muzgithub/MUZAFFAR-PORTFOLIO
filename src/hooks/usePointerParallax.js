import { useMotionValue, useSpring, useTransform } from 'motion/react'
import { useCallback } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.js'

export function usePointerParallax({ max = 8, stiffness = 140, damping = 22 } = {}) {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness, damping })
  const springY = useSpring(y, { stiffness, damping })
  const translateX = useTransform(springX, [-0.5, 0.5], [-max, max])
  const translateY = useTransform(springY, [-0.5, 0.5], [-max, max])

  const onPointerMove = useCallback(
    (event) => {
      if (reduced) {
        return
      }

      const target = event.currentTarget
      const bounds = target.getBoundingClientRect()
      x.set((event.clientX - bounds.left) / bounds.width - 0.5)
      y.set((event.clientY - bounds.top) / bounds.height - 0.5)
    },
    [reduced, x, y],
  )

  const onPointerLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return {
    reduced,
    translateX,
    translateY,
    onPointerMove,
    onPointerLeave,
    lightX: useTransform(springX, [-0.5, 0.5], ['40%', '60%']),
    lightY: useTransform(springY, [-0.5, 0.5], ['35%', '55%']),
    springX,
    springY,
  }
}
