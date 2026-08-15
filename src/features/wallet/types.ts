import type { MinorUnits } from '../../lib/money';

export type WalletStatus = 'ACTIVE' | 'FROZEN' | 'CLOSED';
export type Currency = 'USD' | 'EUR' | 'JPY' | 'KRW';

export interface Wallet {
  id: string;
  userId: string;
  /** Total funds. Reserved amount is held out separately, not subtracted here. */
  balance: MinorUnits;
  /** Funds locked against pending bets — not spendable until released. */
  reserved: MinorUnits;
  currency: Currency;
  status: WalletStatus;
  /** Optimistic-locking version from the backend; surfaced for debugging, not for client-side writes. */
  version: number;
  updatedAt: string;
}