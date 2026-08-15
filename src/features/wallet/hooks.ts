// import { useQuery } from '@tanstack/react-query';
// import { walletApi } from './api';

// export const walletKeys = {
//   mine: ['wallet', 'me'] as const,
// };

// export function useMyWallet() {
//   return useQuery({
//     queryKey: walletKeys.mine,
//     queryFn: walletApi.getMyWallet,
//     // The backend intentionally doesn't cache live balance (per double.backend
//     // caching notes) — mirror that here with a short poll instead of relying
//     // on react-query's default staleTime.
//     refetchInterval: 10_000,
//   });
// }