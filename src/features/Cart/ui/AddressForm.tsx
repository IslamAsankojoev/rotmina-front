'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'

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
import { Typography } from '@/src/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { Address, AddressService } from '../../Address'
import { addressFormSchema } from '../model'

interface OrderFormProps {
  setShippingAddress: Dispatch<SetStateAction<Address | null>>
  selectedAddress: Address
}

export const AddressForm = ({
  setShippingAddress,
  selectedAddress,
}: OrderFormProps) => {
  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    error: errorAddresses,
    refetch: refetchAddresses,
  } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => AddressService.getMyAddresses(),
  })

  const form = useForm<z.infer<typeof addressFormSchema>>({
    defaultValues: {
      address: '',
      city: '',
      zip_code: '',
    },
    resolver: zodResolver(addressFormSchema),
  })

  const { mutate: addAddress, isPending: isAddingAddress } = useMutation({
    mutationFn: (data: z.infer<typeof addressFormSchema>) =>
      AddressService.addAddress(data),
    onSuccess: () => {
      toast.success('Address added successfully')
      refetchAddresses()
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: () => {
      setShippingAddress(addresses?.data[addresses?.data?.length - 1] || null)
    },
  })

  const { mutate: deleteAddress } = useMutation({
    mutationFn: (id: string) => AddressService.deleteAddress(id),
    onSuccess: () => {
      toast.success('Address deleted successfully')
      refetchAddresses()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    addAddress(data)
  })

  useEffect(() => {
    if (addresses?.data?.length && addresses?.data?.length > 0) {
      setShippingAddress(addresses?.data[0] || null)
    }
  }, [addresses, setShippingAddress])

  if (isLoadingAddresses) return <div>Loading...</div>
  if (errorAddresses) return <div>Error: {errorAddresses.message}</div>

  return (
    <div>
      <RadioGroup
        className="flex gap-2"
        disabled={isLoadingAddresses}
        onValueChange={(value) => {
          setShippingAddress(
            addresses?.data.find((address) => address?.documentId === value) ||
              null,
          )
        }}
        defaultValue={addresses?.data[0]?.documentId || ''}
      >
        {addresses?.data.map((address) => (
          <Label
            htmlFor={address?.documentId || ''}
            key={address.id}
            className={clsx(
              'border-greyy/70 relative flex cursor-pointer items-start gap-2 border-1 p-4 pr-8',
              address?.documentId === selectedAddress?.documentId &&
                'border-blackish bg-blackish/5 border-b',
            )}
          >
            <RadioGroupItem
              value={address?.documentId || ''}
              id={address.documentId || ''}
              className={clsx(
                'data-[state=checked]:border-blackish data-[state=checked]:bg-blackish/5',
              )}
            />
            <Typography
              variant="text_mini_footer"
              className="flex flex-col gap-1"
            >
              {address.address} {address.city} <br />{' '}
              <span className="text-greyy text-xs">{address.zip_code}</span>
            </Typography>
            <button
              type="button"
              className="absolute top-1 right-1 flex h-5 w-5 cursor-pointer items-center justify-center"
              onClick={() => deleteAddress(address?.documentId || '')}
            >
              <X className="h-4 w-4" />
            </button>
          </Label>
        ))}
      </RadioGroup>
      <div className="mt-8 flex flex-col gap-6">
        <Form {...form}>
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
          <div className="flex gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="CITY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="ZIP CODE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Form>

        <Button
          type="button"
          className="uppercase"
          variant="outline-minimal"
          size="lg"
          disabled={isAddingAddress}
          onClick={onSubmit}
        >
          {isAddingAddress ? 'Adding...' : 'Add Address'}
        </Button>
      </div>
    </div>
  )
}
