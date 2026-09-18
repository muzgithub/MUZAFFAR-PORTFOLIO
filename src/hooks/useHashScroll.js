import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToHomeSection } from '../utils/homeScroll.js'

export function useHashScroll() {
  const { hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) {
      return
    }

    const id = hash.replace('#', '')

    if (!id) {
      return
    }

    scrollToHomeSection(id)
  }, [hash])
}
