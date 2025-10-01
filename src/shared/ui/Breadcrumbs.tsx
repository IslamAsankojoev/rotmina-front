'use client'

import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shadcn/components/ui/breadcrumb'

interface BreadcrumbsProps {
  links: {
    href: string
    title: string
  }[]
}

export const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
            {index < links.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
