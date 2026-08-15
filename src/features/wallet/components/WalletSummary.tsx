import { formatMoney, subtractMoney } from '../../../lib/money';
import type { Wallet } from '../types';

interface Props {
  wallet: Wallet;
}

export function WalletSummary({ wallet }: Props) {
  const available = subtractMoney(wallet.balance, wallet.reserved);

  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">Available balance</p>
      <p className="text-2xl font-semibold text-slate-900">
        {formatMoney(available, wallet.currency)}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {formatMoney(wallet.reserved, wallet.currency)} reserved on open bets
      </p>
    </div>
  );
}