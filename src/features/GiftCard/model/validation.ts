import z from 'zod'

export const giftCardValidationSchema = z.object({
  recipientsName: z.string().min(1, "Recipient's name is required"),
  recipientsEmail: z.string().email('Invalid email address'),
  yourName: z.string().min(1, 'Your name is required'),
  yourEmail: z.string().email('Invalid email address'),
  personalMessage: z.string().optional(),
  amount: z.number().min(1, 'Amount must be greater than 0'),
})
