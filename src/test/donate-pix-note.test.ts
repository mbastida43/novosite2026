import { describe, expect, it } from 'vitest'

import { portfolioCopy } from '@/lib/portfolio-copy'

const COUNTRIES_PT = ['Argentina', 'Chile', 'Espanha', 'Estados Unidos', 'Paraguai', 'Portugal', 'Uruguai']
const COUNTRIES_EN = ['Argentina', 'Chile', 'Spain', 'the United States', 'Paraguay', 'Portugal', 'Uruguay']

describe('PIX explanation under the donate buttons', () => {
  it('states in Portuguese that PIX is Brazilian and lists the accepting countries', () => {
    const note = portfolioCopy.pt.articles.donate.pixNote
    expect(note).toMatch(/m[ée]todo de pagamento brasileiro/)
    for (const country of COUNTRIES_PT) expect(note).toContain(country)
  })

  it('states the same in English', () => {
    const note = portfolioCopy.en.articles.donate.pixNote
    expect(note).toMatch(/Brazilian payment method/)
    for (const country of COUNTRIES_EN) expect(note).toContain(country)
  })
})
