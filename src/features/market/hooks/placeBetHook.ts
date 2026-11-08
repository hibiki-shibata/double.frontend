import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../../../common/lib/apiClient/apiClientHook";
import type { PlaceBetPayload } from "../types/bet.type";
import { queryClient } from "../../../common/lib/queryClient";

export function usePlaceBet(marketId: string) {
    const { post } = useApiClient()
    const mutation = useMutation({
        mutationFn: (betPayload: PlaceBetPayload) =>
            post<PlaceBetPayload>("/bet", betPayload),
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