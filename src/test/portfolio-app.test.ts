import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { portfolioCopy } from '@/lib/portfolio-copy'

const read = (relative: string) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8')

const page = read('../routes/portfolio.tsx')

describe('Gmail Cleaner Buddy entry on the portfolio page', () => {
  it('shows the app title in both languages', () => {
    expect(portfolioCopy.pt.appTitle).toBe('Gmail Cleaner Buddy - Android App')
    expect(portfolioCopy.en.appTitle).toBe('Gmail Cleaner Buddy - Android App')
  })

  it('links the button to the requested GitHub repository in a new tab', () => {
    expect(page).toContain("const APP_URL = 'https://github.com/mbastida43/gmailcleanerbuddyapp'")
    expect(page).toContain('href={APP_URL} target="_blank" rel="noopener noreferrer"')
  })
})
