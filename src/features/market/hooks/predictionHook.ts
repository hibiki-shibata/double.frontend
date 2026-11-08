import { useQuery } from '@tanstack/react-query'
import { useApiClient } from '../../../common/lib/apiClient/apiClientHook'
import type { Prediction } from '../types/prediction.type'

export function usePredictions(marketId: string) {
    const { get } = useApiClient()
    return useQuery({
        queryKey: ["predictions", marketId],
        queryFn: () => get<Prediction[]>(`/market/${marketId}/predictions`),
        refetchInterval: 50000,
        staleTime: 10000,
        enabled: !!marketId
    })
}

export type CalculatedPredictions = {
    totalBets: number;
    totalParticipants: number;
    predictions: Array<Prediction & { percentage: number }>;
    leadingPrediction: Prediction | null;
}

export function useCalculatedPredictions(predictions: Prediction[] = []): CalculatedPredictions {
    if (!predictions.length) {
        return {
            totalBets: 0,
            totalParticipants: 0,
            predictions: [],
            leadingPrediction: {} as Prediction
        }
    }

    let totalBets = 0
    let totalParticipants = 0

    // Pass 1: Calculate totals
    for (let i = 0; i < predictions.length; i++) {
        totalBets += Number(predictions[i].betSum) || 0
        totalParticipants += Number(predictions[i].totalParticipants) || 0
    }

    let maxPercentage = -1
    let leadingPrediction = null

    // Pass 2: Format predictions and determine the leader in a single pass
    const formattedPredictions = predictions.map((p) => {
        const betNum = Number(p.betSum) || 0
        const percentage = totalBets > 0 ? Number(((betNum / totalBets) * 100).toFixed(2)) : 0

        const formatted = {
            ...p,
            percentage
        }

        if (percentage > maxPercentage) {
            maxPercentage = percentage
            leadingPrediction = formatted
        }

        return formatted
    })

    return {
        totalBets,
        totalParticipants,
        predictions: formattedPredictions,
        leadingPrediction,
    }
}