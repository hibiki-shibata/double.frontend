import { formatMoney } from '../../../lib/money';
import type { Bet } from '../types';

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  WON: 'bg-green-100 text-green-700',
  LOST: 'bg-red-100 text-red-700',
  VOID: 'bg-slate-100 text-slate-600',
  CANCELLED: 'bg-slate-100 text-slate-600',
};

interface Props {
  bets: Bet[];
  currency: string;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

export function BetHistoryList({ bets, currency, hasMore, isLoadingMore, onLoadMore }: Props) {
  return (
    <div className="space-y-2">
      {bets.map((bet) => (
        <div
          key={bet.id}
          className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
        >
          <div>
            <p className="text-sm font-medium text-slate-900">
              {formatMoney(bet.amount, currency)}
            </p>
            <p className="text-xs text-slate-500">{new Date(bet.placedAt).toLocaleString()}</p>
          </div>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[bet.status]}`}>
            {bet.status}
          </span>
        </div>
      ))}
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