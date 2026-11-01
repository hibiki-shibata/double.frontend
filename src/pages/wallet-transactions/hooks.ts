// import { useInfiniteQuery } from '@tanstack/react-query';
// import { walletTransactionsApi } from './api';

// export const walletTransactionKeys = {
//   list: (walletId: string) => ['wallet-transactions', walletId] as const,
// };

// // Ledgers grow unbounded, so this is cursor-paginated (infinite query) rather
// // than a single fetch-all — never load a full wallet history in one request.
// export function useWalletTransactions(walletId: string) {
//   return useInfiniteQuery({
//     queryKey: walletTransactionKeys.list(walletId),
//     queryFn: ({ pageParam }) =>
//       walletTransactionsApi.list(walletId, { cursor: pageParam, limit: 25 }),
//     initialPageParam: undefined as string | undefined,
//     getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
//     enabled: Boolean(walletId),
//   });
// }