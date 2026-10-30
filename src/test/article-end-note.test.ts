import { describe, expect, it } from 'vitest'

import { portfolioCopy } from '@/lib/portfolio-copy'

describe('Article closing note', () => {
  it('keeps the Portuguese sentence exactly as supplied', () => {
    expect(portfolioCopy.pt.articles.contribute).toBe(
      'Se gostou dos meu artigos e quiser ver mais e puder contribuir deixe o valor que quiser abaixo',
    )
  })

  it('offers the same closing note in English', () => {
    const note = portfolioCopy.en.articles.contribute
    expect(note).not.toBe(portfolioCopy.pt.articles.contribute)
    expect(note).toMatch(/amount you wish below/)
  })
})
