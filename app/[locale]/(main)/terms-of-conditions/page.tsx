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

  // Функция для обработки текста и выделения главных пунктов жирным
  const renderTextWithBoldNumbers = (text: string) => {
    // Регулярное выражение для поиска главных пунктов (1. Title, 2. Title и т.д.)
    // Ищем начало строки, затем цифру, точку, пробел и весь текст до следующего переноса строки
    // Убеждаемся, что это не подпункт (не 1.1, 1.2 и т.д.)
    const regex = /(^|\n)(\d+\.\s[^\n]+)/gm
    const parts: (string | React.ReactElement)[] = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      // Проверяем, что это главный пункт (не подпункт типа 1.1, 2.3 и т.д.)
      const fullMatch = match[2] // Полный текст пункта (например, "1. General")
      
      // Если после первой цифры и точки идет еще одна цифра (например, "1.1"), пропускаем
      // Проверяем паттерн: цифра.цифра (подпункт)
      if (fullMatch.match(/^\d+\.\d+/)) {
        continue
      }

      // Добавляем текст до совпадения
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      // Добавляем весь пункт (номер + текст) жирным
      parts.push(
        <strong key={match.index}>
          {match[1]}
          {match[2]}
        </strong>
      )
      lastIndex = regex.lastIndex
    }

    // Добавляем оставшийся текст
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
