import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'



function parseMetric(value) {

  const match = String(value).match(/^(\d+)(.*)$/)

  if (!match) {

    return { target: 0, suffix: value }

  }

  return { target: Number(match[1]), suffix: match[2] ?? '' }

}



function easeOutCubic(t) {

  return 1 - (1 - t) ** 3

}



function AnimatedCounter({ value, className }) {

  const reduced = usePrefersReducedMotion()

  const { target, suffix } = parseMetric(value)

  const [display, setDisplay] = useState(reduced ? target : null)

  const ref = useRef(null)

  const frameRef = useRef(0)

  const hasRunRef = useRef(false)



  useEffect(() => {

    if (reduced) {

      setDisplay(target)

      return undefined

    }



    const node = ref.current

    if (!node) {

      return undefined

    }



    const runAnimation = () => {

      if (hasRunRef.current) {

        return

      }

      hasRunRef.current = true



      if (frameRef.current) {

        cancelAnimationFrame(frameRef.current)

      }



      setDisplay(0)



      const start = performance.now()

      const duration = 850



      const tick = (now) => {

        const progress = Math.min((now - start) / duration, 1)

        setDisplay(Math.round(target * easeOutCubic(progress)))

        if (progress < 1) {

          frameRef.current = requestAnimationFrame(tick)

        } else {

          setDisplay(target)

        }

      }



      frameRef.current = requestAnimationFrame(tick)

    }



    const observer = new IntersectionObserver(

      ([entry]) => {

        if (!entry.isIntersecting) {

          return

        }

        runAnimation()

        observer.disconnect()

      },

      { threshold: 0.35, rootMargin: '0px 0px -5% 0px' },

    )



    observer.observe(node)



    return () => {

      observer.disconnect()

      if (frameRef.current) {

        cancelAnimationFrame(frameRef.current)

      }

    }

  }, [reduced, target])



  return (

    <span ref={ref} className={className} aria-label={String(value)}>

      {display === null ? '\u00A0' : display}

      {display === null ? '' : suffix}

    </span>

  )

}



export default AnimatedCounter
