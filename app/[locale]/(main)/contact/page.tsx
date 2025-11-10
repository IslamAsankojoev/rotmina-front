import { cookies } from 'next/headers'

import { ContactForm } from '@/src/features'
import { Breadcrumbs, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale, addLocaleToPath } from '@/src/shared/utils/locale'
import { ContactIcons } from '@/app/[locale]/(main)/contact/ContactIcons'

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .contact || {
    home: 'HOME',
    contact: 'CONTACT',
    title: 'Love to hear from you',
    instagram: 'Instagram',
    facebook: 'Facebook',
    email: 'Email',
    description:
      'Have a question, thought or something you would like to share? You are welcome to reach out. I read every message and will get back to you as soon as possible.',
  }

  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            { title: t.contact, href: addLocaleToPath('/contact', locale) },
          ]}
        />
      </div>
      <div className="container mb-24">
        <div className="flex flex-col">
          <Typography
            variant="text_title"
            className="hidden py-8 italic md:block"
          >
            {t.title}
          </Typography>
          <Typography
            variant="text_mobile_title2"
            className="block py-8 italic md:hidden"
          >
            {t.title}
          </Typography>
          <ContactIcons
            translations={{
              instagram: t.instagram,
              facebook: t.facebook,
              email: t.email,
            }}
          />
          <Typography variant="text_main" className="mt-8">
            {t.description.split(' <br /> ').map((line: string, index: number) => (
              <span key={index}>
                {line}
                {index < t.description.split(' <br /> ').length - 1 && <br />}
              </span>
            ))}
          </Typography>
          <ContactForm />
        </div>
      </div>
    </>
  )
}
