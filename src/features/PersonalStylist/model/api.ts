import { api } from '@/src/app/api/ky.config'
import { apiMap } from '@/src/shared/constants/api'
import type {
  PersonalStylist,
  PersonalStylistResponse,
  PersonalStylistQueryParams,
  GroupedPersonalStylists,
} from './type'

// Get list of all Personal Stylists
export const getPersonalStylists = async (
  params?: PersonalStylistQueryParams
): Promise<PersonalStylistResponse> => {
  const searchParams = new URLSearchParams()

  // Add fields
  if (params?.fields) {
    searchParams.append('fields', params.fields.join(','))
  }

  // Add filters
  if (params?.filters) {
    const { sessionType, price, minutes } = params.filters

    if (sessionType) {
      searchParams.append('filters[sessionType][$eq]', sessionType)
    }

    if (price?.min !== undefined) {
      searchParams.append('filters[price][$gte]', price.min.toString())
    }

    if (price?.max !== undefined) {
      searchParams.append('filters[price][$lte]', price.max.toString())
    }

    if (minutes?.min !== undefined) {
      searchParams.append('filters[minutes][$gte]', minutes.min.toString())
    }

    if (minutes?.max !== undefined) {
      searchParams.append('filters[minutes][$lte]', minutes.max.toString())
    }
  }

  // Add pagination
  if (params?.pagination) {
    const { page, pageSize } = params.pagination
    if (page !== undefined) {
      searchParams.append('pagination[page]', page.toString())
    }
    if (pageSize !== undefined) {
      searchParams.append('pagination[pageSize]', pageSize.toString())
    }
  }

  // Add sorting
  if (params?.sort) {
    searchParams.append('sort', params.sort.join(','))
  }

  const queryString = searchParams.toString()
  const url = queryString ? `${apiMap.getPersonalStylists}?${queryString}` : apiMap.getPersonalStylists

  return api.get(url).json<PersonalStylistResponse>()
}

// Get Personal Stylist by ID
export const getPersonalStylistById = async (id: string): Promise<PersonalStylist> => {
  const response = await api.get(apiMap.getPersonalStylist.replace(':id', id)).json<{
    data: PersonalStylist
  }>()
  return response.data
}

// Get Personal Stylists grouped by session type
export const getGroupedPersonalStylists = async (): Promise<GroupedPersonalStylists> => {
  const response = await getPersonalStylists({
    fields: ['id', 'minutes', 'price', 'sessionType'],
    sort: ['price:asc']
  })

  const grouped: GroupedPersonalStylists = {
    online: [],
    'at-your-home': []
  }

  response.data.forEach(stylist => {
    grouped[stylist.sessionType].push(stylist)
  })

  return grouped
}

// Get only Online sessions
export const getOnlinePersonalStylists = async (): Promise<PersonalStylist[]> => {
  const response = await getPersonalStylists({
    filters: { sessionType: 'online' },
    fields: ['id', 'minutes', 'price', 'sessionType'],
    sort: ['price:asc']
  })
  return response.data
}

// Get only At-your-home sessions
export const getAtHomePersonalStylists = async (): Promise<PersonalStylist[]> => {
  const response = await getPersonalStylists({
    filters: { sessionType: 'at-your-home' },
    fields: ['id', 'minutes', 'price', 'sessionType'],
    sort: ['price:asc']
  })
  return response.data
}
