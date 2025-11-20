import { Typography, addLocaleToPath, getServerLocale } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { cookies } from 'next/headers'
import Link from 'next/link'

const InternationalShipping = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const isRTL = locale === 'he'
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .productPage || {
    colour: 'Colour',
    size: 'Size',
    sizeGuide: 'Size Guide',
    bust: 'Bust',
    waist: 'Waist',
    hips: 'Hips',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of stock',
    description: 'Description',
    shippingReturn: 'Shipping&Return',
    internationalShipping: 'International Shipping',
    shippingTitle: 'International Shipping',
    shippingSubtitle: 'Shipping',
    shippingText:
      'Shipping is available worldwide at a flat rate of 165 ILS, approximately $47–$50 USD. Price may vary depending on exchange rate. Delivery typically takes 7–15 business days.',
    orderProcessingTitle: 'Order Processing',
    orderProcessingText:
      'All orders are processed within 1-2 business days. Customers are responsible for providing accurate shipping information to ensure timely delivery. Once the order is confirmed, customers will receive a confirmation email.',
    shippingIsraelTitle: '',
    shippingIsraelText: '',
    shippingCosts: 'Shipping Costs:',
    destination: 'Destination',
    returnsExchanges: 'Returns & Exchanges',
    returnsExchangesTitle: 'Returns & Exchanges',
    returnsExchangesTextBefore:
      'If you would like to return an item, please fill out the ',
    returnsExchangesFormLink: 'return form',
    returnsExchangesTextAfter:
      " within 14 days of receiving your package. Items that have been used or worn cannot be returned or exchanged. Clothing items may only be exchanged if they still carry their original tags.\n\nOnce the item is received in its original condition, a full refund will be issued, excluding shipping costs. Customers are responsible for return shipping costs unless the item is defective or incorrect.\n\nRefunds are processed within up to 3 business days after the returned item is received and inspected. Customers will be notified via email once the refund has been issued, confirming that the returned item has been accepted and the refund completed. Refunds are issued via the original payment method\n\nPlease note that additional local fees may apply depending on the destination country's policies.",
    europeanSurcharge:
      'In the following European countries: Andorra, Austria, Gibraltar, Ireland, Monaco, Greece, and Portugal a 12 $ surcharge applies for shipments weighing 3 kg only. All orders are prepared for shipment within 1–2 business days from my studio in Israel.',
    importantNote:
      'Important: Additional local fees may apply depending on the customs policies of the destination country',
    youMightAlsoLike: 'You might also like',
    home: 'HOME',
  }
  return (
    <div className="container mx-auto">
      <div
        className="mx-auto mb-24 flex max-w-[800px] flex-col gap-6"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {isRTL ? (
          <>
            <Typography
              variant="text_title"
              className="text-mobile-title2 md:text-title font-bold"
            >
              {t.shippingTitle}
            </Typography>
            <Typography variant="text_main" className="font-bold">
              {t.shippingIsraelTitle}
            </Typography>
            <Typography variant="text_main" className="whitespace-pre-line">
              {t.shippingIsraelText}
            </Typography>
            <Typography variant="text_main" className="mt-4 font-bold">
              {t.returnsExchangesTitle}
            </Typography>
            <Typography variant="text_main" className="whitespace-pre-line">
              {t.returnsExchangesTextBefore}
              <Link
                href={addLocaleToPath('/returns-&-exchanges', locale)}
                className="inline text-blue-600 underline"
              >
                {t.returnsExchangesFormLink}
              </Link>
              {t.returnsExchangesTextAfter}
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="text_title"
              className="text-mobile-title2 md:text-title font-bold"
            >
              {t.shippingTitle}
            </Typography>
            <Typography variant="text_main" className="font-bold">
              {t.shippingSubtitle}
            </Typography>
            <Typography variant="text_main" className="whitespace-pre-line">
              {t.shippingText}
            </Typography>
            <Typography variant="text_main" className="mt-4 font-bold">
              {t.orderProcessingTitle}
            </Typography>
            <Typography variant="text_main" className="whitespace-pre-line">
              {t.orderProcessingText}
            </Typography>
            <Typography variant="text_main" className="mt-4 font-bold">
              {t.returnsExchangesTitle}
            </Typography>
            <Typography variant="text_main" className="whitespace-pre-line">
              {t.returnsExchangesTextBefore}
              <Link
                href={addLocaleToPath('/returns-&-exchanges', locale)}
                className="inline text-blue-600 underline"
              >
                {t.returnsExchangesFormLink}
              </Link>
              {t.returnsExchangesTextAfter}
            </Typography>
          </>
        )}
      </div>
    </div>
  )
}

export default InternationalShipping
