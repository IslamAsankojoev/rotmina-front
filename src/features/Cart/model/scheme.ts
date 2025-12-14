import z from 'zod'

export const orderFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
})

export const paymentFormSchema = z.object({
  cardNumber: z.string().min(1, 'Card number is required'),
  nameOnCard: z.string().min(1, 'Name on card is required'),
  phone: z.string().min(1, 'Phone number is required'),
  expirationDate: z.string().min(1, 'Expiration date is required'),
  cvv: z.string().min(1, 'CVV is required'),
  cardHolderId: z.string().min(1, 'Card holder id is required'),
  terms: z.boolean().refine((data) => data, {
    message: 'You must accept the terms and conditions',
  }),
})

export const addressFormSchema = z.object({
  city: z.string().min(1, 'City is required'),
  streetName: z.string().min(1, 'Street name is required'),
  houseNum: z.string().min(1, 'House number is required'),
  apartment: z.string(),
  floor: z.string(),
  entrance: z.string(),
  zip_code: z.string().min(1, 'Zipcode is required'),
})