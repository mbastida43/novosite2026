import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { portfolioCopy, type Language } from '@/lib/portfolio-copy'

export function SiteFooter({ lang }: { lang: Language }) {
  const copy = portfolioCopy[lang]
  return (
    <footer className="site-footer site-container">
      <span>© {new Date().getFullYear()} Marlon Bastida</span>
      <span className="footer-quote">{copy.quote}<span className="quote-attr">{copy.quoteAuthor}</span></span>
      <Link to="/" hash="inicio" search={{ lang }} className="footer-signature">{copy.backToTop} <ArrowUpRight size={13} /></Link>
    </footer>
  )
}
