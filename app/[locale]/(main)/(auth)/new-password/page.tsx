import React from 'react'

import { NewPasswordForm } from '@/src/features'
import { Suspense } from 'react'
import { Loader } from '@/src/shared'

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <NewPasswordForm />
    </Suspense>
  )
}

export default NewPasswordPage
