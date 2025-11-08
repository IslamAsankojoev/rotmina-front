'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/components/ui/dialog'
import { Typography, useDictionary } from '@/src/shared'

export const TermsDialog = () => {
  const { dictionary } = useDictionary()
  const t = ((dictionary as Record<string, Record<string, unknown>>).terms || {}) as Record<string, unknown>

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer underline inline">
          {(t.termsOfAgreement as string) || 'terms of the agreement.'}
        </span>
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <DialogHeader>
          <DialogTitle>
            <Typography variant="text_title">{(t.title as string) || 'Terms of Use'}</Typography>
          </DialogTitle>
          <div className="h-[600px] w-full overflow-y-scroll">
            <DialogDescription>
              <div className="flex flex-col gap-4">
                <Typography variant="text_main">
                  <strong>{((t.section1 as Record<string, string>)?.title) || '1. General'}</strong> <br />
                  {((t.section1 as Record<string, string>)?.['1.1']) || ''} <br />
                  {((t.section1 as Record<string, string>)?.['1.2']) || ''} <br />
                  {((t.section1 as Record<string, string>)?.['1.3']) || ''} <br />
                  {((t.section1 as Record<string, string>)?.['1.4']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section2 as Record<string, string>)?.title) || '2. Use and Access'}</strong> <br />
                  {((t.section2 as Record<string, string>)?.['2.1']) || ''} <br />
                  {((t.section2 as Record<string, string>)?.['2.2']) || ''} <br />
                  {((t.section2 as Record<string, string>)?.['2.3']) || ''} <br />
                  {((t.section2 as Record<string, string>)?.['2.4']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section3 as Record<string, string>)?.title) || '3. Content and Use of the Digital Store'}</strong> <br />
                  {((t.section3 as Record<string, string>)?.['3.1']) || ''} <br />
                  {((t.section3 as Record<string, string>)?.['3.2']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section4 as Record<string, string>)?.title) || '4. Ordering Products and Services'}</strong> <br />
                  {((t.section4 as Record<string, string>)?.['4.1']) || ''} <br />
                  {((t.section4 as Record<string, string>)?.['4.2']) || ''} <br />
                  {((t.section4 as Record<string, string>)?.['4.3']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section5 as Record<string, string>)?.title) || '5. Shipping and In-Store Pickup in Israel'}</strong> <br />
                  {((t.section5 as Record<string, string>)?.['5.1']) || ''} <br />
                  {((t.section5 as Record<string, string>)?.['5.2']) || ''} <br />
                  {((t.section5 as Record<string, string>)?.['5.3']) || ''} <br />
                  {((t.section5 as Record<string, string>)?.['5.4']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section6 as Record<string, string>)?.title) || '6. General Shipping Provisions'}</strong> <br />
                  {((t.section6 as Record<string, string>)?.['6.1']) || ''} <br />
                  {((t.section6 as Record<string, string>)?.['6.2']) || ''} <br />
                  {((t.section6 as Record<string, string>)?.['6.3']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section7 as Record<string, string>)?.title) || '7. Cancellation and Returns Policy'}</strong> <br />
                  {((t.section7 as Record<string, string>)?.['7.1']) || ''} <br />
                  {((t.section7 as Record<string, string>)?.['7.2']) || ''} <br />
                  {((t.section7 as Record<string, string>)?.['7.3']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section8 as Record<string, string>)?.title) || '8. Links, Advertisements, and External Referrals'}</strong> <br />
                  {((t.section8 as Record<string, string>)?.['8.1']) || ''} <br />
                  {((t.section8 as Record<string, string>)?.['8.2']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section9 as Record<string, string>)?.title) || '9. Ownership and Intellectual Property Rights'}</strong> <br />
                  {((t.section9 as Record<string, string>)?.['9.1']) || ''} <br />
                  {((t.section9 as Record<string, string>)?.['9.2']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section10 as Record<string, string>)?.title) || '10. Use of Site Content'}</strong> <br />
                  {((t.section10 as Record<string, string>)?.['10.1']) || ''} <br />
                  {((t.section10 as Record<string, string>)?.['10.2']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section11 as Record<string, string>)?.title) || '11. Disclaimer and Indemnification'}</strong> <br />
                  {((t.section11 as Record<string, string>)?.['11.1']) || ''} <br />
                  {((t.section11 as Record<string, string>)?.['11.2']) || ''} <br />
                  {((t.section11 as Record<string, string>)?.['11.3']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section12 as Record<string, string>)?.title) || '12. Jurisdiction'}</strong> <br />
                  {((t.section12 as Record<string, string>)?.['12.1']) || ''} <br />
                  {((t.section12 as Record<string, string>)?.['12.2']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section13 as Record<string, string>)?.title) || '13. Amendments'}</strong> <br />
                  {((t.section13 as Record<string, string>)?.['13.1']) || ''} <br />
                  {((t.section13 as Record<string, string>)?.['13.2']) || ''}
                </Typography>
                <Typography variant="text_main">
                  <strong>{((t.section14 as Record<string, string>)?.title) || '14. Contact'}</strong> <br />
                  {((t.section14 as Record<string, string>)?.['14.1']) || ''} <br />
                  {((t.section14 as Record<string, string>)?.tel) || ''} <br />
                  {((t.section14 as Record<string, string>)?.email) || ''}
                </Typography>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
