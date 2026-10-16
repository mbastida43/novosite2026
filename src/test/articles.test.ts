import { describe, expect, it } from 'vitest'
import { articles, articlesByLanguage } from '@/lib/articles'

describe('Supplied article', () => {
  it('provides the complete Portuguese translation and preserves the original English version', () => {
    expect(articlesByLanguage.en).toBe(articles)
    const original = articlesByLanguage.en[0]
    const translated = articlesByLanguage.pt[0]
    expect(translated?.title).toBe('Quais cuidados devemos tomar ao usar um dispositivo móvel no mundo corporativo?')
    expect(translated?.summary).toContain('Em princípio, quando estamos em uma empresa')
    expect(translated?.blocks.map(block => block.type)).toEqual(original?.blocks.map(block => block.type))
    expect(translated?.blocks.filter(block => block.type === 'link').map(block => block.url)).toEqual(original?.blocks.filter(block => block.type === 'link').map(block => block.url))
    expect(translated?.blocks.find(block => block.type === 'list')?.items).toHaveLength(5)
    expect(JSON.stringify(translated?.blocks)).toContain('conformidade (validação)')
    expect(JSON.stringify(translated?.blocks)).not.toContain('Become a Medium member')
  })
  it('preserves the exact title and publishes the complete text without advertising', () => {
    expect(articles).toHaveLength(3)
    expect(articles[1]?.title).toBe('How to Perform a Secure Backup of a Linux Desktop to an AWS S3 Bucket')
    expect(articlesByLanguage.pt).toHaveLength(3)
    const article = articles[0]
    expect(article?.title).toBe('What precautions should we take when using a mobile device in the corporate world ?')
    const content = JSON.stringify(article?.blocks)
    expect(content).toContain('In principle, when we are in a company')
    expect(content).toContain('compliance (validation)')
    expect(content).toContain('twofactorauth.org/#social')
    expect(content).not.toContain('Become a Medium member')
    expect(article?.blocks.filter(block => block.type === 'list')).toHaveLength(1)
    expect(article?.blocks.filter(block => block.type === 'link')).toHaveLength(2)
  })
})