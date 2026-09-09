import { apiClient } from '../../lib/apiClient'
import type { PaginationParam } from '../../types/shared'
import type { Market } from './types'

export const marketApi = {
  list: (params: PaginationParam) => apiClient.get<Market[]>('/market/list', params),
  getById: (marketId: string) => apiClient.get<Market>(`/market/${marketId}`),
}