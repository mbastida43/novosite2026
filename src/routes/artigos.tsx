import { createFileRoute } from '@tanstack/react-router'
import { DonateButtons } from '@/components/donate-buttons'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CodeBlock } from '@/components/code-block'
import { portfolioCopy, type Language } from '@/lib/portfolio-copy'
import { articlesByLanguage } from '@/lib/articles'

export const Route = createFileRoute('/artigos')({
  validateSearch: (search: Record<string, unknown>): { lang: Language } => ({ lang: search['lang'] === 'en' ? 'en' : 'pt' }),
  head: ({ match }) => {
    const copy = portfolioCopy[match.search.lang]
     const articles = articlesByLanguage[match.search.lang]
    return { meta: [
      { title: `${copy.articles.title} | Marlon Bastida | DevSecOps Engineer` },
       { name: 'description', content: articles[0]?.summary ?? copy.articles.metadata.description },
      { property: 'og:title', content: `${copy.articles.title} | Marlon Bastida` },
       { property: 'og:description', content: articles[0]?.summary ?? copy.articles.metadata.socialDescription },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ] }
  },
  component: Artigos,
})

function Artigos() {
  const { lang } = Route.useSearch()
  const navigate = Route.useNavigate()
  const copy = portfolioCopy[lang]
  const page = copy.articles
  const articles = articlesByLanguage[lang]
  function changeLanguage(language: Language) {
    void navigate({ search: { lang: language }, resetScroll: false, replace: true })
  }
  return (
    <>
      <a href="#conteudo" className="skip-link">{copy.skip}</a>
      <SiteHeader lang={lang} current="artigos" onLanguageChange={changeLanguage} />
      <main id="conteudo">
        <div className="site-container">
          <section className="content-section articles-section" aria-labelledby="articles-title">
            <div className="section-heading">
              <div><span className="section-index">{page.index}</span><h2 id="articles-title">{page.title}</h2></div>
              <p>{page.lead}</p>
            </div>
            <div className="article-list" aria-label={page.listLabel}>
              {articles.map((article) => (
                <article className="article-reading" key={article.slug} lang={lang === 'pt' ? 'pt-BR' : 'en'} aria-labelledby={`${article.slug}-title`}>
                  <h1 className="article-title" id={`${article.slug}-title`}>{article.title}</h1>
                  <div className="article-body">
                    {article.blocks.map((block, index) => {
                      if (block.type === 'image') return <figure key={index} className="article-figure"><a href={block.url} target="_blank" rel="noopener noreferrer"><img src={block.url} alt={block.alt} loading="lazy" decoding="async" /></a><figcaption>{block.caption}</figcaption></figure>
                      if (block.type === 'heading') return <h2 key={index} className="article-subheading">{block.text}</h2>
                      if (block.type === 'code') return <CodeBlock key={index} code={block.code} copyLabel={page.copyCode} copiedLabel={page.copiedCode} />
                      if (block.type === 'list') return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
                      if (block.type === 'link') return <p key={index}>{block.text}: <a href={block.url} target="_blank" rel="noopener noreferrer">{block.url}</a></p>
                      return <p key={index}>{block.text}</p>
                    })}
                  </div>
                </article>
              ))}
            </div>
            <div className="article-end">
              <hr className="article-end-rule" />
              <p className="article-end-note">{page.contribute}</p>
              <DonateButtons labels={page.donate} />

            </div>
          </section>

        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  )
}
