'use client'

import React from 'react'

import { ContactForm } from '@/src/features'
import { Breadcrumbs, Typography, useScreenSize, useDictionary, useLocale } from '@/src/shared'
import { Facebook, Instagram, Mail, Smartphone } from 'lucide-react'

const Contact = () => {
  const { dictionary } = useDictionary()
  const { localizePath } = useLocale()
  const t = ((dictionary as unknown) as Record<string, Record<string, string>>).contact || {
    home: 'HOME',
    contact: 'CONTACT',
    title: 'Love to hear from you',
    instagram: 'Instagram',
    facebook: 'Facebook',
    email: 'Email',
    description: "Have a question, thought or something you would like to share? You are welcome to reach out. I read every message and will get back to you as soon as possible.",
  }
  const { md } = useScreenSize()
  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: localizePath('/') },
            { title: t.contact, href: localizePath('/contact') },
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
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Instagram size={md ? 35 : 24} />
              <Typography variant="text_main">{t.instagram}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone size={md ? 35 : 24} />
              <Typography variant="text_main">+3947201</Typography>
            </div>
            <div className="flex items-center gap-2">
              <Facebook size={md ? 35 : 24} />
              <Typography variant="text_main">{t.facebook}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={md ? 35 : 24} />
              <Typography variant="text_main">{t.email}</Typography>
            </div>
          </div>
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

export default Contact
