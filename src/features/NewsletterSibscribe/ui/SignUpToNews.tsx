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
import { Typography, useDictionary } from '@/src/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Libre_Caslon_Text } from 'next/font/google'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { NewsletterSibscribeService } from '../model/api'
import { NewsletterSubscriberSchema } from '../model/scheme'
import { NewsletterSubscriber } from '../model/type'
import { toast } from 'sonner'

const libreCaslonText = Libre_Caslon_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
})
export const SignUpToNews = () => {
  const { dictionary } = useDictionary()
  const t = (dictionary as Record<string, Record<string, string>>).newsletter || {
    signUpForUpdates: 'Sign up for updates',
    enterEmail: 'Email',
    send: 'SEND',
    subscribeSuccess: 'You are now subscribed to the newsletter',
    subscribeError: 'Failed to subscribe to the newsletter',
  }
  const form = useForm<z.infer<typeof NewsletterSubscriberSchema>>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(NewsletterSubscriberSchema),
  })

  const { mutate } = useMutation({
    mutationFn: (data: NewsletterSubscriber) =>
      NewsletterSibscribeService.subscribe(data),
    onSuccess: () => {
      toast.success(t.subscribeSuccess)
    },
    onError: () => {
      toast.error(t.subscribeError)
    },
  })

  const onSubmit = (data: z.infer<typeof NewsletterSubscriberSchema>) => {
    mutate(data)
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="text-white">
        <div className="inline-flex flex-col items-center justify-center gap-2.5">
          <div
            className={`justify-start ${libreCaslonText.className} text-white`}
          >
            <Typography variant="text_mobile_title2" className="italic">
              {t.signUpForUpdates}
            </Typography>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t.enterEmail}
                    className="text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="minimal">{t.send}</Button>
        </form>
      </Form>
    </div>
  )
}
