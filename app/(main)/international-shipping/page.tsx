import React from 'react'

import { Typography } from '@/src/shared'

const InternationalShipping = () => {
  return (
    <>
      <div className="relative container my-10 flex w-full flex-col justify-end"></div>
      <div className="container mb-24 flex items-center justify-center">
        <div className="flex max-w-[800px] flex-col gap-4">
          <Typography variant="text_title" className="hidden md:block">International Shipping</Typography>
          <Typography variant="text_mobile_title2" className="block md:hidden">International Shipping</Typography>
          <Typography variant="text_main">
            Shipping is available to the United States, Canada, and Europe only,
            and typically arrives within 7–15 business days.
          </Typography>
          <Typography variant="text_main">Table</Typography>
          <Typography variant="text_main">
            In the following European countries: Andorra, Austria, Gibraltar,
            Ireland, Monaco, Greece, and Portugal a 12 $ surcharge applies for
            shipments weighing 3 kg only. <br />
            All orders are prepared for shipment within 1–2 business days from
            my studio in Israel. <br />
            Returns & Exchanges <br />
            If you would like to return an item, please fill out the return form
            within 14 days of receiving your package.
          </Typography>
          <Typography variant="text_main">
            Items that have been used or worn cannot be returned or exchanged.{' '}
            <br />
            Clothing items may be exchanged only if they still carry their
            original tag. <br />
            Once the item is received in its original condition, you’ll receive
            a full refund, excluding shipping costs. In cases of return or
            exchange, shipping costs are the customer’s responsibility. <br />
            Important: Additional local fees may apply depending on the customs
            policies of the destination country
          </Typography>
          <Typography variant="text_main">
            Customer service hours:
            <br />
            Sunday to Thursday, 10:00 AM – 4:00 PM
          </Typography>
        </div>
      </div>
    </>
  )
}

export default InternationalShipping
