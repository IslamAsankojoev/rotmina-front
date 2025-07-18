'use client'

import { FC, HTMLProps } from 'react'

import { cn } from '@/shadcn/lib/utils'
import clsx from 'clsx'
import { Arima, Libre_Caslon_Text } from 'next/font/google'

interface TypographyProps extends HTMLProps<HTMLParagraphElement> {
  children: React.ReactNode
  variant?:
    | 'text_main'
    | 'text_mini_footer'
    | 'text_mobile_footer'
    | 'text_1'
    | 'text_mobile_categories'
    | 'text_categories'
    | 'text_title'
    | 'text_mobile_title'
    | 'text_pageTitle'
    | 'text_mobile_title2'
}

const arima = Arima({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
})

const libreCaslonText = Libre_Caslon_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

const variantStyles: Record<string, string> = {
  text_main: clsx('text-[18px]', `${arima.className}`),
  text_mini_footer: clsx('text-[14px]', `${arima.className}`),
  text_mobile_footer: clsx('text-[12px]', `${arima.className}`),
  text_1: clsx('text-[20px]', `${arima.className}`),
  text_mobile_categories: clsx('text-[24px]', `${arima.className}`),
  text_categories: clsx('text-[32px]', `${arima.className}`),
  text_title: clsx('text-[48px]', `${libreCaslonText.className} italic`),
  text_mobile_title: clsx('text-[36px]', `${libreCaslonText.className}`),
  text_pageTitle: clsx('text-[80px]', `${libreCaslonText.className}`),
  text_mobile_title2: clsx('text-[32px]', `${libreCaslonText.className}`),
}

export const Typography: FC<TypographyProps> = ({
  children,
  variant = 'text_main',
  className = '',
  ...props
}) => {
  const styles = variantStyles
  const classNames = cn(styles[variant], className)

  return (
    <p className={classNames} {...props}>
      {children}
    </p>
  )
}
