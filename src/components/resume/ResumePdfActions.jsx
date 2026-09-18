import Button from '../ui/Button.jsx'
import ExternalLink from '../projects/ExternalLink.jsx'
import { resumePdf } from '../../data/resume.js'

function ResumePdfActions({ primary = true }) {
  return (
    <div className="cluster resume-actions">
      <Button href={resumePdf.href} download={resumePdf.filename} variant={primary ? 'primary' : 'secondary'}>
        Download Resume
      </Button>
      <ExternalLink className={`btn ${primary ? 'btn--secondary' : 'btn--ghost'}`} href={resumePdf.href}>
        View Resume PDF
      </ExternalLink>
    </div>
  )
}

export default ResumePdfActions
