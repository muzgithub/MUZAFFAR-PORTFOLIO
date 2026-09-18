import { profile } from './profile.js'

export const contactInfo = {
  name: profile.name,
  email: profile.email,
  phone: '+91 81483 84440',
  phoneHref: '+918148384440',
  location: 'Pernambut, Tamil Nadu, India',
  linkedin: profile.linkedin,
  linkedinLabel: 'LinkedIn',
  github: profile.github,
  githubLabel: 'GitHub',
}

export const contactPage = {
  eyebrow: 'Get in touch',
  title: "Let's build something useful.",
  introduction:
    'For professional opportunities, software development work, collaboration, or project discussions, send a message through the form or use the contact details below.',
  formNote:
    'This form does not send email from the website. After validation, your email app opens with your message prepared for you to review and send.',
  messageMinLength: 20,
}

export function buildContactMailto({ name, email, subject, message }) {
  const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n')
  const params = new URLSearchParams({
    subject,
    body,
  })

  return `mailto:${contactInfo.email}?${params.toString()}`
}
