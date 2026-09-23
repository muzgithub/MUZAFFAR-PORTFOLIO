import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

const ITEMS = ['WordPress', 'PHP', 'WooCommerce', 'JavaScript', 'Laravel', 'React', 'Drupal', 'MySQL']

function TechMarquee() {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <section className="pe-marquee pe-marquee--static" aria-label="Technologies">
        <ul className="pe-marquee__static-list">
          {ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section className="pe-marquee" aria-label="Technologies">
      <div className="pe-marquee__viewport">
        <ul className="pe-marquee__track">
          {[...ITEMS, ...ITEMS].map((item, index) => (
            <li key={`${item}-${index}`} className="pe-marquee__item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TechMarquee
