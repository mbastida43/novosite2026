import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, type FormEvent } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { submitContact } from '@/lib/contact.functions'
import { ArrowUpRight, ArrowRight, Download, Github, Linkedin, Users, HeartHandshake, Rocket, BookOpen, Workflow, Activity, MessageSquare, ShieldCheck, TrendingUp, Network, Mail, Code2, Terminal, Cloud, LockKeyhole, GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import devsecopsDiagram from '@/assets/devsecops-diagram-transparent.png'
import metricsPt from '@/assets/METRICAS.pdf.asset.json'
import metricsEn from '@/assets/METRICS.pdf.asset.json'
import { portfolioCopy, type Language } from '@/lib/portfolio-copy'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HardSkills } from '@/components/hard-skills'
import { validateContact, type ContactField } from '@/lib/contact-validation'
import { useWebMCP } from 'use-webmcp-tool'
import { runWebMCPTool } from '@/lib/webmcp-telemetry'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): { lang: Language } => ({ lang: search['lang'] === 'en' ? 'en' : 'pt' }),
  head: ({ match }) => ({ meta: [
    { title: 'Marlon Bastida | DevSecOps Engineer' },
    { name: 'description', content: portfolioCopy[match.search.lang].metadata.description },
    { property: 'og:title', content: 'Marlon Bastida | DevSecOps Engineer' },
    { property: 'og:description', content: portfolioCopy[match.search.lang].metadata.socialDescription },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
})

const principleIcons = [Users, HeartHandshake, Rocket, BookOpen, Workflow, Activity, MessageSquare, ShieldCheck, TrendingUp, Network]
const skillIcons = [Code2, LockKeyhole, Cloud, GitBranch, Terminal, Activity]

function Index() {
  const { lang } = Route.useSearch()
  const navigate = Route.useNavigate()
  const copy = portfolioCopy[lang]
  useWebMCP({
    name: 'read_portfolio_profile',
    description: 'Read the biography and ten DevOps principles shown in the current page language; excludes all contact-form values.',
    annotations: { readOnlyHint: true },
    execute: () => runWebMCPTool('read_portfolio_profile', () =>
      `Marlon Bastida — DevSecOps Engineer\n${copy.biography}\n${copy.principles.map(item => `${item.title}: ${item.description}`).join('\n')}\n${copy.cultureNote}`),
  })
  const [contactNotice, setContactNotice] = useState(false)
  const [contactErrors, setContactErrors] = useState<Partial<Record<ContactField, boolean>>>({})
  const [contactAttempted, setContactAttempted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const sendContact = useServerFn(submitContact)
  const submissionId = useRef<string | null>(null)
  function checkContact(form: HTMLFormElement) {
    const data = new FormData(form)
    const result = validateContact({ name: String(data.get('name') ?? ''), email: String(data.get('email') ?? ''), message: String(data.get('message') ?? '') })
    const errors: Partial<Record<ContactField, boolean>> = {}
    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0]
        if (field === 'name' || field === 'email' || field === 'message') errors[field] = true
      }
    }
    setContactErrors(errors)
    return result
  }
  function changeLanguage(language: Language) {
    void navigate({ search: { lang: language }, hash: window.location.hash.slice(1), resetScroll: false, replace: true })
  }
  async function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    setSendError('')
    setContactAttempted(true)
    setContactNotice(false)
    const result = checkContact(event.currentTarget)
    if (!result.success) {
      const field = result.error.issues[0]?.path[0]
      if (typeof field === 'string') {
        const input = event.currentTarget.elements.namedItem(field)
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) input.focus()
      }
      return
    }
    submissionId.current ??= crypto.randomUUID()
    setSending(true)
    try {
      const response = await sendContact({ data: { ...result.data, submissionId: submissionId.current } })
      if (response.status === 'sent') {
        setContactNotice(true)
        form.reset()
        submissionId.current = null
        setContactAttempted(false)
      } else {
        setSendError(copy.sendErrors[response.status])
      }
    } catch {
      setSendError(copy.sendErrors.error)
    } finally {
      setSending(false)
    }
  }
  return (
    <>
      <a href="#conteudo" className="skip-link">{copy.skip}</a>
      <SiteHeader lang={lang} onLanguageChange={changeLanguage} />
      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <img className="hero-image" src={devsecopsDiagram} width={1376} height={768} alt={copy.diagram} fetchPriority="high" />
          <div className="site-container">
            <div className="eyebrow"><span className="status-dot" /> {copy.eyebrow}</div>
            <h1 id="hero-title">Marlon Bastida<span className="text-muted-foreground">.</span></h1>
            <p className="hero-role">DevSecOps Engineer</p>
            <p className="hero-description">{copy.heroLead}<br />{copy.heroDescription}</p>
            <div className="hero-actions">
              <Button variant="warm" className="press-button"><Download /> {copy.resume}</Button>
              <Button variant="warm" className="press-button" asChild><a href={(lang === 'en' ? metricsEn : metricsPt).url} download={lang === 'en' ? 'METRICS.pdf' : 'METRICAS.pdf'}><TrendingUp /> {copy.metrics}</a></Button>
              <Button variant="warm" className="press-button" asChild><a href="https://github.com/mbastida43/" target="_blank" rel="noopener noreferrer"><Github /> GitHub <ArrowUpRight /></a></Button>
              <Button variant="warm" className="press-button" asChild><a href="https://www.linkedin.com/in/mbastida/" target="_blank" rel="noopener noreferrer"><Linkedin /> LinkedIn <ArrowUpRight /></a></Button>
            </div>
          </div>
        </section>
        <div className="site-container">
          <section className="content-section" id="sobre" aria-labelledby="about-title">
            <div className="section-heading">
              <div><span className="section-index">{copy.aboutIndex}</span><h2 id="about-title">{copy.aboutTitle}</h2></div>
            </div>
            <div className="about-copy">
              <div className="about-text">
                <p>{copy.biography}</p>
                <p>{copy.visionStart}<strong>{copy.visionStrong}</strong>{copy.visionEnd}</p>
              </div>
              <div className="skills" aria-label={copy.skillsLabel}>
                {skillIcons.map((Icon, index) => <span className="skill" key={index}><Icon /> {copy.skills[index]}</span>)}
              </div>
            </div>
          </section>
          <section className="content-section" id="cultura" aria-labelledby="culture-title">
            <div className="section-heading">
              <div><span className="section-index">{copy.cultureIndex}</span><h2 id="culture-title">{copy.cultureTitle}</h2></div>
              <p>{copy.cultureLead}<br />{copy.cultureDescription}</p>
            </div>
            <div className="culture-grid">
              {principleIcons.map((Icon, index) => <article className="warm-panel culture-card" key={index}>
                <span className="icon-tile"><Icon aria-hidden="true" /></span>
                <div><h3>{copy.principles[index]?.title}</h3><p>{copy.principles[index]?.description}</p></div>
                <span className="card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </article>)}
            </div>
            <p className="culture-note">{copy.cultureNote}</p>
          </section>
          <HardSkills lang={lang} />
          <section className="contact-section" id="contato" aria-labelledby="contact-title">
            <div className="contact-layout">
              <div className="contact-copy"><span className="section-index">{copy.contactIndex}</span><h2 id="contact-title">{copy.contactTitle}<br />{copy.contactTitleSecond}</h2><p>{copy.contactDescription}</p><a className="contact-email" href="mailto:contato@marlonbastida.tech"><Mail /> contato@marlonbastida.tech <ArrowUpRight size={13} /></a></div>
              <form className="contact-form" noValidate onSubmit={handleContact} onInput={event => { submissionId.current = null; setSendError(''); if (contactAttempted) { checkContact(event.currentTarget); setContactNotice(false) } }}>
                <div className="form-row"><label className="field">{copy.nameLabel}<input name="name" placeholder={copy.namePlaceholder} required maxLength={100} autoComplete="name" aria-invalid={contactErrors.name || undefined} aria-describedby={contactErrors.name ? 'contact-name-error' : undefined} />{contactErrors.name && <span className="field-error" id="contact-name-error">{copy.contactErrors.name}</span>}</label><label className="field">{copy.emailLabel}<input name="email" type="email" placeholder={copy.emailPlaceholder} required maxLength={254} autoComplete="email" aria-invalid={contactErrors.email || undefined} aria-describedby={contactErrors.email ? 'contact-email-error' : undefined} />{contactErrors.email && <span className="field-error" id="contact-email-error">{copy.contactErrors.email}</span>}</label></div>
                <label className="field">{copy.messageLabel}<textarea name="message" placeholder={copy.messagePlaceholder} required minLength={10} maxLength={5000} aria-invalid={contactErrors.message || undefined} aria-describedby={contactErrors.message ? 'contact-message-error' : undefined} />{contactErrors.message && <span className="field-error" id="contact-message-error">{copy.contactErrors.message}</span>}</label>
                <div className="form-bottom"><p className="form-note">{copy.formNote}</p><Button variant="warm" type="submit" disabled={sending} className={contactNotice ? 'contact-send-success' : undefined}>{sending ? copy.sending : copy.submit} <ArrowRight /></Button></div>
                {sendError && <p className="field-error" role="alert">{sendError}</p>}
                {contactNotice && <p className="form-note" role="status">{copy.contactNotice}</p>}
              </form>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
