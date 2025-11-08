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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Address } from '../../Address'
import { orderFormSchema } from '../model'
import { AddressForm } from './AddressForm'
import { Dispatch, SetStateAction } from 'react'
import { Spinner } from '@/shadcn/components/ui/spinner'
import { useDictionary } from '@/src/shared'

interface OrderFormProps {
  onSubmit: (data: z.infer<typeof orderFormSchema>) => void
  setShippingAddress: Dispatch<SetStateAction<Address | null>>
  selectedAddress: Address
  isLoading: boolean
}

export const OrderForm = ({ onSubmit, setShippingAddress, selectedAddress, isLoading }: OrderFormProps) => {
  const { dictionary } = useDictionary()
  const t = ((dictionary as unknown) as Record<string, Record<string, string>>).orderForm || {
    name: 'NAME',
    surname: 'SURNAME',
    email: 'EMAIL',
    phone: 'PHONE',
    next: 'Next',
  }
  const form = useForm<z.infer<typeof orderFormSchema>>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
    },
    resolver: zodResolver(orderFormSchema),
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t.name} {...field} />
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
                  <Input placeholder={t.surname} {...field} />
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
                  <Input placeholder={t.email} {...field} />
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
                  <Input placeholder={t.phone} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AddressForm setShippingAddress={setShippingAddress} selectedAddress={selectedAddress} />

          <Button
            type="submit"
            className="uppercase"
            variant="outline-minimal"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : t.next}
          </Button>
        </form>
      </Form>
    </div>
  )
}
