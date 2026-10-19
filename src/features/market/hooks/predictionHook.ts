import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../lib/apiClient/apiClient'
import type { Prediction } from '../types'


export function usePredictions(marketId: string) {
    return useQuery({
        queryKey: ["predictions", marketId],
        // queryFn: () => apiClient.get<Prediction[]>('/prediction/', { marketId }),
        queryFn: () => apiClient.get<Prediction[]>(`/market/${marketId}/predictions`),
        // refetchInterval: 50000,
        enabled: !!marketId
    })
}