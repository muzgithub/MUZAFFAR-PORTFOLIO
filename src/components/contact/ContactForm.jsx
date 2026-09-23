import { useId, useState } from 'react'
import MagneticButton from '../motion/MagneticButton.jsx'
import Button from '../ui/Button.jsx'
import { buildContactMailto, contactPage } from '../../data/contact.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '',
}

const HOME_FIELDS = [
  { id: 'name', num: '01', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name' },
  {
    id: 'email',
    num: '02',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    inputMode: 'email',
    placeholder: 'your@email.com',
  },
  {
    id: 'message',
    num: '03',
    label: 'Message',
    type: 'textarea',
    autoComplete: 'off',
    placeholder: 'Tell me about the project…',
  },
]

function ContactForm({ variant = 'page' }) {
  const isHome = variant === 'home'
  const formId = useId()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  function validate(nextValues) {
    const nextErrors = {}

    if (!nextValues.name.trim()) {
      nextErrors.name = 'Enter your name.'
    }

    if (!nextValues.email.trim()) {
      nextErrors.email = 'Enter your email address.'
    } else if (!EMAIL_PATTERN.test(nextValues.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!isHome && !nextValues.subject.trim()) {
      nextErrors.subject = 'Enter a subject.'
    }

    if (!nextValues.message.trim()) {
      nextErrors.message = 'Enter a message.'
    } else if (nextValues.message.trim().length < contactPage.messageMinLength) {
      nextErrors.message = `Message should be at least ${contactPage.messageMinLength} characters.`
    }

    return nextErrors
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setStatus(null)

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[name]
        return next
      })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setStatus(null)

    if (values.company.trim()) {
      setValues(initialValues)
      return
    }

    const nextErrors = validate(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const firstKey = ['name', 'email', 'subject', 'message'].find((key) => nextErrors[key])
      if (firstKey) {
        document.getElementById(`${formId}-${firstKey}`)?.focus()
      }
      return
    }

    setErrors({})
    const mailto = buildContactMailto({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: isHome
        ? `Portfolio contact from ${values.name.trim()}`
        : values.subject.trim(),
      message: values.message.trim(),
    })

    setStatus('mailto')
    window.setTimeout(() => {
      window.location.href = mailto
    }, 0)
  }

  const statusId = `${formId}-status`

  if (isHome) {
    return (
      <form
        className="contact-form contact-form--home contact-form--editorial"
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={status ? statusId : undefined}
      >
        <div className="field contact-form__honeypot" aria-hidden="true">
          <label className="field__label" htmlFor={`${formId}-company`}>
            Company
          </label>
          <input
            className="field__control"
            type="text"
            id={`${formId}-company`}
            name="company"
            value={values.company}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {HOME_FIELDS.map((field) => {
          const errorId = `${formId}-${field.id}-error`
          const hintId = field.id === 'message' ? `${formId}-message-hint` : undefined
          const describedBy = [errors[field.id] ? errorId : null, hintId].filter(Boolean).join(' ') || undefined

          return (
            <div key={field.id} className={`contact-field contact-field--editorial${errors[field.id] ? ' is-invalid' : ''}`}>
              <div className="contact-field__head">
                <span className="contact-field__num" aria-hidden="true">
                  {field.num}
                </span>
                <label className="contact-field__label" htmlFor={`${formId}-${field.id}`}>
                  {field.label}
                </label>
              </div>
              {field.type === 'textarea' ? (
                <textarea
                  className="contact-field__control"
                  id={`${formId}-${field.id}`}
                  name={field.id}
                  value={values[field.id]}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={field.placeholder}
                  aria-invalid={errors[field.id] ? 'true' : undefined}
                  aria-describedby={describedBy}
                />
              ) : (
                <input
                  className="contact-field__control"
                  type={field.type}
                  id={`${formId}-${field.id}`}
                  name={field.id}
                  value={values[field.id]}
                  onChange={handleChange}
                  required
                  autoComplete={field.autoComplete}
                  inputMode={field.inputMode}
                  placeholder={field.placeholder}
                  aria-invalid={errors[field.id] ? 'true' : undefined}
                  aria-describedby={describedBy}
                />
              )}
              <span className="contact-field__rule" aria-hidden="true" />
              {field.id === 'message' ? (
                <p className="contact-field__hint" id={hintId}>
                  At least {contactPage.messageMinLength} characters.
                </p>
              ) : null}
              {errors[field.id] ? (
                <p className="contact-field__error" id={errorId} role="alert">
                  {errors[field.id]}
                </p>
              ) : null}
            </div>
          )
        })}

        <MagneticButton type="submit" variant="primary" className="contact-form__submit contact-form__submit--editorial">
          Send message →
        </MagneticButton>

        {status === 'mailto' ? (
          <p className="contact-form__status" id={statusId} role="status">
            Your email client should open with the message prepared. Please review and send it from there.
          </p>
        ) : null}
      </form>
    )
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={status ? statusId : undefined}
    >
      <p className="contact-form__note">{contactPage.formNote}</p>

      <div className="field contact-form__honeypot" aria-hidden="true">
        <label className="field__label" htmlFor={`${formId}-company`}>
          Company
        </label>
        <input
          className="field__control"
          type="text"
          id={`${formId}-company`}
          name="company"
          value={values.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor={`${formId}-name`}>
          Name <span className="field__required">(required)</span>
        </label>
        <input
          className={`field__control${errors.name ? ' field__control--invalid' : ''}`}
          type="text"
          id={`${formId}-name`}
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
        />
        {errors.name ? (
          <p className="field__error" id={`${formId}-name-error`} role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field__label" htmlFor={`${formId}-email`}>
          Email <span className="field__required">(required)</span>
        </label>
        <input
          className={`field__control${errors.email ? ' field__control--invalid' : ''}`}
          type="email"
          id={`${formId}-email`}
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          autoComplete="email"
          inputMode="email"
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
        />
        {errors.email ? (
          <p className="field__error" id={`${formId}-email-error`} role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field__label" htmlFor={`${formId}-subject`}>
          Subject <span className="field__required">(required)</span>
        </label>
        <input
          className={`field__control${errors.subject ? ' field__control--invalid' : ''}`}
          type="text"
          id={`${formId}-subject`}
          name="subject"
          value={values.subject}
          onChange={handleChange}
          required
          aria-invalid={errors.subject ? 'true' : undefined}
          aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
        />
        {errors.subject ? (
          <p className="field__error" id={`${formId}-subject-error`} role="alert">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field__label" htmlFor={`${formId}-message`}>
          Message <span className="field__required">(required)</span>
        </label>
        <textarea
          className={`field__control${errors.message ? ' field__control--invalid' : ''}`}
          id={`${formId}-message`}
          name="message"
          value={values.message}
          onChange={handleChange}
          required
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={
            errors.message ? `${formId}-message-error ${formId}-message-hint` : `${formId}-message-hint`
          }
        />
        <p className="field__hint" id={`${formId}-message-hint`}>
          At least {contactPage.messageMinLength} characters.
        </p>
        {errors.message ? (
          <p className="field__error" id={`${formId}-message-error`} role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" variant="primary">
        Send Message
      </Button>

      {status === 'mailto' ? (
        <p className="contact-form__status" id={statusId} role="status">
          Your email client should open with the message prepared. Please review and send it from there.
        </p>
      ) : null}
    </form>
  )
}

export default ContactForm
