import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { portfolioCopy, type Language } from '@/lib/portfolio-copy'
import { useWebMCP } from 'use-webmcp-tool'
import { runWebMCPTool } from '@/lib/webmcp-telemetry'

type SiteHeaderProps = {
  lang: Language
  current?: 'artigos'
  onLanguageChange: (language: Language) => void
}

export function SiteHeader({ lang, current, onLanguageChange }: SiteHeaderProps) {
  const copy = portfolioCopy[lang]
  useWebMCP({
    name: 'read_site_navigation',
    description: 'Read the current portfolio language and the menu destinations available on this page.',
    annotations: { readOnlyHint: true },
    execute: () => runWebMCPTool('read_site_navigation', () =>
      `${lang}: ${copy.aboutLink} (/#sobre), ${copy.cultureLink} (/#cultura), ${copy.articlesLink} (/artigos), ${copy.portfolioLink} (/portfolio), ${copy.contactLink} (/#contato).`),
  })
  return (
    <header className="site-header-bar">
      <div className="site-header site-container">
        <Link className="brand" to="/" hash="inicio" search={{ lang }} aria-label={copy.home}>
          <span className="brand-mark">MB.</span>Marlon Bastida<span className="text-muted-foreground">/</span>
        </Link>
        <nav className="header-nav" aria-label={copy.navigation}>
          <Link className="desktop-link" to="/" hash="sobre" search={{ lang }}>{copy.aboutLink}</Link>
          <Link className="culture-link" to="/" hash="cultura" search={{ lang }}>{copy.cultureLink}</Link>
          <Link className="articles-link" to="/artigos" search={{ lang }}>{copy.articlesLink}</Link>
          <Link className="portfolio-link" to="/portfolio" search={{ lang }} target="_blank" rel="noopener noreferrer">{copy.portfolioLink}</Link>
          <Link className="nav-contact" to="/" hash="contato" search={{ lang }}>{copy.contactLink} <ArrowUpRight size={14} /></Link>
          <div className="language-switch" data-language={lang} role="group" aria-label={copy.languageLabel}>
            <span className="language-thumb" aria-hidden="true" />
            <Button variant="ghost" className="language-option" aria-label="Português" aria-pressed={lang === 'pt'} onClick={() => onLanguageChange('pt')}>PT</Button>
            <Button variant="ghost" className="language-option" aria-label="English" aria-pressed={lang === 'en'} onClick={() => onLanguageChange('en')}>EN</Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
