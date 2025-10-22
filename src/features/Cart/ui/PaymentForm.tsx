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
import { useForm } from 'react-hook-form'
import z from 'zod'

import { paymentFormSchema } from '../model/scheme'

interface PaymentFormProps {
  onSubmit: (data: z.infer<typeof paymentFormSchema>) => void
}

export const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    defaultValues: {
      cardNumber: '4012888811110001',
      nameOnCard: 'John Doe',
      phone: '+1234567890',
      expirationDate: '12/25',
      cvv: '123',
    },
  })

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="CARD NUMBER" maxLength={16} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameOnCard"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="NAME ON CARD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="TELEPHONE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="EXP DATE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="CVV" maxLength={3} {...field} />
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
            Pay
          </Button>
        </form>
      </Form>
    </div>
  )
}
