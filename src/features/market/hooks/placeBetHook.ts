import { useState } from 'react';
import { apiClient } from '../../../lib/apiClient/apiClient';
import type { BetPayload } from '../types';


type IUsePlaceBet = {
    placeBet: (betPayload: BetPayload) => Promise<void>,
    isSuccess: boolean,
    isLoading: boolean,
    error: string | null
}

export function usePlaceBet(): IUsePlaceBet {
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const placeBet = async (betPayload: BetPayload) => {
        setIsLoading(true)
        setIsSuccess(false)
        setError(null)

        try {
            await apiClient.post<BetPayload>("/bet", betPayload)
            setIsSuccess(true)
            return
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(message)
            setIsSuccess(false)
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    return { placeBet, isSuccess, isLoading, error }
}