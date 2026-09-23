import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { useHomeScrollSpy } from '../../hooks/useHomeScrollSpy.js'

import { scrollToHomeSection, scrollToHomeTop } from '../../utils/homeScroll.js'

import { useMediaQuery } from '../../hooks/useMediaQuery.js'



const SECTIONS = [

  { key: 'home', label: 'Home' },

  { key: 'projects', label: 'Work' },

  { key: 'experience', label: 'Experience' },

  { key: 'stack', label: 'Stack' },

  { key: 'approach', label: 'Process' },

  { key: 'about', label: 'About' },

  { key: 'contact', label: 'Contact' },

]



function SectionNavigator() {

  const { pathname, hash } = useLocation()

  const isHome = pathname === '/'

  const active = useHomeScrollSpy(isHome, hash)

  const isDesktop = useMediaQuery('(min-width: 1280px)')

  const [hovered, setHovered] = useState(null)



  useEffect(() => {

    if (!isHome) {

      setHovered(null)

    }

  }, [isHome])



  if (!isHome || !isDesktop) {

    return null

  }



  return (

    <nav className="pe-rail" aria-label="Page sections">

      <ol>

        {SECTIONS.map((section, index) => {

          const isActive = active === section.key

          const showLabel = hovered === section.key || isActive



          return (

            <li key={section.key}>

              <button

                type="button"

                className={isActive ? 'is-active' : ''}

                onMouseEnter={() => setHovered(section.key)}

                onMouseLeave={() => setHovered(null)}

                onFocus={() => setHovered(section.key)}

                onBlur={() => setHovered(null)}

                onClick={() => {

                  if (section.key === 'home') {

                    scrollToHomeTop()

                    return

                  }

                  scrollToHomeSection(section.key)

                }}

                aria-current={isActive ? 'true' : undefined}

              >

                <span>{String(index + 1).padStart(2, '0')}</span>

                <span className={`pe-rail__label ${showLabel ? 'is-visible' : ''}`}>{section.label}</span>

              </button>

            </li>

          )

        })}

      </ol>

    </nav>

  )

}



export default SectionNavigator
