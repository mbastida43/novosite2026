import { describe, expect, it } from 'vitest'
import { partners } from '@/lib/partners'

describe('Partners section', () => {
  it('shows eight partner frames', () => {
    expect(partners).toHaveLength(8)
  })

  it('shows each named partner with the role given by the owner, in both languages', () => {
    expect(partners.slice(0, 7).map(p => [p.name, p.role?.pt, p.role?.en])).toEqual([
      ['Marcelo da Silva Pires', 'DevOps Engineer', 'DevOps Engineer'],
      ['Heinz Dieter Nevermann Zamorano', 'Consultor DevOps', 'DevOps Consultant'],
      ['Mariana B S', 'Cybersecurity', 'Cybersecurity'],
      ['Tácio Souza de Oliveira', 'DevOps Engineer', 'DevOps Engineer'],
      ['Levi Leopoldino Alves', 'DevOps Engineer', 'DevOps Engineer'],
      ['Amaury Borges Souza', 'AWS Community Builder', 'AWS Community Builder'],
      ['Bianca Veit da Silva', 'Platform Engineer', 'Platform Engineer'],
    ])
  })

  it('puts Marcelo first, ahead of Heinz', () => {
    expect(partners[0]?.name).toBe('Marcelo da Silva Pires')
    expect(partners[1]?.name).toBe('Heinz Dieter Nevermann Zamorano')
  })

  it('links Marcelo to the requested LinkedIn profile', () => {
    expect(partners[0]?.url).toBe('https://www.linkedin.com/in/marcpires/')
  })

  it('links the second partner to the requested LinkedIn profile', () => {
    const second = partners[1]
    expect(second?.name).toBe('Heinz Dieter Nevermann Zamorano')
    expect(second?.url).toBe('https://www.linkedin.com/in/heinz-nevermann/')
  })

  it('links the third partner to the requested LinkedIn profile', () => {
    const third = partners[2]
    expect(third?.name).toBe('Mariana B S')
    expect(third?.url).toBe('https://www.linkedin.com/in/marianabsz/')
  })

  it('links the fourth partner to the requested LinkedIn profile', () => {
    const fourth = partners[3]
    expect(fourth?.name).toBe('Tácio Souza de Oliveira')
    expect(fourth?.url).toBe('https://www.linkedin.com/in/taciosouzaoliveira/')
  })

  it('links the fifth partner to the requested LinkedIn profile', () => {
    const fifth = partners[4]
    expect(fifth?.name).toBe('Levi Leopoldino Alves')
    expect(fifth?.url).toBe('https://www.linkedin.com/in/levinux/')
  })

  it('links the sixth partner to the requested LinkedIn profile', () => {
    const sixth = partners[5]
    expect(sixth?.name).toBe('Amaury Borges Souza')
    expect(sixth?.url).toBe('https://www.linkedin.com/in/amaurybsouza/')
  })

  it('links the seventh partner to the requested LinkedIn profile', () => {
    const seventh = partners[6]
    expect(seventh?.name).toBe('Bianca Veit da Silva')
    expect(seventh?.url).toBe('https://www.linkedin.com/in/biancaveitdasilva/')
  })

  it('shows a portrait for each named partner', () => {
    for (const partner of partners.slice(0, 7)) {
      expect(partner.photo).toMatch(/^\/__l5e\/assets-v1\//)
    }
  })

  it('shifts Amaury portrait so the center crop does not cut his face', () => {
    expect(partners[5]?.photoPosition).toBe('right top')
    expect(partners.filter((_, i) => i !== 5).every(p => p.photoPosition === undefined)).toBe(true)
  })

  it('opens each partner portfolio from their name', () => {
    expect(partners[0]?.portfolio).toBe('https://github.com/marcpires?tab=repositories')
    expect(partners[1]?.portfolio).toBe('https://hnz.com.br')
    expect(partners[2]?.portfolio).toBe('https://github.com/marianabsctba')
    expect(partners[3]?.portfolio).toBe('https://engineer.tacio.cloud/')
    expect(partners[4]?.portfolio).toBe('https://dougbrazil.tech/')
    expect(partners[5]?.portfolio).toBeUndefined()
    expect(partners[6]?.portfolio).toBe('https://devopsdays.org/events/2024-campinas/speakers/bianca-veit/')
  })

  it('keeps the remaining frames as unlabeled placeholders', () => {
    for (const partner of partners.slice(7)) {
      expect(partner.name).toBeUndefined()
      expect(partner.url).toBeUndefined()
    }
  })
})
