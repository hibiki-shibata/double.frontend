import { useQuery } from '@tanstack/react-query'
import { marketApi } from './api'
import type { PaginationParam } from '../../types/shared'

export const marketKeys = {
  list: (params: PaginationParam) => ['marketList', params] as const,
  detail: (marketId: string) => ['markets', marketId] as const,
}

export function useMarketList(params: PaginationParam = {}) {
  return useQuery({
    queryKey: marketKeys.list(params),
    queryFn: () => marketApi.list(params),
    // refetchInterval: 50000,
  })
}

export function useMarket(marketId: string) {
  return useQuery({
    queryKey: marketKeys.detail(marketId),
    queryFn: () => marketApi.getById(marketId),
    enabled: Boolean(marketId),
  })
}