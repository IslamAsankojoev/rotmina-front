import {
  CreateShipmentToGoRequest,
  OrderResponseStrapi,
} from '@/src/entities/Order'
import { User } from '@/src/features/Auth/model/type'
import { Currency } from '@/src/shared'
import { UseQueryResult } from '@tanstack/react-query'

export const getOrderItems = (
  order: OrderResponseStrapi,
  t: Record<string, Record<string, string>>,
) => {
  return (
    order?.data?.order_items?.map((item) => {
      let code: string
      let name: string
      let unit_price: number
      let type: string

      switch (item?.type) {
        case 'giftcard':
          code = `${item?.sku_snapshot}`
          name = `Gift Card for ${item.gift_card?.recipientsName}.`
          unit_price = parseFloat(item?.price_snapshot?.toString() || '0')
          type = 'I'
          break

        case 'personalStylist':
          code = `${item?.sku_snapshot}`
          name = `Personal Stylist (${item?.personal_stylist?.minutes} minutes)`
          unit_price = parseFloat(
            item?.personal_stylist?.price?.toString() || '0',
          )
          type = 'I'
          break

        case 'product':
          code =
            item?.variant?.sku || `PRODUCT-${item?.variant?.id || 'unknown'}`
          name =
            item.variant?.product?.title || (t.product as unknown as string)
          unit_price = parseFloat(item?.variant?.price?.toString() || '0')
          type = 'I'
          break

        case 'shipment':
          code = `${item?.sku_snapshot}`
          name = `Shipment`
          unit_price = parseFloat(item?.price_snapshot?.toString() || '0')
          type = 'S'
          break

        case 'discount':
          code = `${item?.sku_snapshot}`
          name = `Discount`
          unit_price = -parseFloat(item?.price_snapshot?.toString() || '0')
          type = 'C'
          break

        default:
          code = `${item?.sku_snapshot}`
          name = `Unknown product`
          unit_price = parseFloat(item?.price_snapshot?.toString() || '0')
          type = 'I'
      }

      return {
        code: code,
        name: name,
        unit_price: unit_price,
        unit_type: 1,
        type: type,
        units_number: item?.quantity,
        currency_code: order?.data?.currency_code || Currency.ILS,
        attributes: [] as Array<{ name: string; value: string }>,
      }
    }) || []
  )
}

export const getAddress = (address: string) => {
  const addressArray = address.split('|')
  return {
    streetName: addressArray[0],
    houseNum: addressArray[1],
    country: addressArray[2],
    floor: addressArray[3],
    apartment: addressArray[4],
  }
}

export const getShipmentData = (
  order: OrderResponseStrapi,
  user: UseQueryResult<User, Error>,
  currency: Currency,
) => {
  const { apartment, floor, country, houseNum, streetName } = getAddress(
    order?.data?.shipping_address?.address || '',
  )

  const totalAmountOnlyProducts = order?.data?.order_items?.filter((item) => item.type !== 'discount' && item.type !== 'shipment' && item.type !== 'personalStylist' && item.type !== 'giftcard').reduce((acc, item) => acc + Number(item.price_snapshot) * item.quantity, 0) || 0;

  return {
    clientId: user?.data?.id || 0,
    orderId: order?.data?.order_number || 0,
    cityName: order?.data?.shipping_address?.city || '',
    streetName,
    HouseNum: houseNum,
    apartment,
    floor,
    country,
    telFirst: user?.data?.phone || '',
    telSecond: user?.data?.phone || '',
    email: user?.data?.email || '',
    productsPrice: totalAmountOnlyProducts,
    productPriceCurrency: currency || Currency.ILS,
    shipmentWeight: 0,
    govina: {
      code: 0,
      sum: 0,
      date: '',
      remarks: '',
    },
    ordererName: 'Rotmina',
    nameTo: user?.data?.username || '',
    cityCode: '03',
    streetCode: '200',
    packsHaloch: '',
  }
}

export const getShipmentToGoData = (
  order: OrderResponseStrapi,
  user: UseQueryResult<User, Error>,
  currency: Currency,
) => {
  const { apartment, floor, country, houseNum, streetName } = getAddress(
    order?.data?.shipping_address?.address || '',
  )
  return {
    ShipDetails: {
      OrderDetails: {
        orderId: order?.data?.order_number?.toString() || '',
      },
      currency: currency || Currency.ILS,
      insuranceAmount: 0,
      Recipient: {
        name: user?.data?.username || '',
        contactPerson: user?.data?.username || '',
        country: country || '',
        city: order?.data?.shipping_address?.city || '',
        street: streetName || '',
        houseNumber: houseNum || '',
        postalCode: order?.data?.shipping_address?.zip_code || '',
        phone: user?.data?.phone || '',
        phonePrefix: '050',
        email: user?.data?.email || '',
      },
      Packages:
        order?.data?.order_items?.filter((item) => item.type !== 'discount' && item.type !== 'shipment' && item.type !== 'personalStylist' && item.type !== 'giftcard')?.map((item) => ({
          quantity: item?.quantity?.toString() || '1',
          weight: '1',
          length: '1',
          width: '1',
          height: '1',
          name: item?.variant?.product?.title || '',
          customValue: item?.variant?.price?.toString() || '1',
          productId: item?.variant?.product?.id || 0,
        })) || [],
    } as unknown as CreateShipmentToGoRequest['ShipDetails'],
  }
}
