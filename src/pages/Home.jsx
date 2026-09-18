import { useMemo } from 'react'
import About from '../components/home/About.jsx'
import Awards from '../components/home/Awards.jsx'
import CoreExpertise from '../components/home/CoreExpertise.jsx'
import Experience from '../components/home/Experience.jsx'
import FeaturedProjects from '../components/home/FeaturedProjects.jsx'
import Hero from '../components/home/Hero.jsx'
import Services from '../components/home/Services.jsx'
import Skills from '../components/home/Skills.jsx'
import TechnicalJourney from '../components/home/TechnicalJourney.jsx'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHashScroll } from '../hooks/useHashScroll.js'
import { usePageSeo } from '../hooks/usePageSeo.js'
import { getHomeJsonLd, PAGE_SEO } from '../utils/seo.js'

function Home() {
  const { hash } = useLocation()
  const homeJsonLd = useMemo(() => getHomeJsonLd(), [])

  usePageSeo({ ...PAGE_SEO.home, jsonLd: homeJsonLd })
  useHashScroll()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [hash])

  return (
    <>
      <Hero />
      <CoreExpertise />
      <FeaturedProjects />
      <About />
      <Skills />
      <Experience />
      <Awards />
      <TechnicalJourney />
      <Services />
    </>
  )
}

export default Home
