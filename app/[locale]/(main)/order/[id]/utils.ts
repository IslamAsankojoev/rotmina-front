import { OrderResponseStrapi } from '@/src/entities/Order'
import { User } from '@/src/features/Auth/model/type'
import { Currency } from '@/src/shared'
import { UseQueryResult } from '@tanstack/react-query'

export const getOrderItems = (order: OrderResponseStrapi, t: Record<string, Record<string, string>>) => {
  return (
    order?.data?.order_items?.map((item) => {
      let code: string
      let name: string
      let unit_price: number

      switch (item?.type) {
        case 'giftcard':
          code = `GIFT-${item?.price_snapshot}`
          name = `${t.giftCardFor} ${item.gift_card?.recipientsName}.`
          unit_price = parseFloat(item?.price_snapshot?.toString() || '0')
          break

        case 'personalStylist':
          code = `STYLIST-${item?.personal_stylist?.minutes}`
          name = `${t.personalStylist} (${item?.personal_stylist?.minutes} ${t.minutes})`
          unit_price = parseFloat(
            item?.personal_stylist?.price?.toString() || '0',
          )
          break

        case 'product':
          code =
            item?.variant?.sku || `PRODUCT-${item?.variant?.id || 'unknown'}`
          name = item.variant?.product?.title || (t.product as unknown as string)
          unit_price = parseFloat(item?.variant?.price?.toString() || '0')
          break

        default:
          code = `UNKNOWN-${item?.type}`
          name = (t.unknownProduct as unknown as string)
          unit_price = parseFloat(item?.price_snapshot?.toString() || '0')
      }

      return {
        code: code,
        name: name,
        unit_price: unit_price,
        unit_type: 1,
        units_number: item?.quantity,
        currency_code: order?.data?.currency_code || Currency.ILS,
        attributes: [] as Array<{ name: string; value: string }>,
      }
    }) || []
  )
}


export const getItemsWithDelivery = (orderItems: {
  code: string;
  name: string;
  unit_price: number;
  unit_type: number;
  units_number: number;
  currency_code: Currency;
  attributes: Array<{
      name: string;
      value: string;
  }>;
}[], deliveryPrice: number) => {
  if (deliveryPrice === 0 || orderItems.length === 0) {
    return orderItems
  }

  const totalItemsValue = orderItems.reduce(
    (sum, item) => sum + item.unit_price * item.units_number,
    0,
  )

  if (totalItemsValue === 0) {
    return orderItems
  }

  let remainingDelivery = deliveryPrice
  
  return orderItems.map((item, index) => {
    const itemTotalValue = item.unit_price * item.units_number
    let deliveryShare: number
    
    if (index === orderItems.length - 1) {
      deliveryShare = remainingDelivery
    } else {
      deliveryShare = (itemTotalValue / totalItemsValue) * deliveryPrice
      remainingDelivery -= deliveryShare
    }
    
    const unitPriceWithDelivery = item.unit_price + deliveryShare / item.units_number

    return {
      ...item,
      unit_price: Number(unitPriceWithDelivery.toFixed(2)),
    }
  })

}

export const getAddress = (address: string) => {
  const addressArray = address.split('|')
  return {
    streetName: addressArray[0],
    houseNum: addressArray[1],
    entrance: addressArray[2],
    floor: addressArray[3],
    apartment: addressArray[4],
  }
}

export const getShipmentData = (order: OrderResponseStrapi, user: UseQueryResult<User, Error>, currency: Currency) => {
  const {apartment, floor, entrance, houseNum, streetName} = getAddress(order?.data?.shipping_address?.address || '')
  return {
    clientId: user?.data?.id || 0,
    orderId: order?.data?.order_number || 0,
    cityName: order?.data?.shipping_address?.city || '',
    streetName,
    HouseNum: houseNum,
    apartment,
    floor,
    entrance,
    telFirst: user?.data?.phone || '',
    telSecond: user?.data?.phone || '',
    email: user?.data?.email || '',
    productsPrice: Number(order?.data?.total_amount || 0),
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
    cityCode: '100',
    streetCode: '200',
    packsHaloch: '',
  }
}