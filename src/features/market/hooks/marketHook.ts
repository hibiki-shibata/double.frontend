import { useQuery } from '@tanstack/react-query'
import { useApiClient } from '../../../common/lib/apiClient/apiClientHook'
import type { PaginationParam } from '../../../common/types/pagination.type'
import type { Market } from '../types/market.type'


export function useMarketList(paginationParam: PaginationParam) {
    const page = paginationParam.page ?? 1
    const limit = paginationParam.limit ?? 10
    const { get } = useApiClient()

    return useQuery<Market[]>({
        queryKey: ["marketList", page, limit],
        queryFn: () => get<Market[]>('/market/list', { page, limit }),
        refetchInterval: 7000,
        staleTime: 10000
    })
}

export function useMarket(marketId: string) {
    const { get } = useApiClient()
    return useQuery<Market>({
        queryKey: ["marketId", marketId],
        queryFn: () => get<Market>(`/market/${marketId}`),
        enabled: Boolean(marketId),
        refetchInterval: 7000,
        staleTime: 10000
    })
}