import { apiClient } from '../../lib/apiClient';
import type { Page } from '../../types/shared';
import type { Market, MarketListParams } from './types';

export const marketApi = {
  list: (params: MarketListParams) => apiClient.get<Page<Market>>('/markets', params),
  getById: (marketId: string) => apiClient.get<Market>(`/markets/${marketId}`),
};