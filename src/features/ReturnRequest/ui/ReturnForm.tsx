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
import { Typography } from '@/src/shared'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { ReturnRequestSchema } from '../model/validation'

export const ReturnForm = () => {
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
        Personal Details
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="shippingAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Shipping address in case you’d like an exchange"
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
                  <Input placeholder="ORDER NUMBER" {...field} />
                </FormControl>
                <FormDescription>
                  *The number appears next to the customerdetails on the invoice
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
                  <Input placeholder="COMMENT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <Typography variant="text_main" className="uppercase">
              Please select one of the following options:
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
                          label: 'I’d like to exchange',
                        },
                        { value: 'return', label: 'I’d like to return' },
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
                          <Label htmlFor={option.value}>
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
          <Button type="submit" variant="outline-minimal">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
