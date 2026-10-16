import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { portfolioCopy, type Language } from '@/lib/portfolio-copy'

const COURSE_URL = 'https://www.youtube.com/watch?v=grFAejuwhco&list=PLq0m0pvXczJqSOWdMOT9ob4pL4jPIDYUe'

export const Route = createFileRoute('/portfolio')({
  validateSearch: (search: Record<string, unknown>): { lang: Language } => ({ lang: search['lang'] === 'en' ? 'en' : 'pt' }),
  head: ({ match }) => {
    const copy = portfolioCopy[match.search.lang]
    return { meta: [
      { title: `${copy.portfolioTitle} | Marlon Bastida | DevSecOps Engineer` },
      { name: 'description', content: copy.portfolioPage.description },
      { property: 'og:title', content: `${copy.portfolioTitle} | Marlon Bastida` },
      { property: 'og:description', content: copy.portfolioPage.socialDescription },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ] }
  },
  component: Portfolio,
})

function Portfolio() {
  const { lang } = Route.useSearch()
  const navigate = Route.useNavigate()
  const copy = portfolioCopy[lang]
  function changeLanguage(language: Language) {
    void navigate({ search: { lang: language }, resetScroll: false, replace: true })
  }
  return (
    <>
      <a href="#conteudo" className="skip-link">{copy.skip}</a>
      <SiteHeader lang={lang} onLanguageChange={changeLanguage} />
      <main id="conteudo">
        <div className="site-container">
          <section className="content-section portfolio-page" aria-labelledby="portfolio-title">
            <h1 id="portfolio-title" className="page-title">{copy.portfolioTitle}</h1>
            <div className="portfolio-course">
              <h2>{copy.courseTitle}</h2>
              <Button variant="warm" className="press-button" asChild>
                <a href={COURSE_URL} target="_blank" rel="noopener noreferrer">{copy.courseWatch} <ArrowUpRight /></a>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
