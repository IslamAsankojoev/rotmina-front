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
import { Label } from '@/shadcn/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shadcn/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { AddressService } from '../../Address'
import { addressFormSchema } from '../model'

interface AddressFormProps {
  onSubmit: (data: z.infer<typeof addressFormSchema>) => void
  setShippingAddress: (address: string) => void
}

export const AddressForm = ({
  onSubmit,
  setShippingAddress,
}: AddressFormProps) => {
  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    error: errorAddresses,
  } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => AddressService.getMyAddresses(),
  })

  const form = useForm<z.infer<typeof addressFormSchema>>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: '',
      zipCode: '',
    },
    resolver: zodResolver(addressFormSchema),
  })
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data)
  })

  if (isLoadingAddresses) return <div>Loading...</div>
  if (errorAddresses) return <div>Error: {errorAddresses.message}</div>

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
                  <Input placeholder="NAME" {...field} />
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
                  <Input placeholder="SURNAME" {...field} />
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
                  <Input placeholder="EMAIL" {...field} />
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
                  <Input placeholder="PHONE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="ADDRESS" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="ZIP CODE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <RadioGroup
            defaultValue="comfortable"
            disabled={isLoadingAddresses}
            onValueChange={(value) => {
              setShippingAddress(value)
            }}
          >
            {addresses?.data.map((address) => (
              <div key={address.id} className="flex items-center gap-3">
                <RadioGroupItem
                  value={address?.documentId || ''}
                  id={address.documentId || ''}
                />
                <Label htmlFor={address?.documentId || ''}>
                  {address.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            type="submit"
            className="uppercase"
            variant="outline-minimal"
            size="lg"
          >
            Next
          </Button>
        </form>
      </Form>
    </div>
  )
}
