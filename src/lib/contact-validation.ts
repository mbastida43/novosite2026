import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
})

export type ContactField = keyof z.infer<typeof contactSchema>

export function validateContact(values: Record<ContactField, string>) {
  return contactSchema.safeParse(values)
}