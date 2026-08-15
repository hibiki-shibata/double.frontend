// import { useQuery } from '@tanstack/react-query';
// import { marketApi } from './api';
// import type { MarketListParams } from './types';

// export const marketKeys = {
//   list: (params: MarketListParams) => ['markets', params] as const,
//   detail: (marketId: string) => ['markets', marketId] as const,
// };

// export function useMarkets(params: MarketListParams = {}) {
//   return useQuery({
//     queryKey: marketKeys.list(params),
//     queryFn: () => marketApi.list(params),
//   });
// }

// export function useMarket(marketId: string) {
//   return useQuery({
//     queryKey: marketKeys.detail(marketId),
//     queryFn: () => marketApi.getById(marketId),
//     enabled: Boolean(marketId),
//   });
// }