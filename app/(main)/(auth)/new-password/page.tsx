import React from 'react'

import { NewPasswordForm } from '@/src/features'
import { Suspense } from 'react'

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordForm />
    </Suspense>
  )
}

export default NewPasswordPage
