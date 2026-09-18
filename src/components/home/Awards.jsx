import { awards } from '../../data/awards.js'
import SectionHeading from '../ui/SectionHeading.jsx'

function Awards() {
  return (
    <section className="section awards" id="awards" aria-labelledby="awards-title">
      <div className="container">
        <SectionHeading eyebrow="Recognition" title="Awards" titleId="awards-title">
          Documented recognition at Colan Infotech.
        </SectionHeading>
        <ul className="awards__list">
          {awards.map((award) => (
            <li key={award.id} className="awards__item">
              <h3>{award.title}</h3>
              <p className="awards__org">{award.organization}</p>
              <p className="caption">{award.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Awards
