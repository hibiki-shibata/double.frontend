import { useQuery } from "@tanstack/react-query"
import { useApiClient } from "../../../common/lib/apiClient/apiClientHook"
import type { Wallet, WalletTransaction } from "../types/wallet.type"
import type { PaginationParam } from "../../../common/types/pagination.type"

export function useWallet() {
    const { get } = useApiClient()

    return useQuery<Wallet>({
        queryKey: ["wallet", 'me'],
        queryFn: () => get<Wallet>('/wallet/me'),
        refetchInterval: 7000,
        staleTime: 10000
    })
}


export function useWalletHistory(paginationParam: PaginationParam) {
    const page = paginationParam.page ?? 1
    const limit = paginationParam.limit ?? 10
    const { get } = useApiClient()

    return useQuery<WalletTransaction[]>({
        queryKey: ["betHistory", page, limit],
        queryFn: () => get<WalletTransaction[]>('/wallet/history', { page, limit }),
        refetchInterval: 7000,
        staleTime: 10000
    })
}