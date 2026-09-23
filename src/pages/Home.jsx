import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import EngineeringApproach from '../components/home/EngineeringApproach.jsx'
import HomeAbout from '../components/home/HomeAbout.jsx'
import HomeContact from '../components/home/HomeContact.jsx'
import ImpactMetrics from '../components/home/ImpactMetrics.jsx'
import TechMarquee from '../components/home/TechMarquee.jsx'
import WhatIDoSection from '../components/home/WhatIDoSection.jsx'
import SectionNavigator from '../components/layout/SectionNavigator.jsx'
import CapabilitySystem from '../components/product/CapabilitySystem.jsx'
import ExperienceTimeline from '../components/product/ExperienceTimeline.jsx'
import ProductHero from '../components/product/ProductHero.jsx'
import ProjectShowcase from '../components/product/ProjectShowcase.jsx'
import { useHashScroll } from '../hooks/useHashScroll.js'
import { usePageSeo } from '../hooks/usePageSeo.js'
import { getHomeJsonLd, PAGE_SEO } from '../utils/seo.js'

function Home() {
  const { hash } = useLocation()
  const homeJsonLd = useMemo(() => getHomeJsonLd(), [])

  usePageSeo({ ...PAGE_SEO.home, jsonLd: homeJsonLd })
  useHashScroll()

  useEffect(() => {
    document.body.classList.add('is-home')
    return () => {
      document.body.classList.remove('is-home')
    }
  }, [])

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [hash])

  return (
    <>
      <SectionNavigator />
      <ProductHero />
      <TechMarquee />
      <WhatIDoSection />
      <ImpactMetrics />
      <ProjectShowcase />
      <ExperienceTimeline />
      <CapabilitySystem />
      <EngineeringApproach />
      <HomeAbout />
      <HomeContact />
    </>
  )
}

export default Home
