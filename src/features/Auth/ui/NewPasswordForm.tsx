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
import { Typography, useAuth } from '@/src/shared'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { NewPasswordSchema } from '../model/validation'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '@/shadcn/components/ui/spinner'

export const NewPasswordForm = () => {
  const { newPassword, loading } = useAuth()
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || ''
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
      code: code,
    },
    resolver: zodResolver(NewPasswordSchema),
  })

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    newPassword.mutate({
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      code: data.code,
    })
  }

  return (
    <>
      <div className="w-full max-w-[800px] bg-white p-4 py-15 md:p-15">
        <Typography variant="text_title">New password</Typography>
        <Typography variant="text_main" className="my-4">
          Enter your new password
        </Typography>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="PASSWORD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="CONFIRM PASSWORD" {...field} />
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
              Reset password
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
