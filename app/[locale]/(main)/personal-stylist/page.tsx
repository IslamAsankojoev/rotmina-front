import { cookies } from 'next/headers'
import React from 'react'

import PersonalStylistImage from '@/public/assets/personal-stylist.webp'
import { PersonalStylistForm } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale, addLocaleToPath } from '@/src/shared/utils/locale'
import Image from 'next/image'
import { SiteImagesApi } from '@/src/features'

const getImage = async () => {
  try {
    const siteImages = await SiteImagesApi.getSiteImages()
    return siteImages.data?.personal_stylist?.url || PersonalStylistImage.src
  } catch (error) {
    console.error(error)
    return PersonalStylistImage.src
  }
}

export default async function PersonalStylist({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const image = await getImage()
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .personalStylist || {
    title: 'Personal stylist',
    home: 'HOME',
    personalStylistBreadcrumb: 'PersonalStylist',
    content: '',
    meetingOverview: 'Meeting Overview',
    meetingOverviewContent: '',
    virtualMeeting: 'Virtual Meeting',
    virtualMeetingContent: '',
  }

  const contentLines = t.content.split('\n')
  const meetingOverviewLines = t.meetingOverviewContent.split('\n')
  const virtualMeetingLines = t.virtualMeetingContent.split('\n')

  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            {
              title: t.personalStylistBreadcrumb,
              href: addLocaleToPath('/personal-stylist', locale),
            },
          ]}
        />
      </div>
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1 pt-10">
            <div className="relative h-[500px] w-full md:h-[600px]">
              <Image
                src={image}
                alt="product-image"
                objectFit="cover"
                fill
              />
            </div>
          </div>
          <div className="flex-1 md:p-8">
            <Typography variant="text_title" className="md:text-title text-mobile-title2 italic mb-4">
              {t.title}
            </Typography>
            <Typography variant="text_main" className="my-4">
              {contentLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < contentLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Typography>
            <br />
            <Typography variant="text_title" className="md:text-title text-mobile-title2 italic">{t.meetingOverview}</Typography>
            <Typography variant="text_main">
              {meetingOverviewLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < meetingOverviewLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Typography>
            <br />
            <Typography variant="text_title" className="md:text-title text-mobile-title2 italic">{t.virtualMeeting}</Typography>
            <Typography variant="text_main">
              {virtualMeetingLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < virtualMeetingLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </Typography>
            <PersonalStylistForm />
          </div>
        </div>
      </div>
    </>
  )
}
