import { apiClient } from '../../../common/lib/apiClient/apiClient';
import { queryClient } from '../../../common/lib/queryClient';
import type { PaginationParam } from '../../../common/types/pagination.type';
import type { PlaceBetPayload } from '../types/bet.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { Bet } from '../types/betHistory.type';


export function usePlaceBet(marketId: string) {
    const mutation = useMutation({
        mutationFn: (betPayload: PlaceBetPayload) =>
            apiClient.post<PlaceBetPayload>("/bet", betPayload),
        onSuccess: () => {
            // Invalidate the market bet query so react-query fetches the updated server state
            queryClient.invalidateQueries({ queryKey: ["betHistory", marketId] });
        },
    })
    return {
        placeBet: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}

export function useBetHistory(paginationParam: PaginationParam) {
    const page = paginationParam.page ?? 1
    const limit = paginationParam.limit ?? 10

    return useQuery<Bet[]>({
        queryKey: ["betHistory", page, limit],
        queryFn: () => apiClient.get<Bet[]>('/bet/history', { page, limit }),
        refetchInterval: 7000,
        staleTime: 10000
    })
}