'use client'

import { Button } from '@/shadcn/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/shadcn/components/ui/form'
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { Typography, useDictionary } from '@/src/shared'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { ReturnRequestSchema } from '../model/validation'

export const ReturnForm = () => {
  const { dictionary } = useDictionary()
  const t = ((dictionary as unknown) as Record<string, Record<string, string>>).returns || {
    personalDetails: 'Personal Details',
    name: 'NAME',
    phone: 'PHONE',
    email: 'EMAIL',
    shippingAddress: "Shipping address in case you'd like an exchange",
    orderNumber: 'ORDER NUMBER',
    orderNumberDescription: '*The number appears next to the customer details on the invoice',
    comment: 'COMMENT',
    selectOption: 'Please select one of the following options:',
    iWantToExchange: "I'd like to exchange",
    iWantToReturn: "I'd like to return",
    returnOrExchange: 'Return or Exchange',
  }

  const form = useForm<z.infer<typeof ReturnRequestSchema>>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      shippingAddress: '',
      orderNumber: '',
      comment: '',
      followingOption: '',
    },
  })

  const onSubmit = (data: z.infer<typeof ReturnRequestSchema>) => {
    console.log('Form submitted:', data)
  }
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="text_main" className="uppercase">
        {t.personalDetails}
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="shippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t.shippingAddress}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orderNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t.orderNumber} {...field} />
                </FormControl>
                <FormDescription>
                  {t.orderNumberDescription}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t.comment} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Typography variant="text_main" className="uppercase">
              {t.selectOption}
            </Typography>
            <FormField
              control={form.control}
              name="followingOption"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-4"
                    >
                      {[
                        {
                          value: 'exchange',
                          label: t.iWantToExchange,
                        },
                        { value: 'return', label: t.iWantToReturn },
                      ].map((option) => (
                        <div
                          className={clsx(
                            'flex',
                            option.value === field.value
                              ? 'border-b-2 border-black'
                              : 'text-greyy',
                          )}
                          key={option.value}
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                          />
                          <Label htmlFor={option.value} className='cursor-pointer'>
                            <Typography
                              variant="text_main"
                              className="uppercase"
                            >
                              {option.label}
                            </Typography>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" variant="outline-minimal" size='lg' className='uppercase'>
            {t.returnOrExchange}
          </Button>
        </form>
      </Form>
    </div>
  )
}
