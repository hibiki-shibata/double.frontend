import type { MinorUnits } from '../../lib/money';

export type WalletTransactionType =
  | 'DEPOSIT'
  | 'WITHDRAWAL'
  | 'RESERVE'
  | 'RELEASE'
  | 'BET_PLACED'
  | 'BET_PAYOUT'
  | 'ADJUSTMENT';

/**
 * Append-only ledger row. There is deliberately no update/delete type or
 * endpoint for this resource anywhere in this feature — every wallet
 * mutation is a new row, never an edit to an old one.
 */
export interface WalletTransaction {
  id: string;
  walletId: string;
  amount: MinorUnits; // signed: negative for debits
  type: WalletTransactionType;
  balanceAfter: MinorUnits;
  referenceId?: string; // e.g. related bet id
  createdAt: string;
}