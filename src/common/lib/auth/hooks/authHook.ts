import { useMutation } from "@tanstack/react-query";
import type { AuthCredential } from "../types/credential.type";
import { useApiClient } from "../../apiClient/apiClientHook";
import type { AccessToken } from "../types/token.type";

export function useLogin() {
    const { post } = useApiClient()
    const mutation = useMutation({
        mutationFn: (loginCredential: AuthCredential) =>
            post<AccessToken>("/auth/login", loginCredential),
    })

    return {
        reqLogin: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}


export function useSignup() {
    const { post } = useApiClient()

    const mutation = useMutation({
        mutationFn: (signupCredential: AuthCredential) =>
            post<AccessToken>("/auth/signup", signupCredential),
    })

    return {
        reqSignup: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}


export function useLogout() {
    const { post } = useApiClient()
    const mutation = useMutation({
        mutationFn: () =>
            post<void>("/auth/logout"),
    })

    return {
        reqLogout: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}


export function useRefreshToken() {
    const { post } = useApiClient()
    const mutation = useMutation({
        mutationFn: () =>
            post<AccessToken>("/auth/refreshToken"),
    })

    return {
        reqRefreshToken: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null,
        isSuccess: mutation.isSuccess,
    }
}