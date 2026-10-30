import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (relative: string) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8')

const header = read('../components/site-header.tsx')
const copy = read('../lib/portfolio-copy.ts')

describe('Partners appears in the top menu', () => {
  it('links to the partners section on the home page', () => {
    expect(header).toContain('<Link className="partners-link" to="/" hash="parceiros" search={{ lang }}>{copy.partnersLink}</Link>')
  })

  it('places Parceiros after Portfólio and before the contact link', () => {
    const order = ['portfolioLink}</Link>', 'partnersLink}</Link>', 'nav-contact']
    const positions = order.map(token => header.indexOf(token))
    expect(positions.every(position => position > -1)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
  })

  it('shows Parceiros in Portuguese and Partners in English', () => {
    const [ptSection, enSection] = copy.split('const en: typeof pt')
    expect(ptSection).toContain("partnersLink: 'Parceiros'")
    expect(enSection).toContain("partnersLink: 'Partners'")
  })
})
