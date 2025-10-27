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

import { SigninSchema } from '../model/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '@/shadcn/components/ui/spinner'

export const SignupForm = () => {
  const { signup, loading } = useAuth()

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
        <Typography variant="text_title">Sign Up</Typography>
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
                    <Input placeholder="NAME" type="text" {...field} />
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
                    <Input placeholder="SURNAME" type="text" {...field} />
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
                    <Input placeholder="PASSWORD" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col items-center">
              <Typography variant="text_main" className="mb-2 uppercase">
                Already have an account?
              </Typography>
              <Link href="/login" className="underline">
                LOG IN
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
              Sign up
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
          Sign up with Google
        </Typography>
      </Button>
    </>
  )
}
