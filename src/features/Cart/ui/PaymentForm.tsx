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
  termsChecked: boolean
}

export const PaymentForm = ({ onSubmit, termsChecked }: PaymentFormProps) => {
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    defaultValues: {
      cardNumber: '',
      nameOnCard: '',
      phone: '',
      expirationDate: '',
      cvv: '',
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
                  <Input placeholder="CARD NUMBER" {...field} />
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
            name="phone"
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
            name="expirationDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="CVV" {...field} />
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
