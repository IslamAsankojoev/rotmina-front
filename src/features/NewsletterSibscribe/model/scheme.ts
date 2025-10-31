import z from 'zod'

export const NewsletterSubscriberSchema = z.object({
  email: z.string().email('Invalid email address'),
})