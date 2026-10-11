import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../lib/apiClient'
import type { PaginationParam } from '../../types/shared'
import type { Market } from './types'

export const marketKeys = {
    list: (paginationParam: PaginationParam) => ['marketList', paginationParam] as const,
    detail: (marketId: string) => ['market', marketId] as const,
}

export function useMarketList(paginationParam: PaginationParam = {}) {
    return useQuery({
        queryKey: marketKeys.list(paginationParam),
        queryFn: () => apiClient.get<Market[]>('/market/list', paginationParam),
        // refetchInterval: 50000,
    })
}

export function useMarket(marketId: string) {
    return useQuery({
        queryKey: marketKeys.detail(marketId),
        queryFn: () => apiClient.get<Market>(`/market/${marketId}`),
        enabled: Boolean(marketId),
    })
}