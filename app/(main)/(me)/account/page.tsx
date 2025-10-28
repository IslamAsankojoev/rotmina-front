'use client'

import React from 'react'

import { Button } from '@/shadcn/components/ui/button'
import { OrderList } from '@/src/features'
import { Breadcrumbs, Typography, useAuth, useUser } from '@/src/shared'

const Account = () => {
  const { user } = useUser()
  const { logout } = useAuth()

  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'ACCOUNT', href: '/account' },
          ]}
        />
      </div>
      <div className="container flex max-w-[800px] justify-between items-center">
        <div className="mt-10 mb-10 flex flex-col items-start">
          <Typography variant="text_categories" className="capitalize">
            {user.data?.username}
          </Typography>
          <Typography variant="text_main" className="capitalize">
            {user.data?.email}
          </Typography>
        </div>
        <Button onClick={() => logout.mutate()}>Logout</Button>
      </div>
      <div className="container mb-24 flex max-w-[800px] flex-col items-center justify-center">
        <OrderList />
      </div>
    </>
  )
}

export default Account
