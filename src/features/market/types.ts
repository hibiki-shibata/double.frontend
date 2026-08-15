export type MarketStatus = 'OPEN' | 'CLOSED' | 'SETTLED' | 'CANCELLED';

export interface Market {
  id: string;
  title: string;
  description: string;
  status: MarketStatus;
  closeTime: string;
  settledAt?: string;
  createdAt: string;
}

export interface MarketListParams {
  status?: MarketStatus;
  cursor?: string;
  limit?: number;
}