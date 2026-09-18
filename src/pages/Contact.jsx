import { useEffect } from 'react'
import ContactForm from '../components/contact/ContactForm.jsx'
import ExternalLink from '../components/projects/ExternalLink.jsx'
import { contactInfo, contactPage } from '../data/contact.js'
import { usePageSeo } from '../hooks/usePageSeo.js'
import { PAGE_SEO } from '../utils/seo.js'

function Contact() {
  usePageSeo(PAGE_SEO.contact)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <article className="contact-page">
      <header className="contact-hero">
        <div className="container contact-hero__inner">
          <p className="label">{contactPage.eyebrow}</p>
          <h1>{contactPage.title}</h1>
          <p className="contact-hero__lede">{contactPage.introduction}</p>
        </div>
      </header>

      <div className="container contact-page__body">
        <div className="contact-page__grid">
          <section className="contact-details" aria-labelledby="contact-details-heading">
            <h2 id="contact-details-heading">Contact details</h2>
            <dl className="contact-details__list">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${contactInfo.phoneHref}`}>{contactInfo.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{contactInfo.location}</dd>
              </div>
              <div>
                <dt>{contactInfo.linkedinLabel}</dt>
                <dd>
                  <ExternalLink href={contactInfo.linkedin}>{contactInfo.linkedinLabel}</ExternalLink>
                </dd>
              </div>
              <div>
                <dt>{contactInfo.githubLabel}</dt>
                <dd>
                  <ExternalLink href={contactInfo.github}>{contactInfo.githubLabel}</ExternalLink>
                </dd>
              </div>
            </dl>
          </section>

          <section className="contact-form-section" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading">Send a message</h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </article>
  )
}

export default Contact
