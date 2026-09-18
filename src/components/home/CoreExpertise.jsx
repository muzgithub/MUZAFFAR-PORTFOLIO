import { profile } from '../../data/profile.js'
import SectionHeading from '../ui/SectionHeading.jsx'

function CoreExpertise() {
  return (
    <section className="section expertise" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHeading eyebrow="Specialization" title="Core expertise" titleId="expertise-title">
          The work I am hired to do first: WordPress, PHP, WooCommerce, and JavaScript.
        </SectionHeading>
        <div className="expertise__grid">
          {profile.coreExpertise.map((item, index) => (
            <article key={item.title} className="expertise__card">
              <p className="expertise__index">{String(index + 1).padStart(2, '0')}</p>
              <h3>{item.title}</h3>
              <p className="text-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreExpertise
