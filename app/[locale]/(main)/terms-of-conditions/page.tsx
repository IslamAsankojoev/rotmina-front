import React from 'react'

import {
  Breadcrumbs,
  Typography,
  addLocaleToPath,
  getServerLocale,
} from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { cookies } from 'next/headers'

const TermsOfConditions = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const isRTL = locale === 'he'
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .termsOfConditions || {
    home: 'HOME',
    termsOfConditions: 'Terms of Conditions',
  }
  const terms = (dictionary as unknown as Record<string, Record<string, unknown>>)
    .terms || {}
  const fullText = (terms.fullText as string) || ''

  const renderTextWithBoldNumbers = (text: string) => {
    const regex = /(^|\n)(\d+\.\s[^\n]+)/gm
    const parts: (string | React.ReactElement)[] = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      const fullMatch = match[2]
      
      if (fullMatch.match(/^\d+\.\d+/)) {
        continue
      }

      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      parts.push(
        <strong key={match.index}>
          {match[1]}
          {match[2]}
        </strong>
      )
      lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            {
              title: t.termsOfConditions,
              href: addLocaleToPath('/terms-of-conditions', locale),
            },
          ]}
        />
      </div>
      <div className="container mt-8 mb-24 flex items-center justify-center">
        <div
          className="flex max-w-[800px] flex-col gap-4"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <Typography
            variant="text_title"
            className="md:text-title text-mobile-title2 italic"
          >
            {(terms.title as string) || 'Terms of Use'}
          </Typography>
          <Typography variant="text_main" className="whitespace-pre-line">
            {renderTextWithBoldNumbers(fullText)}
          </Typography>
        </div>
      </div>
    </>
  )
}

export default TermsOfConditions
