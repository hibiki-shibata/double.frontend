import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../common/lib/apiClient/apiClient'
import type { Prediction } from '../types/prediction.type'


export function usePredictions(marketId: string) {
    return useQuery({
        queryKey: ["predictions", marketId],
        // queryFn: () => apiClient.get<Prediction[]>('/prediction/', { marketId }),
        queryFn: () => apiClient.get<Prediction[]>(`/market/${marketId}/predictions`),
        refetchInterval: 50000,
        staleTime: 10000,
        enabled: !!marketId
    })
}




export type CalculatedPredictions = {
    totalBets: number;
    totalParticipants: number;
    predictions: Array<Prediction & { percentage: number }>;
    maxPercentage: number;
}

export function useCalculatedPredictions(predictions: Prediction[]): CalculatedPredictions {
    const totalBets = predictions?.reduce((sum: number, p: Prediction) => sum + Number(p.betSum), 0) || 0
    const totalParticipants = predictions?.reduce((sum: number, p: Prediction) => sum + p.totalParticipants, 0) || 0

    // 1. Calculate percentage for each prediction based on its betSum vs totalBets
    const formattedPredictions = predictions?.map((p) => {
        const betNum = Number(p.betSum)
        const percentage = totalBets > 0 ? (betNum / totalBets) * 100 : 0
        return {
            ...p,
            percentage: Number(percentage.toFixed(2)) // rounded to 2 decimal places
        }
    }) || []

    // 2. Find the maximum percentage to determine which one is leading
    const maxPercentage = formattedPredictions.length > 0
        ? Math.max(...formattedPredictions.map(p => p.percentage))
        : 0

    return {
        totalBets,
        totalParticipants,
        predictions: formattedPredictions,
        maxPercentage
    }
}