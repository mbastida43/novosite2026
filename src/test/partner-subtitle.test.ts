import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { portfolioCopy } from '@/lib/portfolio-copy'

const read = (relative: string) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8')

const page = read('../routes/index.tsx')

describe('Partners subtitle', () => {
  it('uses the requested Dev(Sec)Ops wording in Portuguese', () => {
    expect(portfolioCopy.pt.partners.subtitle).toBe('Profissionais que agregam valor a Cultura Dev(Sec)Ops')
  })

  it('uses the requested Dev(Sec)Ops wording in English', () => {
    expect(portfolioCopy.en.partners.subtitle).toBe('Professionals who add value to Dev(Sec)Ops culture')
  })

  it('shows no large section title, only the subtitle', () => {
    expect(page).not.toContain('copy.partners.title')
    expect(page).not.toContain('<h2 id="partners-title"')
    expect(page).toContain('<p id="partners-title" className="partners-subtitle shimmer-sweep">')
  })
})
