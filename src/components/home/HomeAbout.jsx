import { Reveal } from '../motion/Reveal.jsx'

function HomeAbout() {
  return (
    <section id="about" className="pe-section pe-about--polish" aria-labelledby="home-about-title">
      <div className="container pe-about__layout">
        <Reveal>
          <h2 id="home-about-title" className="pe-about__statement">
            <span>Software engineer</span>
            <span>building for</span>
            <span>real business needs.</span>
          </h2>
        </Reveal>
        <Reveal>
          <dl className="pe-about__meta pe-about__meta--cards">
            <div>
              <dt>Based in</dt>
              <dd>Tamil Nadu, India</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>6+ years</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Web development</dd>
            </div>
            <div>
              <dt>Currently exploring</dt>
              <dd>Python / FastAPI / AI</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

export default HomeAbout
