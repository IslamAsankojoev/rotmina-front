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
import { useAddGiftCard, useCartActions } from '@/src/app/store'
import { useLangCurrancy } from '@/src/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { giftCardValidationSchema } from '../model/validation'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shadcn/components/ui/select'

export const GiftCardForm = () => {
  const form = useForm<z.infer<typeof giftCardValidationSchema>>({
    defaultValues: {
      recipientsName: '',
      recipientsEmail: '',
      yourName: '',
      yourEmail: '',
      personalMessage: '',
      amount: '',
    },
    resolver: zodResolver(giftCardValidationSchema),
  })
  const { addGiftCardToCart } = useAddGiftCard()
  const { openCart } = useCartActions()
  const { currency, getPrice } = useLangCurrancy()

  const onSubmit = (data: z.infer<typeof giftCardValidationSchema>) => {

    addGiftCardToCart(
      Number(data.amount),
      data.recipientsEmail,
      data.recipientsName,
      data.personalMessage,
    )

    // Open cart after adding
    openCart()

    // Reset form
    form.reset()
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="recipientsName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="RECIPIENT'S NAME" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipientsEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="RECIPIENT'S EMAIL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yourName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="YOUR NAME" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yourEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="YOUR EMAIL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalMessage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="PERSONAL MESSAGE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value.toString()}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Amount</SelectLabel>
                        <SelectItem value="250">{getPrice(250)} {currency}</SelectItem>
                        <SelectItem value="300">{getPrice(300)} {currency}</SelectItem>
                        <SelectItem value="400">{getPrice(400)} {currency}</SelectItem>
                        <SelectItem value="500">{getPrice(500)} {currency}</SelectItem>
                        <SelectItem value="750">{getPrice(750)} {currency}</SelectItem>
                        <SelectItem value="1000">{getPrice(1000)} {currency}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
            Add to Cart
          </Button>
        </form>
      </Form>
    </div>
  )
}
