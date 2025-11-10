'use client'

import { Typography } from '@/src/shared'
import { useScreenSize } from '@/src/shared'
import { Facebook, Instagram, Mail, Smartphone } from 'lucide-react'

interface ContactIconsProps {
  translations: {
    instagram: string
    facebook: string
    email: string
  }
}

export const ContactIcons = ({ translations }: ContactIconsProps) => {
  const { md } = useScreenSize()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Instagram size={md ? 35 : 24} />
        <Typography variant="text_main">{translations.instagram}</Typography>
      </div>
      <div className="flex items-center gap-2">
        <Smartphone size={md ? 35 : 24} />
        <Typography variant="text_main">+3947201</Typography>
      </div>
      <div className="flex items-center gap-2">
        <Facebook size={md ? 35 : 24} />
        <Typography variant="text_main">{translations.facebook}</Typography>
      </div>
      <div className="flex items-center gap-2">
        <Mail size={md ? 35 : 24} />
        <Typography variant="text_main">{translations.email}</Typography>
      </div>
    </div>
  )
}

