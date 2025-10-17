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
import { zodResolver } from '@hookform/resolvers/zod'

import { addressFormSchema } from '../model'

interface AddressFormProps {
  onSubmit: (data: z.infer<typeof addressFormSchema>) => void
}

export const AddressForm = ({ onSubmit }: AddressFormProps) => {
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
