import { describe, expect, it } from 'vitest'
import { portfolioCopy } from '@/lib/portfolio-copy'

describe('Bilingual portfolio copy', () => {
  it('has complete nonempty translations for every Portuguese field', () => {
    function check(pt: unknown, en: unknown) {
      if (typeof pt === 'string') {
        expect(typeof en).toBe('string')
        expect(en).not.toBe('')
        return
      }
      if (Array.isArray(pt)) {
        expect(Array.isArray(en)).toBe(true)
        if (!Array.isArray(en)) return
        expect(en).toHaveLength(pt.length)
        pt.forEach((value, index) => check(value, en[index]))
        return
      }
      if (pt && en && typeof pt === 'object' && typeof en === 'object') {
        expect(Object.keys(en)).toEqual(Object.keys(pt))
        for (const key of Object.keys(pt)) {
          check((pt as Record<string, unknown>)[key], (en as Record<string, unknown>)[key])
        }
      }
    }
    check(portfolioCopy.pt, portfolioCopy.en)
  })

  it('preserves ten principles, biography facts and the quoted footer', () => {
    for (const copy of Object.values(portfolioCopy)) {
      expect(copy.principles).toHaveLength(10)
      expect(copy.biography).toContain('20')
      expect(copy.biography).toContain('B2/C1')
      expect(copy.quote.startsWith('"')).toBe(true)
      expect(copy.quote.endsWith('."')).toBe(true)
    }
    expect(portfolioCopy.en.submit).toBe('Send message')
    expect(portfolioCopy.pt.hardSkills.title).toBe('Competências Técnicas')
    expect(portfolioCopy.en.hardSkills.title).toBe('Hard skills')
  })
})