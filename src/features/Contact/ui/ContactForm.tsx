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
import { useDictionary } from '@/src/shared'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { contactFormSchema } from '../model/validation'

export const ContactForm = () => {
  const { dictionary } = useDictionary()
  const t = ((dictionary as unknown) as Record<string, Record<string, string>>).contact || {
    name: 'NAME',
    emailPlaceholder: 'EMAIL',
    message: 'TEXT',
    send: 'Send',
  }

  const form = useForm<z.infer<typeof contactFormSchema>>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    console.log('Form submitted:', data)
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder={t.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder={t.emailPlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t.message} {...field} />
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
            {t.send}
          </Button>
        </form>
      </Form>
    </div>
  )
}
