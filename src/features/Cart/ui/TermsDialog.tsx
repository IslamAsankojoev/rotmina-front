'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/components/ui/dialog'
import { Typography } from '@/src/shared'

export const TermsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer underline inline">
          terms of the agreement.
        </span>
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <DialogHeader>
          <DialogTitle>
            <Typography variant="text_title">Terms of Use</Typography>
          </DialogTitle>
          <div className="h-[600px] w-full overflow-y-scroll">
            <DialogDescription>
              <div className="flex flex-col gap-4">
                <Typography variant="text_main">
                  1. General 1.1 These Terms constitute a legally binding
                  agreement between the users of the website and the website
                  management (hereinafter: “the Site”). <br />
                  1.2 Any access to the Site, browsing, registration, making a
                  purchase, or any other use of the Site constitutes full
                  acceptance of these Terms. <br />
                  1.3 The Site management may update these Terms from time to
                  time at its sole discretion without prior notice. <br />
                  1.4 In case of any conflict between these Terms and any other
                  publication, these Terms shall prevail. <br />
                </Typography>
                <Typography variant="text_main">
                  2. Use and Access 2.1 The Site is accessible only to users who
                  are 18 years or older. Minors under 18 may make purchases only
                  with parental or guardian consent. <br />
                  2.2 The Site is intended for personal use only; commercial use
                  is prohibited without prior written approval from the Site
                  management. <br />
                  2.3 Any illegal activity, copyright infringement, or other
                  harm to the Site management, other users, or third parties is
                  strictly prohibited. <br />
                  2.4 The Site management reserves the right to block access to
                  users who violate these Terms without prior notice. <br />
                </Typography>
                <Typography variant="text_main">
                  3. Content and Use of the Digital Store 3.1 The Site contains
                  original content, product information, publications, and
                  updates. <br />
                  3.2 No content from the Site may be copied, reproduced,
                  distributed, published, or used in any way without prior
                  written permission from the Site management. <br />
                </Typography>
                <Typography variant="text_main">
                  4. Ordering Products and Services 4.1 All purchases are
                  subject to stock availability. In case of stock shortage, the
                  customer will be notified and may choose to wait or cancel the
                  order. <br />
                  4.2 Orders are confirmed only after full payment via credit
                  card, Apple Pay, Google Pay, or Bit, subject to approval by
                  the payment processor. <br />
                  4.3 Prices include VAT unless otherwise specified.
                </Typography>
                <Typography variant="text_main">
                  5. Shipping and In-Store Pickup in Israel 5.1 Products will be
                  delivered to the customer’s address as selected during
                  purchase. 5.2 Estimated delivery time is 7 business days
                  according to the chosen destination. <br />
                  5.3 Business days are Sunday to Thursday, excluding Fridays,
                  Saturdays, holidays, and holiday eves. <br />
                  5.4 In-store pickup is available by prior phone arrangement at
                  no cost. <br />
                </Typography>
                <Typography variant="text_main">
                  6. General Shipping Provisions 6.1 Delivery is carried out by
                  an external shipping company. If service is unavailable to a
                  specific location, an alternative suitable location may be
                  arranged. <br />
                  6.2 The Site management is not responsible for delays caused
                  by external factors such as the shipping company, security
                  emergencies, strikes, or force majeure. <br />
                  6.3 Customers must ensure that all shipping details provided
                  are accurate. <br />
                </Typography>
                <Typography variant="text_main">
                  7. Cancellation and Returns Policy 7.1 Customers may return a
                  product within 14 days of receipt, according to the Consumer
                  Protection Law, provided the product is unused, undamaged, and
                  retains its original label. <br />
                  7.2 Refunds will be issued to the store account or via the
                  original payment method within 12 business days of receiving
                  the item. Credit card refunds will appear in the account
                  statement within 21 business days. <br />
                  7.3 If returning via courier, shipping costs of 30 ILS will be
                  deducted from the refund. Courier arrangements will be
                  coordinated by us.
                </Typography>
                <Typography variant="text_main">
                  8. Links, Advertisements, and External Referrals 8.1 The Site
                  may contain links to external websites. The Site management is
                  not responsible for the content or conduct of these websites.{' '}
                  <br />
                  8.2 Any transaction with a third party through a link on the
                  Site is the customer’s sole responsibility.
                </Typography>
                <Typography variant="text_main">
                  9. Ownership and Intellectual Property Rights 9.1 All rights
                  to content, images, designs, logos, texts, and any other
                  elements on the Site are the exclusive property of the Site
                  owner and are protected under intellectual property laws.{' '}
                  <br />
                  9.2 No content from the Site may be copied, reproduced,
                  distributed, published, sold, or used in any way without prior
                  written permission from the Site management. <br />
                </Typography>
                <Typography variant="text_main">
                  10. Use of Site Content 10.1 Users may not upload content that
                  is offensive, illegal, or may infringe third-party rights.{' '}
                  <br />
                  10.2 The Site management may remove any content deemed
                  inappropriate or in violation of these Terms. <br />
                </Typography>
                <Typography variant="text_main">
                  11. Disclaimer and Indemnification 11.1 The Site management is
                  not liable for any direct or indirect damages resulting from
                  use of the Site, technical malfunctions, or improper use.{' '}
                  <br />
                  11.2 The Site provides information “As-Is” and does not
                  guarantee specific results, recommendations, or professional
                  advice. <br />
                  11.3 Users agree to indemnify the Site management for any
                  claims, lawsuits, or damages arising from their violation of
                  these Terms. <br />
                </Typography>
                <Typography variant="text_main">
                  12. Jurisdiction 12.1 These Terms of Use and the Site’s Terms
                  and Conditions shall be governed solely by the laws of the
                  State of Israel. <br />
                  12.2 Any dispute arising between the parties shall be subject
                  to the exclusive jurisdiction of the competent courts located
                  in the district where the Site owner is registered. <br />
                </Typography>
                <Typography variant="text_main">
                  13. Amendments 13.1 The Site management may update the Terms
                  of Use from time to time at its sole discretion. <br />
                  13.2 Continued use of the Site after updates constitutes
                  acceptance of the new Terms. <br />
                </Typography>
                <Typography variant="text_main">
                  14. Contact 14.1 For any questions or clarifications, please
                  contact us: Tel: +972-55-994-6060 <br />
                  Email: Brand@rotmina.com <br />
                </Typography>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
