
import { apiClient } from "../../../common/lib/apiClient/apiClient";
import { useMutation } from "@tanstack/react-query";
import type { User } from "../types/user.type";

export function useUser() {
    const mutation = useMutation({
        mutationFn: () =>
            apiClient.get<User>("/user/me")
    })

    return {
        fetchUser: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}