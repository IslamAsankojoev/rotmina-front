'use client'

import React from 'react'

import { ContactForm } from '@/src/features'
import { Breadcrumbs, Typography, useScreenSize } from '@/src/shared'
import { Facebook, Instagram, Mail, Smartphone } from 'lucide-react'

const Contact = () => {
  const { md } = useScreenSize()
  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'CONTACT', href: '/contact' },
          ]}
        />
      </div>
      <div className="container mb-24">
        <div className="flex flex-col">
          <Typography
            variant="text_title"
            className="hidden py-8 italic md:block"
          >
            Love to hear from you
          </Typography>
          <Typography
            variant="text_mobile_title2"
            className="block py-8 italic md:hidden"
          >
            Love to hear from you
          </Typography>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Instagram size={md ? 35 : 24} />
              <Typography variant="text_main">Instagram</Typography>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone size={md ? 35 : 24} />
              <Typography variant="text_main">+3947201</Typography>
            </div>
            <div className="flex items-center gap-2">
              <Facebook size={md ? 35 : 24} />
              <Typography variant="text_main">Facebook</Typography>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={md ? 35 : 24} />
              <Typography variant="text_main">Email</Typography>
            </div>
          </div>
          <Typography variant="text_main" className="mt-8">
            Have a question, thought or something you would like to share?{' '}
            <br /> You are welcome to reach out. I read every message and will
            get back to you as soon as possible.
          </Typography>
          <ContactForm />
        </div>
      </div>
    </>
  )
}

export default Contact
