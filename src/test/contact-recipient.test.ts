import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (relative: string) => readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8')

const sendTrigger = read('../lib/contact.functions.ts')
const template = read('../lib/email-templates/contact-message.tsx')
const page = read('../routes/index.tsx')

const RECIPIENT = 'contactme@marlonbastida.com.br'
const COPY = 'marlon.bastida@gmail.com'

describe('Contact message recipients', () => {
  it('sends site messages to contactme@marlonbastida.com.br', () => {
    expect(sendTrigger).toContain(`sendTemplateEmail('contact-message', '${RECIPIENT}'`)
    expect(template).toContain(`to: '${RECIPIENT}'`)
  })

  it('copies every message to marlon.bastida@gmail.com', () => {
    expect(sendTrigger).toContain(`cc: ['${COPY}']`)
  })

  it('shows the same address visitors can write to directly', () => {
    expect(page).toContain(`href="mailto:${RECIPIENT}"`)
    expect(page).toContain(`${RECIPIENT} <ArrowUpRight`)
  })

  it('no longer points at the address that has no mailbox', () => {
    expect(sendTrigger).not.toContain('contato@marlonbastida.tech')
    expect(template).not.toContain('contato@marlonbastida.tech')
    expect(page).not.toContain('contato@marlonbastida.tech')
  })
})
