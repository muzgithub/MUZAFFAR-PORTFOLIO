import { profile } from '../../data/profile.js'
import { journeyNote } from '../../data/services.js'
import SectionHeading from '../ui/SectionHeading.jsx'

function TechnicalJourney() {
  return (
    <section className="section journey" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading eyebrow="Scope" title="Technical journey" titleId="journey-title">
          {journeyNote}
        </SectionHeading>
        <ol className="journey__list">
          {profile.about.evolution.map((step, index) => (
            <li key={step}>
              <span className="journey__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="journey__step">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default TechnicalJourney
