'use client'

import { Button } from '@/shadcn/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shadcn/components/ui/form'
import { Typography, useAuth, useDictionary } from '@/src/shared'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { NewPasswordSchema } from '../model/validation'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '@/shadcn/components/ui/spinner'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shadcn/components/ui/input-group'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

export const NewPasswordForm = () => {
  const { dictionary } = useDictionary()
  const t = (dictionary as Record<string, Record<string, string>>).newPassword || {
    title: 'Password Reset',
    description: 'Enter your new password',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    reset: 'Reset',
    incorrect: 'Incorrect',
  }
  const { newPassword, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput
                        placeholder={t.newPassword}
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <InputGroupAddon align="inline-end">
                        <Button
                          type='button'
                          variant="link"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
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
                    <InputGroup>
                      <InputGroupInput
                        placeholder={t.confirmPassword}
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        {...field}
                      />
                      <InputGroupAddon align="inline-end">
                        <Button
                          type='button'
                          variant="link"
                          onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                        >
                          {showPasswordConfirmation ? <EyeIcon /> : <EyeOffIcon />}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
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
              {t.reset}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
