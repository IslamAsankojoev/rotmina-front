import { api } from '@/src/app/api/ky.config'
import { apiMap } from '@/src/shared/constants/api'
import type {
  PersonalStylist,
  PersonalStylistResponse,
  PersonalStylistQueryParams,
  GroupedPersonalStylists,
} from './type'

// Получить список всех Personal Stylist
export const getPersonalStylists = async (
  params?: PersonalStylistQueryParams
): Promise<PersonalStylistResponse> => {
  const searchParams = new URLSearchParams()

  // Добавляем поля
  if (params?.fields) {
    searchParams.append('fields', params.fields.join(','))
  }

  // Добавляем фильтры
  if (params?.filters) {
    const { sessionType, price, hours } = params.filters

    if (sessionType) {
      searchParams.append('filters[sessionType][$eq]', sessionType)
    }

    if (price?.min !== undefined) {
      searchParams.append('filters[price][$gte]', price.min.toString())
    }

    if (price?.max !== undefined) {
      searchParams.append('filters[price][$lte]', price.max.toString())
    }

    if (hours?.min !== undefined) {
      searchParams.append('filters[hours][$gte]', hours.min.toString())
    }

    if (hours?.max !== undefined) {
      searchParams.append('filters[hours][$lte]', hours.max.toString())
    }
  }

  // Добавляем пагинацию
  if (params?.pagination) {
    const { page, pageSize } = params.pagination
    if (page !== undefined) {
      searchParams.append('pagination[page]', page.toString())
    }
    if (pageSize !== undefined) {
      searchParams.append('pagination[pageSize]', pageSize.toString())
    }
  }

  // Добавляем сортировку
  if (params?.sort) {
    searchParams.append('sort', params.sort.join(','))
  }

  const queryString = searchParams.toString()
  const url = queryString ? `${apiMap.getPersonalStylists}?${queryString}` : apiMap.getPersonalStylists

  return api.get(url).json<PersonalStylistResponse>()
}

// Получить Personal Stylist по ID
export const getPersonalStylistById = async (id: string): Promise<PersonalStylist> => {
  const response = await api.get(apiMap.getPersonalStylist.replace(':id', id)).json<{
    data: PersonalStylist
  }>()
  return response.data
}

// Получить Personal Stylist сгруппированные по типу сессии
export const getGroupedPersonalStylists = async (): Promise<GroupedPersonalStylists> => {
  const response = await getPersonalStylists({
    fields: ['id', 'hours', 'price', 'sessionType'],
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

// Получить только Online сессии
export const getOnlinePersonalStylists = async (): Promise<PersonalStylist[]> => {
  const response = await getPersonalStylists({
    filters: { sessionType: 'online' },
    fields: ['id', 'hours', 'price', 'sessionType'],
    sort: ['price:asc']
  })
  return response.data
}

// Получить только At-your-home сессии
export const getAtHomePersonalStylists = async (): Promise<PersonalStylist[]> => {
  const response = await getPersonalStylists({
    filters: { sessionType: 'at-your-home' },
    fields: ['id', 'hours', 'price', 'sessionType'],
    sort: ['price:asc']
  })
  return response.data
}
