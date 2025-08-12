'use client'

import React from 'react'

import { Button } from '@/shadcn/components/ui/button'
import { OrderList } from '@/src/features'
import { Breadcrumbs, useAuth, useUser } from '@/src/shared'

const Account = () => {
  const { user } = useUser()
  const { logout } = useAuth()
  return (
    <>
      <div className="relative container mt-24 flex w-full flex-col justify-end md:mt-36">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'ACCOUNT', href: '/account' },
          ]}
        />
      </div>
      <div className="container mt-10 flex max-w-[800px] gap-4">
        <h3 className="text-2xl font-bold text-green-800">
          Login: {user.data?.username}
        </h3>
        <Button variant='outline' onClick={() => logout.mutate()}>Logout</Button>
      </div>
      <div className="container mb-24 flex max-w-[800px] flex-col items-center justify-center">
        <OrderList />
      </div>
    </>
  )
}

export default Account
