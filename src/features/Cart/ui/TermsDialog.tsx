'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/components/ui/dialog'
import { Typography, useDictionary, useLocale } from '@/src/shared'

export const TermsDialog = () => {
  const { dictionary } = useDictionary()
  const t = ((dictionary as Record<string, Record<string, unknown>>).terms ||
    {}) as Record<string, unknown>
  const { isRTL } = useLocale()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="inline cursor-pointer underline">
          {(t.termsOfAgreement as string) || 'terms of the agreement.'}
        </span>
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <DialogHeader>
          <DialogTitle>
            <Typography variant="text_title" dir={isRTL ? 'rtl' : 'ltr'}>
              {(t.title as string) || 'Terms of Use'}
            </Typography>
          </DialogTitle>
          <div className="h-[600px] w-full overflow-y-scroll">
            <DialogDescription asChild>
              <span className="flex flex-col gap-4" dir={isRTL ? 'rtl' : 'ltr'}>
                <Typography variant="text_main" tag="strong">
                  {(t.section1 as Record<string, string>)?.title ||
                    '1. General'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section1 as Record<string, string>)?.['1.1'] || ''} <br />
                  {(t.section1 as Record<string, string>)?.['1.2'] || ''} <br />
                  {(t.section1 as Record<string, string>)?.['1.3'] || ''} <br />
                  {(t.section1 as Record<string, string>)?.['1.4'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section2 as Record<string, string>)?.title ||
                    '2. Use and Access'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section2 as Record<string, string>)?.['2.1'] || ''} <br />
                  {(t.section2 as Record<string, string>)?.['2.2'] || ''} <br />
                  {(t.section2 as Record<string, string>)?.['2.3'] || ''} <br />
                  {(t.section2 as Record<string, string>)?.['2.4'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  <strong>
                    {(t.section3 as Record<string, string>)?.title ||
                      '3. Content and Use of the Digital Store'}
                  </strong>
                </Typography>

                <Typography variant="text_main" tag="p">
                  {(t.section3 as Record<string, string>)?.['3.1'] || ''} <br />
                  {(t.section3 as Record<string, string>)?.['3.2'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section4 as Record<string, string>)?.title ||
                    '4. Ordering Products and Services'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section4 as Record<string, string>)?.['4.1'] || ''} <br />
                  {(t.section4 as Record<string, string>)?.['4.2'] || ''} <br />
                  {(t.section4 as Record<string, string>)?.['4.3'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section5 as Record<string, string>)?.title ||
                    '5. Shipping & Pickup'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section5 as Record<string, string>)?.['5.1'] || ''} <br />
                  {(t.section5 as Record<string, string>)?.['5.2'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section6 as Record<string, string>)?.title ||
                    '6. General Shipping Provisions'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section6 as Record<string, string>)?.['6.1'] || ''} <br />
                  {(t.section6 as Record<string, string>)?.['6.2'] || ''} <br />
                  {(t.section6 as Record<string, string>)?.['6.3'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section7 as Record<string, string>)?.title ||
                    '7. Cancellation, Returns & Refunds'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section7 as Record<string, string>)?.['7.1'] || ''} <br />
                  {(t.section7 as Record<string, string>)?.['7.2'] || ''} <br />
                  {(t.section7 as Record<string, string>)?.['7.3'] || ''} <br />
                  {(t.section7 as Record<string, string>)?.['7.4'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section8 as Record<string, string>)?.title ||
                    '8. Links, Advertisements, and External Referrals'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section8 as Record<string, string>)?.['8.1'] || ''} <br />
                  {(t.section8 as Record<string, string>)?.['8.2'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section9 as Record<string, string>)?.title ||
                    '9. Ownership and Intellectual Property Rights'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section9 as Record<string, string>)?.['9.1'] || ''} <br />
                  {(t.section9 as Record<string, string>)?.['9.2'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section10 as Record<string, string>)?.title ||
                    '10. Use of Site Content'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section10 as Record<string, string>)?.['10.1'] || ''}{' '}
                  <br />
                  {(t.section10 as Record<string, string>)?.['10.2'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section11 as Record<string, string>)?.title ||
                    '11. Disclaimer and Indemnification'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section11 as Record<string, string>)?.['11.1'] || ''}{' '}
                  <br />
                  {(t.section11 as Record<string, string>)?.['11.2'] || ''}{' '}
                  <br />
                  {(t.section11 as Record<string, string>)?.['11.3'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section12 as Record<string, string>)?.title ||
                    '12. Jurisdiction'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section12 as Record<string, string>)?.['12.1'] || ''}{' '}
                  <br />
                  {(t.section12 as Record<string, string>)?.['12.2'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section13 as Record<string, string>)?.title ||
                    '13. Amendments'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section13 as Record<string, string>)?.['13.1'] || ''}{' '}
                  <br />
                  {(t.section13 as Record<string, string>)?.['13.2'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section14 as Record<string, string>)?.title ||
                    '14. Privacy Policy'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section14 as Record<string, string>)?.['14.1'] || ''}
                </Typography>
                <Typography variant="text_main" tag="strong">
                  {(t.section15 as Record<string, string>)?.title ||
                    '15. Contact'}
                </Typography>
                <Typography variant="text_main" tag="p">
                  {(t.section15 as Record<string, string>)?.['15.1'] || ''}{' '}
                  <br />
                  {(t.section15 as Record<string, string>)?.tel || ''} <br />
                  {(t.section15 as Record<string, string>)?.address || ''}{' '}
                  <br />
                  {(t.section15 as Record<string, string>)?.email || ''}
                </Typography>
              </span>
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
