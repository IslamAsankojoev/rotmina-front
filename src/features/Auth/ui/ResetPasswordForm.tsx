'use client'

import { Button } from '@/shadcn/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shadcn/components/ui/form'
import { Input } from '@/shadcn/components/ui/input'
import { Typography } from '@/src/shared'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { ResetPasswordSchema } from '../model/validation'

export const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    console.log('Form submitted:', data)
  }

  return (
    <>
      <div className="w-full max-w-[800px] bg-white p-4 py-15 md:p-15">
        <Typography variant="text_title">Reset password</Typography>
        <Typography variant="text_main" className="my-4">
          Enter your email and we’ll send you a link to reset your password
        </Typography>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="EMAIL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="uppercase"
              variant="outline-minimal"
              size="lg"
            >
              Send email
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
