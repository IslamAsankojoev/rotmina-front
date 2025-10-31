import { api } from '@/src/app'
import { apiMap } from '@/src/shared'

import { NewsletterSubscriber } from './type'

export const NewsletterSibscribeService = {
  subscribe: (data: NewsletterSubscriber) =>
    api.post(apiMap.subscribe, { json: { data } }),
}
