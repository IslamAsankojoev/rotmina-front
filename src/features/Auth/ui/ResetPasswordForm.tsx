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
import { Typography, useAuth, useDictionary } from '@/src/shared'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { ResetPasswordSchema } from '../model/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '@/shadcn/components/ui/spinner'

export const ResetPasswordForm = () => {
  const { dictionary } = useDictionary()
  const t = ((dictionary as unknown) as Record<string, Record<string, string>>).resetPassword || {
    title: 'Reset password',
    description: 'Enter your email and you will receive a link to reset your password',
    email: 'EMAIL',
    sendEmail: 'Send email',
  }
  const { resetPassword, loading } = useAuth()
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ResetPasswordSchema),
  })

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    resetPassword.mutate({
      email: data.email,
    })
  }

  return (
    <>
      <div className="w-full max-w-[800px] bg-white p-4 py-15 md:p-15">
        <Typography variant="text_title">{t.title}</Typography>
        <Typography variant="text_main" className="my-4">
          {t.description}
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
                    <Input placeholder={t.email} {...field} />
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
              disabled={loading}
            >
              {loading && <Spinner />}
              {t.sendEmail}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
