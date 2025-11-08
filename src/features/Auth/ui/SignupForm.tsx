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
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { SigninSchema } from '../model/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '@/shadcn/components/ui/spinner'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shadcn/components/ui/input-group'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

export const SignupForm = () => {
  const { dictionary } = useDictionary()
  const t = ((dictionary as unknown) as Record<string, Record<string, string>>).signup || {
    title: 'Sign Up',
    name: 'NAME',
    surname: 'SURNAME',
    email: 'EMAIL',
    password: 'Enter password',
    hasAccount: 'Already have an account?',
    logIn: 'LOG IN',
    signUp: 'Sign up',
  }
  const { signup, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof SigninSchema>>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(SigninSchema),
  })

  const onSubmit = (data: z.infer<typeof SigninSchema>) => {
    signup.mutate({
      email: data.email,
      password: data.password,
      username: data.name,
      surname: data.surname,
    })
  }

  return (
    <>
      <div className="w-full max-w-[800px] bg-white p-4 py-15 md:p-15">
        <Typography variant="text_title">{t.title}</Typography>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t.name} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t.surname} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t.email} type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <InputGroup>
                      <InputGroupInput
                        placeholder={t.password}
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
            <div className="flex flex-col items-center">
              <Typography variant="text_main" className="mb-2 uppercase">
                {t.hasAccount}
              </Typography>
              <Link href="/login" className="underline">
                {t.logIn}
              </Link>
            </div>
            <Button
              type="submit"
              className="uppercase"
              variant="outline-minimal"
              size="lg"
              disabled={loading}
            >
              {loading && <Spinner />}
              {t.signUp}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
