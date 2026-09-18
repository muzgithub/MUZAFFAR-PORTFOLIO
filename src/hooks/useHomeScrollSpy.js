import { useEffect, useLayoutEffect, useState } from 'react'
import { resolveHomeActiveSection } from '../utils/homeScroll.js'

export { getHomeScrollActivationOffsetPx } from '../utils/homeScroll.js'

export function useHomeScrollSpy(enabled, hash = '') {
  const [activeSection, setActiveSection] = useState('home')

  useLayoutEffect(() => {
    if (!enabled) {
      return
    }

    setActiveSection(resolveHomeActiveSection())
  }, [enabled, hash])

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    let frame = 0

    const syncActiveSection = () => {
      const next = resolveHomeActiveSection()
      setActiveSection((current) => (current === next ? current : next))
    }

    const scheduleSync = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0
        syncActiveSection()
      })
    }

    syncActiveSection()
    window.addEventListener('scroll', scheduleSync, { passive: true })
    window.addEventListener('resize', scheduleSync, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleSync)
      window.removeEventListener('resize', scheduleSync)

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [enabled])

  return activeSection
}
