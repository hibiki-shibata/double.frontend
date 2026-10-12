import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/apiClient/apiClient'
import type { PaginationParam } from '../../../types/shared'
import type { Market } from '../types'


export function useMarketList(paginationParam: PaginationParam = {}) {
    return useQuery({
        queryKey: ["marketList", paginationParam],
        queryFn: () => apiClient.get<Market[]>('/market/list', paginationParam),
        // refetchInterval: 50000,
    })
}

export function useMarket(marketId: string) {
    return useQuery({
        queryKey: ["marketId", marketId],
        queryFn: () => apiClient.get<Market>(`/market/${marketId}`),
        enabled: Boolean(marketId),
    })
}