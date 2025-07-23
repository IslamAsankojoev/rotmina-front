import React from 'react'

import { Breadcrumbs } from '@/src/shared'
import { OrderList } from '@/src/features'

const Account = () => {
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
      <div className="container mb-24 mt-10 flex max-w-[800px] flex-col items-center justify-center">
        <OrderList />
      </div>
    </>
  )
}

export default Account
