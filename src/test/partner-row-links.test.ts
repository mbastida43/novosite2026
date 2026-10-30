import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (relative: string) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8')

const page = read('../routes/index.tsx')

describe('Partner buttons stay usable while the row slides', () => {
  it('does not block clicks on the copy of the row that is on screen', () => {
    expect(page).not.toContain('inert')
  })

  it('hides the sliding copy from screen readers', () => {
    expect(page).toContain('aria-hidden={duplicate || undefined}')
  })

  it('keeps the sliding copy out of the keyboard order', () => {
    const skipped = page.match(/tabIndex=\{duplicate \? -1 : undefined\}/g) ?? []
    expect(skipped).toHaveLength(2)
  })

  it('keeps the LinkedIn button as the only link to a LinkedIn profile', () => {
    const links = page.match(/href=\{partner\.url\}/g) ?? []
    expect(links).toHaveLength(1)
  })

  it('links the partner name to the portfolio, opening it in a new tab', () => {
    const links = page.match(/href=\{partner\.portfolio\}/g) ?? []
    expect(links).toHaveLength(1)
    expect(page).toContain('href={partner.portfolio} target="_blank" rel="noreferrer noopener"')
  })
})
