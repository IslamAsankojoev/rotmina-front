'use client'

import GoogleImage from '@/public/assets/google.svg'
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
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { LoginSchema } from '../model/validation'
import { Spinner } from '@/shadcn/components/ui/spinner'

export const LoginForm = () => {
  const { login, loading } = useAuth()
  const form = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    login.mutate(
      {
        identifier: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          // router.push('/account')
        },
        onError: (error) => {
          console.error(error)
        },
      },
    )
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
                    <Input placeholder="EMAIL" {...field} />
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
                    <Input placeholder="PASSWORD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href="/reset-password"
              className="text-right uppercase underline"
            >
              Forgot your password?
            </Link>
            <div className="flex flex-col items-center">
              <Typography variant="text_main" className="mb-2 uppercase">
                Don not have an account?
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
      <Button
        variant="minimal"
        size="lg"
        className="flex w-full max-w-[800px] items-center justify-center gap-4"
      >
        <Image src={GoogleImage} alt="Google logo" width={20} height={20} />
        <Typography variant="text_mini_footer" className="uppercase">
          Log in with Google
        </Typography>
      </Button>
    </>
  )
}
