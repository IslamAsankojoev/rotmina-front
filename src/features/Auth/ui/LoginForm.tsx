'use client'

import { useState } from 'react'

import { Button } from '@/shadcn/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shadcn/components/ui/form'
import { Input } from '@/shadcn/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shadcn/components/ui/input-group'
import { Spinner } from '@/shadcn/components/ui/spinner'
import { Typography, useAuth } from '@/src/shared'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { LoginSchema } from '../model/validation'

export const LoginForm = () => {
  const { login, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    login.mutate({
      identifier: data.email,
      password: data.password,
    })
  }

  return (
    <>
      <div className="w-full max-w-[800px] bg-white p-4 py-15 md:p-15">
        <Typography variant="text_title">Login</Typography>
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
                    <Input placeholder="EMAIL" type="email" {...field} />
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
                        placeholder="Enter password"
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
            <div className="flex justify-end">
              <Link
                href="/reset-password"
                className="text-right uppercase"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <Typography variant="text_main" className="mb-2 uppercase">
                Do not have an account?
              </Typography>
              <Link href="/signup" className="underline">
                SIGN UP
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
              Log in
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
