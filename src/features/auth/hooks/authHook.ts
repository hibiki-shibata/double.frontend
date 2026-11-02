import { useMutation } from "@tanstack/react-query";
import type { AuthCredential } from "../types/login.type";
import { apiClient } from "../../../common/lib/apiClient/apiClient";
import type { AccessToken } from "../types/token.type";

export function useLogin() {
    const mutation = useMutation({
        mutationFn: (loginCredential: AuthCredential) =>
            apiClient.post<AccessToken>("/auth/login", loginCredential),
    })

    return {
        login: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}


export function useSignup() {
    const mutation = useMutation({
        mutationFn: (signupCredential: AuthCredential) =>
            apiClient.post<AccessToken>("/auth/signup", signupCredential),
    })

    return {
        signup: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}



export function useLogout() {
    const mutation = useMutation({
        mutationFn: () =>
            apiClient.post<void>("/auth/logout"),
    })

    return {
        logout: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}


export function useRefreshToken() {
    const mutation = useMutation({
        mutationFn: () =>
            apiClient.post<AccessToken>("/auth/refreshToken"),
    })

    return {
        refreshToken: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}