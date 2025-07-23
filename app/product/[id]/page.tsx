'use client'

import React from 'react'

import ProductFullImage from '@/public/assets/products/full-shirt-image.jpg'
import ShirtImage from '@/public/assets/products/shirt.png'
import { Button } from '@/shadcn/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shadcn/components/ui/tabs'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shadcn/components/ui/toggle-group'
import { Breadcrumbs, Typography } from '@/src/shared'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

const product = {
  id: '1',
  name: 'Dress #1',
  price: 100,
  image: ProductFullImage,
  shortDescription:
    'Text about clothes bla bla Text about clothes blaText about clothes bla bla   bla   about clothes bla bla   bla   ',
  description:
    'Full description of the product goes here. It can include details about the fabric, care instructions, and other relevant information that helps customers make an informed decision.',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['#000', '#fff', '#f00'],
}

const Product = () => {
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null)
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null)

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
  }

  return (
    <>
      <div className="relative container mt-36 flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'SHIRT', href: '/category/shirt' },
            { title: product.name, href: '/product/dress#1' },
          ]}
        />
      </div>
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1">
            <div className="relative h-[500px] w-full md:h-[900px]">
              <Image
                src={product.image}
                alt="product-image"
                fill
                objectFit="cover"
              />
            </div>
          </div>
          <div className="flex-1 md:p-8">
            <Typography variant="text_pageTitle">
              <h1>{product.name}</h1>
            </Typography>
            <Typography variant="text_main">{product.price} $</Typography>
            <Typography variant="text_main" className="mt-4">
              {product.shortDescription}
            </Typography>
            <div className="mt-6 flex flex-col gap-10">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <Typography variant="text_main" className="uppercase">
                    Size
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    <ToggleGroup
                      type="single"
                      className="flex flex-wrap"
                      value={selectedSize || ''}
                      onValueChange={handleSizeChange}
                    >
                      {product.sizes.map((size) => (
                        <ToggleGroupItem
                          key={size}
                          value={size}
                          className="cursor-pointer"
                        >
                          <Typography
                            variant="text_main"
                            className={clsx(
                              'uppercase',
                              selectedSize === size
                                ? 'text-black'
                                : 'text-greyy',
                            )}
                          >
                            {size}
                          </Typography>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="text_main" className="uppercase">
                    SIZE GUIDE
                  </Typography>
                  <Typography
                    variant="text_main"
                    className="text-greyy uppercase"
                  >
                    waist: 66
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant="text_main" className="uppercase">
                  Colour
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <ToggleGroup
                    type="single"
                    className="flex flex-wrap"
                    value={selectedColor || ''}
                    onValueChange={handleColorChange}
                  >
                    {product.colors.map((color) => (
                      <ToggleGroupItem
                        key={color}
                        value={color}
                        className="bg-transparent"
                      >
                        <div
                          className={clsx(
                            'flex h-7 w-7 items-center justify-center rounded-full border-1',
                            selectedColor?.includes(color)
                              ? 'border-black'
                              : 'border-transparent',
                          )}
                        >
                          <div
                            style={{
                              backgroundColor: color,
                            }}
                            className="h-6 w-6 cursor-pointer rounded-full"
                          />
                        </div>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
            </div>
            <Button
              variant="outline-minimal"
              size="lg"
              className="mt-10 uppercase"
            >
              Add to Cart
            </Button>
            <Tabs defaultValue="description" className="my-10">
              <TabsList>
                <TabsTrigger value="description" className="uppercase">
                  Description
                </TabsTrigger>
                <TabsTrigger value="shipping" className="uppercase">
                  Shipping&Return
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <Typography variant="text_main">
                  {product.description}
                </Typography>
              </TabsContent>
              <TabsContent value="shipping">
                <Typography variant="text_main" className="font-bold">
                  International Shipping
                </Typography>
                <Typography variant="text_main" className="my-4">
                  Shipping is available to the United States, Canada, and Europe
                  only, and typically arrives within 7–15 business days.
                </Typography>
                <Typography variant="text_main">Shipping Costs:</Typography>
                <Table className="max-w-72 border">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] font-bold">
                        Destination
                      </TableHead>
                      <TableHead className="font-bold">1 k</TableHead>
                      <TableHead className="font-bold">2-3 kg</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Canada</TableCell>
                      <TableCell>30 $</TableCell>
                      <TableCell>40 $</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        United States
                      </TableCell>
                      <TableCell>32 $</TableCell>
                      <TableCell>42 $</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Europe</TableCell>
                      <TableCell>30 $</TableCell>
                      <TableCell>40 $</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <Typography variant="text_main" className="my-4">
                In the following European countries: Andorra, Austria,
                Gibraltar, Ireland, Monaco, Greece, and Portugal a 12 $
                surcharge applies for shipments weighing 3 kg only. All orders
                are prepared for shipment within 1–2 business days from my
                studio in Israel.
              </Typography>
              <Typography variant="text_main" className="font-bold">
                Returns & Exchanges
              </Typography>
              <Typography variant="text_main">
                If you like to return an item, please fill out the return form
                within 14 days of receiving your package. Items that have been
                used or worn cannot be returned or exchanged. Clothing items may
                be exchanged only if they still carry their original tag. Once
                the item is received in its original condition, you’ll receive a
                full refund, excluding shipping costs. In cases of return or
                exchange, shipping costs are the customer’s responsibility.
              </Typography>
              <br />
              <Typography variant="text_main">
                Important: Additional local fees may apply depending on the
                customs policies of the destination country
              </Typography>
            </Tabs>
          </div>
        </div>
        <div className="my-24 flex flex-col gap-8">
          <Typography variant="text_title">You might also like</Typography>
          <div className="grid grid-cols-12 gap-6 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
            {products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className={clsx(
                  'relative col-span-6 flex h-[300px] w-full flex-col items-center gap-4 border p-4 md:col-span-4 md:h-full md:min-h-[544px] lg:col-span-3',
                )}
              >
                <Image
                  src={product.image.src}
                  alt={product.name}
                  objectFit="cover"
                  fill
                />
                <div className="absolute bottom-4 flex w-full justify-between gap-2 px-4">
                  <Typography variant="text_main">{product.name}</Typography>
                  <Typography variant="text_main">
                    ${product.price.toFixed(2)}
                  </Typography>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Product

const products = [
  {
    id: '1',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '2',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '3',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
  {
    id: '4',
    name: 'Shirt',
    image: ShirtImage,
    price: 29.99,
  },
]
