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
import { Typography, useDictionary } from '@/src/shared'
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
  const { dictionary } = useDictionary()
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .addressForm || {
    loading: 'Loading...',
    error: 'Error:',
    addressAddedSuccess: 'Address added successfully',
    addressDeletedSuccess: 'Address deleted successfully',
    address: 'ADDRESS',
    city: 'CITY',
    zipCode: 'ZIP CODE',
    adding: 'Adding...',
    addNewAddress: 'Add new address',
  }
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
      city: '',
      streetName: '',
      houseNum: '',
      apartment: '',
      floor: '',
      entrance: '',
      zip_code: '',
    },
    resolver: zodResolver(addressFormSchema),
  })

  const { mutate: addAddress, isPending: isAddingAddress } = useMutation({
    mutationFn: (data: z.infer<typeof addressFormSchema>) =>
      AddressService.addAddress({
        city: data.city,
        zip_code: data.zip_code,
        address: `${data.streetName} | ${data.houseNum} | ${data.entrance} | ${data.floor} | ${data.apartment}`,
      }),
    onSuccess: () => {
      toast.success(t.addressAddedSuccess)
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
      toast.success(t.addressDeletedSuccess)
      refetchAddresses()
      setShippingAddress(null)
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

  if (isLoadingAddresses) return <div>{t.loading}</div>
  if (errorAddresses)
    return (
      <div>
        {t.error} {errorAddresses.message}
      </div>
    )

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
        value={selectedAddress?.documentId || ''}
      >
        {addresses?.data?.map((address) => {
          const addressParts = address.address.split(' | ').filter(Boolean)
          const addressString = addressParts.join(', ')
          return (
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
                {addressString}, {address.city} <br />{' '}
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
          )
        })}
      </RadioGroup>
      <div className="mt-8 flex flex-col gap-6">
        <Form {...form}>
          <div className="flex gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t.city} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="streetName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="STREET NAME" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="houseNum"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="HOUSE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="entrance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="ENTRANCE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="FLOOR" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="APARTMENT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="zip_code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t.zipCode} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <Button
                type="button"
                variant="default"
                disabled={isAddingAddress}
                onClick={onSubmit}
              >
                {isAddingAddress ? t.adding : t.addNewAddress}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
