import type { PaginationParam } from '../../../common/types/pagination.type';
import type { Bet } from '../types/betHistory.type';
import { useApiClient } from '../../../common/lib/apiClient/apiClientHook';
import { useQuery } from '@tanstack/react-query';

export function useBetHistory(paginationParam: PaginationParam) {
    const page = paginationParam.page ?? 1
    const limit = paginationParam.limit ?? 10
    const { get } = useApiClient()

    return useQuery<Bet[]>({
        queryKey: ["betHistory", page, limit],
        queryFn: () => get<Bet[]>('/bet/history', { page, limit }),
        refetchInterval: 7000,
        staleTime: 10000
    })
}