import React from 'react'

import { addLocaleToPath, Breadcrumbs, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale } from '@/src/shared/utils/locale'
import { cookies } from 'next/headers'

const PrivacyPolicy = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const isRTL = locale === 'he'
  const t = (dictionary as unknown as Record<string, Record<string, unknown>>)
    .privacyPolicy || {
    home: 'HOME',
    privacyPolicy: 'Privacy Policy',
    title: 'Privacy Policy',
    intro: '',
  }

  const infoCollected = (t.informationCollected as Record<string, string>) || {}
  const useOfInfo = (t.useOfInformation as Record<string, string>) || {}
  const sharingInfo = (t.sharingInformation as Record<string, string>) || {}
  const customerRights = (t.customerRights as Record<string, string>) || {}
  const dataRetention = (t.dataRetention as Record<string, string>) || {}
  const gdprCompliance = (t.gdprCompliance as Record<string, string>) || {}
  const disclaimer = (t.disclaimer as Record<string, string>) || {}
  const contact = (t.contact as Record<string, string>) || {}
  const accessibility = (t.accessibility as Record<string, string>) || {}

  return (
    <>
     <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: (t.home as string) || 'HOME', href: addLocaleToPath('/', locale) },
            {
              title: (t.privacyPolicy as string) || 'Privacy Policy',
              href: addLocaleToPath('/privacy-policy', locale),
            },
          ]}
        />
      </div>
      <div className="container mt-8 mb-24 flex items-center justify-center">
        <div
          className="flex max-w-[800px] flex-col gap-6"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Typography
            variant="text_title"
            className="md:text-title text-mobile-title2 italic"
          >
            {(t.title as string) || 'Privacy Policy'}
          </Typography>

          <Typography variant="text_main" className="whitespace-pre-line">
            {(t.intro as string) || ''}
          </Typography>

          <div className="flex flex-col gap-4">
            <Typography variant="text_main" className="font-bold">
              {infoCollected.title}
            </Typography>
            <Typography variant="text_main">
              {infoCollected.description}
            </Typography>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <Typography variant="text_main">
                  {infoCollected.personalDetails}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {infoCollected.orderPayment}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {infoCollected.filesContent}
                </Typography>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="text_main" className="font-bold">
              {useOfInfo.title}
            </Typography>
            <Typography variant="text_main">{useOfInfo.description}</Typography>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <Typography variant="text_main">
                  {useOfInfo.processingOrders}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {useOfInfo.customerSupport}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {useOfInfo.updatesNewsletter}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {useOfInfo.analysisImprovement}
                </Typography>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="text_main" className="font-bold">
              {sharingInfo.title}
            </Typography>
            <Typography variant="text_main">
              {sharingInfo.description}
            </Typography>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <Typography variant="text_main">
                  {sharingInfo.paymentProcessing}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {sharingInfo.shippingCompanies}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {sharingInfo.serviceProviders}
                </Typography>
              </li>
            </ul>
            <Typography variant="text_main">{sharingInfo.noSharing}</Typography>
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="text_main" className="font-bold">
              {customerRights.title}
            </Typography>
            <Typography variant="text_main">
              {customerRights.description}
            </Typography>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <Typography variant="text_main">
                  {customerRights.requestCopy}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {customerRights.updateCorrect}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {customerRights.requestRemoval}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {customerRights.requestDeletion}
                </Typography>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="text_main" className="font-bold">
              {dataRetention.title}
            </Typography>
            <Typography variant="text_main">
              {dataRetention.description}
            </Typography>
          </div>

          {gdprCompliance.title && (gdprCompliance.title as string) && (
            <div className="flex flex-col gap-4">
              <Typography variant="text_main" className="font-bold">
                {gdprCompliance.title}
              </Typography>
              <Typography variant="text_main">
                {gdprCompliance.description}
              </Typography>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  <Typography variant="text_main">
                    {gdprCompliance.accessCorrectDelete}
                  </Typography>
                </li>
                <li>
                  <Typography variant="text_main">
                    {gdprCompliance.restrictObject}
                  </Typography>
                </li>
                <li>
                  <Typography variant="text_main">
                    {gdprCompliance.withdrawConsent}
                  </Typography>
                </li>
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Typography variant="text_main" className="font-bold">
              {disclaimer.title}
            </Typography>
            <Typography variant="text_main">{disclaimer.description}</Typography>
          </div>

          <div className="flex flex-col gap-4">
            <Typography variant="text_main" className="font-bold">
              {contact.title}
            </Typography>
            {contact.description && (contact.description as string) && (
              <Typography variant="text_main">{contact.description as string}</Typography>
            )}
            <Typography variant="text_main">{contact.email}</Typography>
            <Typography variant="text_main">{contact.phone}</Typography>
          </div>

          <Typography variant="text_main" className="whitespace-pre-line mt-4">
            {(t.closing as string) || ''}
          </Typography>

          <div className="mt-12 flex flex-col gap-6">
            <Typography variant="text_main" className="font-bold">
              {accessibility.title}
            </Typography>
            <Typography variant="text_main" className="whitespace-pre-line">
              {accessibility.intro}
            </Typography>

            <Typography variant="text_main" className="font-bold">
              {accessibility.featuresTitle}
            </Typography>
            <Typography variant="text_main">
              {accessibility.featuresDescription}
            </Typography>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <Typography variant="text_main">
                  {accessibility.feature1}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.feature2}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.feature3}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.feature4}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.feature5}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.feature6}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.feature7}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.feature8}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.feature9}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.feature10}
                </Typography>
              </li>
            </ul>

            <Typography variant="text_main" className="font-bold">
              {accessibility.additionalTitle}
            </Typography>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <Typography variant="text_main">
                  {accessibility.additional1}
                </Typography>
              </li>
              <li>
                <Typography variant="text_main">
                  {accessibility.additional2}
                </Typography>
              </li>
              <li>
          <Typography variant="text_main">
                  {accessibility.additional3}
                </Typography>
              </li>
            </ul>

            <Typography variant="text_main" className="font-bold">
              {accessibility.limitationsTitle}
            </Typography>
            <Typography variant="text_main" className="whitespace-pre-line">
              {accessibility.limitationsText}
            </Typography>

            <Typography variant="text_main" className="font-bold">
              {accessibility.problemTitle}
            </Typography>
            <Typography variant="text_main" className="font-bold">
              {accessibility.problemSubtitle}
            </Typography>
            <Typography variant="text_main" className="whitespace-pre-line">
              {accessibility.problemText}
            </Typography>
            <Typography variant="text_main">{accessibility.problemEmail}</Typography>
            <Typography variant="text_main">{accessibility.problemPhone}</Typography>
            <Typography variant="text_main">{accessibility.problemHours}</Typography>
            <Typography variant="text_main" className="whitespace-pre-line">
              {accessibility.problemClosing}
          </Typography>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
