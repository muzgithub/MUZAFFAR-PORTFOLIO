import { services } from '../../data/services.js'
import SectionHeading from '../ui/SectionHeading.jsx'

function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading eyebrow="Capabilities" title="What I build" titleId="services-title">
          Engineering work I deliver, grouped by the same professional priorities as the rest of this site.
        </SectionHeading>
        <div className="services__grid">
          {services.map((item, index) => (
            <article key={item.id} className="services__item">
              <p className="services__index">{String(index + 1).padStart(2, '0')}</p>
              <h3>{item.title}</h3>
              <p className="text-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
