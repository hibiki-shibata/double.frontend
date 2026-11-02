import { apiClient } from '../../../common/lib/apiClient/apiClient';
import { queryClient } from '../../../common/lib/queryClient';
import type { PlaceBetPayload } from '../types/bet.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export function usePlaceBet(marketId: string) {

    const mutation = useMutation({
        mutationFn: (betPayload: PlaceBetPayload) =>
            apiClient.post<PlaceBetPayload>("/bet", betPayload),
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