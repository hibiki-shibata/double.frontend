
import { useApiClient } from "../../../common/lib/apiClient/apiClientHook";
import { useMutation } from "@tanstack/react-query";
import type { User } from "../types/user.type";

export function useUser() {
    const { get } = useApiClient()
    const mutation = useMutation({
        mutationFn: () =>
            get<User>("/user/me")
    })

    return {
        fetchUser: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}