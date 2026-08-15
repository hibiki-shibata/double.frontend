import type { MinorUnits } from '../../lib/money';

export type BetStatus = 'PENDING' | 'WON' | 'LOST' | 'VOID' | 'CANCELLED';

/** Meta betting data: a single user's stake on one Prediction within one Market. */
export interface Bet {
  id: string;
  userId: string;
  predictionId: string;
  marketId: string;
  amount: MinorUnits;
  status: BetStatus;
  payoutAmount?: MinorUnits;
  placedAt: string;
  settledAt?: string;
}

export interface PlaceBetInput {
  predictionId: string;
  amount: MinorUnits;
}