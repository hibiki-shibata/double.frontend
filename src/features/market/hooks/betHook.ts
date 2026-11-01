import { apiClient } from '../../../lib/apiClient/apiClient';
import type { BetPayload } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export function usePlaceBet(marketId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (betPayload: BetPayload) =>
            apiClient.post<BetPayload>("/bet", betPayload),
        onSuccess: () => {
            // Invalidate the market bet query so react-query fetches the updated server state
            queryClient.invalidateQueries({ queryKey: ["betHistory", marketId] });
        },
    });

    return {
        placeBet: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    };
}