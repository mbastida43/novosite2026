import { describe, expect, it } from 'vitest'
import { contactSchema, validateContact } from '@/lib/contact-validation'
import { hardSkillRows } from '@/components/hard-skills'

describe('Contact validation', () => {
  it.each(['&*()%$##@$@#$!@$@', 'Marlon&', 'Marlon123', 'Marlon_Bastida', 'Marlon😀'])('rejects symbols and numbers in the name: %s', name => {
    const input = { name, email: 'visitor@example.com', message: 'Hello Marlon!' }
    expect(validateContact(input).success).toBe(false)
    expect(() => contactSchema.parse(input)).toThrow()
  })
  it.each(['Marlon Bastida', 'João da Conceição', 'Jose\u0301 Silva'])('accepts letters, accents and spaces in the name: %s', name => {
    expect(validateContact({ name, email: 'visitor@example.com', message: 'Hello Marlon!' }).success).toBe(true)
  })
  it('requires every field including non-whitespace text', () => {
    const result = validateContact({ name: '   ', email: '', message: '   ' })
    expect(result.success).toBe(false)
    if (!result.success) expect([...new Set(result.error.issues.map(issue => issue.path[0]))]).toEqual(['name', 'email', 'message'])
  })
  it('rejects incomplete email addresses and short messages', () => {
    expect(validateContact({ name: 'Visitor', email: 'visitor@', message: 'Hello there!' }).success).toBe(false)
    expect(validateContact({ name: 'Visitor', email: 'visitor@example.com', message: 'Short' }).success).toBe(false)
  })
  it('accepts and trims complete input', () => {
    const result = validateContact({ name: ' Visitor ', email: ' visitor@example.com ', message: ' Hello Marlon! ' })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.name).toBe('Visitor')
  })
  it('keeps the requested AI tools in their bands without duplicates', () => {
    expect(hardSkillRows[0]).toEqual(expect.arrayContaining(['Gemini', 'ChatGPTi']))
    expect(hardSkillRows[1]).toEqual(expect.arrayContaining(['Claude', 'Grok']))
    for (const row of hardSkillRows) expect(new Set(row).size).toBe(row.length)
  })
})