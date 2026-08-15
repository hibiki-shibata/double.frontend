import type { MinorUnits } from '../../lib/money';

export type PredictionTransactionType = 'BET_ADDED' | 'BET_REMOVED' | 'SETTLEMENT_ADJUSTMENT';

/** Append-only ledger of every edit to a Prediction's totalBetSum — same pattern as WalletTransaction. */
export interface PredictionTransaction {
  id: string;
  predictionId: string;
  amount: MinorUnits;
  type: PredictionTransactionType;
  totalAfter: MinorUnits;
  referenceId?: string; // e.g. related bet id
  createdAt: string;
}