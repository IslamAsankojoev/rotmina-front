export type GiftCard = {
  id: number,
  documentId: string,
  recipientsName: string,
  recipientsEmail: string,
  yourName: string,
  yourEmail: string,
  personalMessage: string,
  amount: number,
  code: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  locale: string | null
  is_used: boolean
}

export type GiftCardResponse = {
  data: GiftCard[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type GiftCardResponseOne = {
  data: GiftCard
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}