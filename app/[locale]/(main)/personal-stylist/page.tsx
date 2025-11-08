'use client'

import React from 'react'

import PersonalStylistImage from '@/public/assets/personal-stylist.webp'
import { PersonalStylistForm } from '@/src/features'
import { Breadcrumbs, Typography, useDictionary, useLocale } from '@/src/shared'
import Image from 'next/image'

const PersonalStylist = () => {
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  const t = (dictionary as Record<string, Record<string, string>>).personalStylist || {
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
            { title: t.home, href: localizePath('/') },
            { title: t.personalStylistBreadcrumb, href: localizePath('/personal-stylist') },
          ]}
        />
      </div>
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1 pt-10">
            <div className="relative h-[500px] w-full md:h-[600px]">
              <Image
                src={PersonalStylistImage}
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

export default PersonalStylist
