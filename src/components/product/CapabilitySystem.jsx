import { AnimatePresence, motion } from 'motion/react'

import { useState } from 'react'

import { Reveal } from '../motion/Reveal.jsx'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'



const ROWS = [

  {

    id: 'wordpress',

    title: 'WordPress',

    hint: 'Themes & plugins',

    detail: 'Themes · Plugins · ACF · Elementor · WooCommerce · Custom development',

    skills: ['Themes', 'Plugins', 'ACF', 'Elementor', 'WooCommerce', 'Custom development'],

  },

  {

    id: 'php',

    title: 'PHP',

    hint: 'Backend logic',

    detail: 'Core PHP · OOP · MySQL · REST APIs · Laravel',

    skills: ['Core PHP', 'OOP', 'MySQL', 'REST APIs', 'Laravel'],

  },

  {

    id: 'woocommerce',

    title: 'WooCommerce',

    hint: 'E-commerce',

    detail: 'Catalog · Checkout · Payments · Product flows',

    skills: ['Catalog', 'Checkout', 'Payments', 'Product flows', 'E-commerce customization'],

  },

  {

    id: 'javascript',

    title: 'JavaScript',

    hint: 'Frontend',

    detail: 'ES6+ · DOM · AJAX · API integration · Frontend development',

    skills: ['ES6+', 'DOM', 'AJAX', 'API integration', 'Frontend development'],

  },

  {

    id: 'laravel',

    title: 'Laravel',

    hint: 'APIs & modules',

    detail: 'MVC · MySQL · REST APIs · Authentication · Backend development',

    skills: ['MVC', 'MySQL', 'REST APIs', 'Authentication', 'Backend development'],

  },

  {

    id: 'react',

    title: 'React',

    hint: 'UI systems',

    detail: 'Vite · Axios · React Router · API integration',

    skills: ['Vite', 'Axios', 'React Router', 'API integration', 'Component UI'],

  },

  {

    id: 'databases',

    title: 'Databases',

    hint: 'Data layer',

    detail: 'MySQL · MongoDB · phpMyAdmin · Database design · Queries',

    skills: ['MySQL', 'MongoDB', 'phpMyAdmin', 'Database design', 'Queries'],

  },

  {

    id: 'cms',

    title: 'CMS',

    hint: 'Content',

    detail: 'WordPress · WooCommerce · Drupal · Magento',

    skills: ['WordPress', 'WooCommerce', 'Drupal', 'Magento'],

  },

  {

    id: 'fullstack',

    title: 'Full stack',

    hint: 'End-to-end',

    detail: 'PHP · Laravel · Node.js · Express.js · React · MySQL · MongoDB',

    skills: ['PHP', 'Laravel', 'Node.js', 'Express.js', 'React', 'MySQL', 'MongoDB'],

  },

  {

    id: 'exploring',

    title: 'Exploring',

    hint: 'Learning',

    detail: 'Python · FastAPI · AI API integration · AI-powered applications',

    skills: ['Python', 'FastAPI', 'AI API integration', 'AI-powered applications'],

    muted: true,

  },

]



function CapabilitySystem() {

  const reduced = usePrefersReducedMotion()

  const [active, setActive] = useState('wordpress')

  const current = active ? ROWS.find((row) => row.id === active) : null

  function toggleRow(id) {
    setActive((currentId) => (currentId === id ? null : id))
  }



  return (

    <section id="stack" className="pe-section pe-capabilities pe-capabilities--polish" aria-labelledby="pe-capabilities-title">

      <div className="container pe-capabilities__layout">

        <Reveal className="pe-capabilities__intro">

          <p className="pe-kicker">Stack</p>

          <h2 id="pe-capabilities-title">What I build with</h2>

          <AnimatePresence mode="wait">

            {current ? (
              <motion.p
                key={current.id}
                className="pe-body-muted pe-capabilities__active-detail"
                initial={reduced ? false : { opacity: 0, y: 6, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                exit={reduced ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.detail}
              </motion.p>
            ) : (
              <motion.p
                key="stack-collapsed"
                className="pe-body-muted pe-capabilities__active-detail"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Select a row to explore tools and scope.
              </motion.p>
            )}

          </AnimatePresence>

        </Reveal>



        <ul className="pe-capabilities__rows">

          {ROWS.map((row, index) => {

            const isActive = active === row.id

            return (

              <motion.li

                key={row.id}

                layout={!reduced}

                className={`pe-capabilities__row${isActive ? ' is-active' : ''}${row.muted ? ' is-muted' : ''}`}

              >

                <button

                  type="button"

                  onClick={() => toggleRow(row.id)}

                  aria-expanded={isActive}

                >

                  <span className="pe-capabilities__index">{String(index + 1).padStart(2, '0')}</span>

                  <span className="pe-capabilities__label-group">

                    <span className="pe-capabilities__title">{row.title}</span>

                    <span className="pe-capabilities__hint">{row.hint}</span>

                  </span>

                  <span className="pe-capabilities__arrow" aria-hidden="true">

                    →

                  </span>

                  {isActive && !reduced ? (

                    <motion.span

                      className="pe-capabilities__line"

                      layoutId="pe-cap-line"

                      transition={{ type: 'spring', stiffness: 400, damping: 36 }}

                    />

                  ) : null}

                </button>

                <AnimatePresence initial={false}>

                  {isActive ? (

                    <motion.div

                      className="pe-capabilities__expand"

                      initial={reduced ? false : { height: 0, opacity: 0 }}

                      animate={{ height: 'auto', opacity: 1 }}

                      exit={reduced ? undefined : { height: 0, opacity: 0 }}

                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}

                    >

                      <ul className="pe-capabilities__skills">

                        {row.skills.map((skill) => (

                          <li key={skill}>{skill}</li>

                        ))}

                      </ul>

                    </motion.div>

                  ) : null}

                </AnimatePresence>

              </motion.li>

            )

          })}

        </ul>

      </div>

    </section>

  )

}



export default CapabilitySystem
