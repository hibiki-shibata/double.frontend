import { formatMoney } from '../../../lib/money';
import type { WalletTransaction } from '../types';

interface Props {
  transactions: WalletTransaction[];
  currency: string;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

export function TransactionHistoryTable({
  transactions,
  currency,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: Props) {
  return (
    <div className="rounded-lg border border-slate-200">
      <table className="w-full text-sm">
        <thead className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Balance after</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b border-slate-100 last:border-0">
              <td className="px-4 py-2 text-slate-700">{tx.type}</td>
              <td className={`px-4 py-2 ${tx.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                {formatMoney(tx.amount, currency)}
              </td>
              <td className="px-4 py-2 text-slate-500">{formatMoney(tx.balanceAfter, currency)}</td>
              <td className="px-4 py-2 text-slate-500">{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <button
          onClick={onLoadMore}
          disabled={isLoadingMore}
          className="w-full py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          {isLoadingMore ? 'Loading…' : 'Load more'}
        </button>
      )}
    </div>
  );
}