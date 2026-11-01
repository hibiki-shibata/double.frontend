import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../common/lib/apiClient/apiClient'
import type { PaginationParam } from '../../../common/types/pagination.type'
import type { Market } from '../types'


export function useMarketList(paginationParam: PaginationParam) {
    const page = paginationParam.page ?? 1
    const limit = paginationParam.limit ?? 10

    return useQuery({
        queryKey: ["marketList", page, limit],
        queryFn: () => apiClient.get<Market[]>('/market/list', { page, limit }),
        refetchInterval: 7000,
        staleTime: 10000
    })
}

export function useMarket(marketId: string) {
    return useQuery({
        queryKey: ["marketId", marketId],
        queryFn: () => apiClient.get<Market>(`/market/${marketId}`),
        enabled: Boolean(marketId),
        refetchInterval: 7000,
        staleTime: 10000
    })
}