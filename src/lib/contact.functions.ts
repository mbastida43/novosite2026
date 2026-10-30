import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { contactSchema } from './contact-validation'

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => contactSchema.extend({ submissionId: z.string().uuid() }).strict().parse(input))
  .handler(async ({ data }) => {
    const { sendTemplateEmail } = await import('./email-templates/send-email')
    try {
      const result = await sendTemplateEmail('contact-message', 'contactme@marlonbastida.com.br', {
        templateData: { name: data.name, email: data.email, message: data.message },
        cc: ['marlon.bastida@gmail.com'],
        replyTo: data.email,
        idempotencyKey: `contact-message-${data.submissionId}`,
      })
      return result.sent ? { status: 'sent' as const } : { status: 'suppressed' as const }
    } catch (error) {
      const { EmailAPIError } = await import('@lovable.dev/email-js')
      if (error instanceof EmailAPIError) {
        if (error.code === 'domain_not_verified') return { status: 'pending' as const }
        if (error.status === 429) return { status: 'rate_limited' as const }
      }
      return { status: 'error' as const }
    }
  })