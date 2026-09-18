import Button from '../ui/Button.jsx'
import Card from '../ui/Card.jsx'
import Chip from '../ui/Chip.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const skillGroups = [
  {
    label: 'Primary',
    tone: 'primary',
    items: ['WordPress', 'PHP', 'WooCommerce', 'JavaScript'],
  },
  {
    label: 'Secondary',
    tone: 'secondary',
    items: ['Laravel', 'ReactJS', 'MySQL', 'HTML', 'CSS', 'REST APIs'],
  },
  {
    label: 'Full-stack',
    tone: 'fullstack',
    items: ['Node.js', 'Express.js', 'MongoDB', 'MERN', 'JWT'],
  },
  {
    label: 'Supporting',
    tone: 'supporting',
    items: ['Drupal', 'Magento', 'Bootstrap', 'jQuery', 'ACF', 'Elementor', 'Divi', 'Beaver Builder'],
  },
  {
    label: 'Exploring',
    tone: 'exploring',
    items: ['Python', 'FastAPI', 'AI API Integration', 'AI-powered applications'],
  },
]

const swatches = [
  { name: 'Background', variable: '--color-bg' },
  { name: 'Surface', variable: '--color-surface' },
  { name: 'Muted surface', variable: '--color-surface-muted' },
  { name: 'Text', variable: '--color-text' },
  { name: 'Secondary text', variable: '--color-text-secondary' },
  { name: 'Border', variable: '--color-border' },
  { name: 'Accent', variable: '--color-accent' },
  { name: 'Accent soft', variable: '--color-accent-soft' },
]

function DesignSystemPreview() {
  return (
    <div className="container">
      <section className="ds-preview stack" aria-labelledby="ds-intro-title">
        <p className="label">Design system</p>
        <h1 id="ds-intro-title">Foundation preview</h1>
        <p className="text-secondary">
          Token, type, control, and hierarchy specimens only. This is not the portfolio UI.
        </p>
      </section>

      <hr className="divider" />

      <section className="ds-preview" aria-labelledby="ds-color-title">
        <SectionHeading eyebrow="Color" title="Surfaces and accent" titleId="ds-color-title">
          Warm stone neutrals with a copper accent. Dark mode is authored separately.
        </SectionHeading>
        <div className="grid grid--auto" style={{ marginTop: 'var(--space-8)' }}>
          {swatches.map((swatch) => (
            <div key={swatch.variable} className="ds-swatch">
              <div className="ds-swatch__tone" style={{ background: `var(${swatch.variable})` }} />
              <span>{swatch.name}</span>
              <span className="tech-text">{swatch.variable}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-preview" aria-labelledby="ds-type-title">
        <SectionHeading eyebrow="Typography" title="Plus Jakarta Sans" titleId="ds-type-title" />
        <div className="ds-type-sample" style={{ marginTop: 'var(--space-8)' }}>
          <h1>Heading one</h1>
          <h2>Heading two</h2>
          <h3>Heading three</h3>
          <p>Body text for professional case studies and long-form about copy.</p>
          <p className="caption">Caption for supporting notes and image credits.</p>
          <p className="label">Section label</p>
          <p className="tech-text">Technical text / WordPress · PHP · REST</p>
        </div>
      </section>

      <section className="ds-preview" aria-labelledby="ds-controls-title">
        <SectionHeading eyebrow="Controls" title="Buttons, links, and forms" titleId="ds-controls-title" />
        <div className="cluster" style={{ marginTop: 'var(--space-8)' }}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link" href="#ds-type-title">
            Text link
          </Button>
        </div>
        <form className="stack" style={{ maxWidth: '28rem', marginTop: 'var(--space-8)' }}>
          <div className="field">
            <label className="field__label" htmlFor="ds-name">
              Name
            </label>
            <input className="field__control" id="ds-name" name="name" autoComplete="name" />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="ds-message">
              Message
            </label>
            <textarea className="field__control" id="ds-message" name="message" />
            <p className="field__hint">Foundation only. This form does not submit.</p>
          </div>
        </form>
      </section>

      <section className="ds-preview" aria-labelledby="ds-card-title">
        <SectionHeading eyebrow="Surfaces" title="Card foundation" titleId="ds-card-title" />
        <div className="grid grid--2" style={{ marginTop: 'var(--space-8)' }}>
          <Card>
            <h3>Default card</h3>
            <p className="caption">Border, no heavy shadow, 8px radius.</p>
          </Card>
          <Card muted>
            <h3>Muted card</h3>
            <p className="caption">Secondary surface for quieter groupings.</p>
          </Card>
        </div>
      </section>

      <section className="ds-preview" aria-labelledby="ds-skills-title">
        <SectionHeading eyebrow="Hierarchy" title="Skill visual weight" titleId="ds-skills-title">
          These chips define weight for later sections. They are not the Skills page.
        </SectionHeading>
        <div className="stack" style={{ marginTop: 'var(--space-8)', gap: 'var(--space-6)' }}>
          {skillGroups.map((group) => (
            <div key={group.label} className="stack">
              <p className="label">{group.label}</p>
              <div className="cluster">
                {group.items.map((item) => (
                  <Chip key={item} tone={group.tone}>
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DesignSystemPreview
