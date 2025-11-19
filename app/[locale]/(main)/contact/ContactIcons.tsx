'use client'

import { socialLinks, Typography } from '@/src/shared'
import { useScreenSize } from '@/src/shared'
import { Facebook, Instagram, Mail, Smartphone } from 'lucide-react'

interface ContactIconsProps {
  translations: {
    instagram: string
    facebook: string
    email: string
    phone: string
  }
}

export const ContactIcons = ({ translations }: ContactIconsProps) => {
  const { md } = useScreenSize()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Instagram size={md ? 35 : 24} />
        <a href={socialLinks.instagram} target="_blank">
          <Typography variant="text_main">{translations.instagram}</Typography>
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Smartphone size={md ? 35 : 24} />
        <a href={socialLinks.phone} target="_blank">
          <Typography variant="text_main">{translations.phone}</Typography>
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Facebook size={md ? 35 : 24} />
        <a href={socialLinks.facebook} target="_blank">
          <Typography variant="text_main">{translations.facebook}</Typography>
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Mail size={md ? 35 : 24} />
        <a href={socialLinks.email} target="_blank">
          <Typography variant="text_main">{translations.email}</Typography>
        </a>
      </div>
    </div>
  )
}

