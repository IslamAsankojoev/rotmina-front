import z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const SigninSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const ResetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})


export const NewPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  passwordConfirmation: z.string().min(6, 'Password must be at least 6 characters long'),
  code: z.string().min(1, 'Code is required'),
})