// Типы для Personal Stylist

export type SessionType = 'online' | 'at-your-home'

export interface PersonalStylist {
  id: string
  hours: number
  price: number
  sessionType: SessionType
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface PersonalStylistResponse {
  data: PersonalStylist[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface PersonalStylistFilters {
  sessionType?: SessionType
  price?: {
    min?: number
    max?: number
  }
  hours?: {
    min?: number
    max?: number
  }
}

export interface PersonalStylistQueryParams {
  fields?: string[]
  filters?: PersonalStylistFilters
  pagination?: {
    page?: number
    pageSize?: number
  }
  sort?: string[]
}

// Типы для группировки по типу сессии
export interface GroupedPersonalStylists {
  online: PersonalStylist[]
  'at-your-home': PersonalStylist[]
}
