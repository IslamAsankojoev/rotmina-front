import z from 'zod';

export const ReturnRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  shippingAddress: z.string().min(1, 'Shipping address is required'),
  orderNumber: z.string().min(1, 'Order number is required'),
  comment: z.string().min(1, 'Comment is required'),
  followingOption: z.string().min(1, 'Following option is required'),
});