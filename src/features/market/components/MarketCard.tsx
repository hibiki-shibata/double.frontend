import type { Market, Predictions } from '../types';
import { Users, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router";

const STATUS_STYLES: Record<string, string> = {
  OPEN: 'bg-green-200 text-green-700',
  CLOSED: 'bg-amber-200 text-amber-800',
  SETTLED: 'bg-slate-200 text-slate-600',
  CANCELLED: 'bg-red-200 text-red-700',
}

interface Props {
  market: Market
}

export function MarketCard({ market }: Props) {
  // Mock data - replace with actual fetch
  const predictions: Predictions[] = [
    { name: "Yes", totalParticipants: 1234, betSum: BigInt(4500000000000000000) },
    { name: "No", totalParticipants: 567, betSum: BigInt(2100000000000000000) },
  ]
  const navigateTo = useNavigate()
  const totalBets = predictions?.reduce((sum, p) => sum + Number(p.betSum), 0) || 0;
  const totalParticipants = predictions?.reduce((sum, p) => sum + p.totalParticipants, 0) || 0;
  const volumeFormatted = (totalBets / 1e18).toFixed(2);

  const handleClick = () => {
    navigateTo(`/market/${market.id}`);
  };

  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className="group rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 p-5 text-left hover:border-blue-400/50  relative overflow-hidden"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

      {/* Animated shimmer effect */}
      <div className="absolute -inset-full group-hover:inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-all duration-1000 ease-out" />

      <div className="relative z-10">
        {/* Header with status badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-2">
              {market.title}
            </p>
            {/* Market ID or category */}
            <p className="text-xs text-gray-500 mt-0.5 font-mono">
              #{market.id.slice(0, 8)}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg ${STATUS_STYLES[market.status]}`}>
            {market.status}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {market.description || "No description provided"}
        </p>

        {/* Stats row */}
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs text-gray-400 font-medium">
              {totalParticipants.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-gray-400 font-medium">
              ${volumeFormatted}
            </span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="flex -space-x-2">
              {/* Show top 3 prediction options as small dots */}
              {predictions?.slice(0, 3).map((p, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full border border-slate-800 ${i === 0 ? 'bg-blue-400' :
                    i === 1 ? 'bg-purple-400' :
                      'bg-green-400'
                    }`}
                />
              ))}
              {predictions?.length > 3 && (
                <span className="text-[10px] text-gray-500 ml-1">
                  +{predictions.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer with time and trade button */}
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs text-gray-500">
              {new Date(market.closeAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
              {market.status === 'OPEN' ? 'Live Now' : 'Closed'}
            </span>
            <span className="text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2 flex items-center gap-1">
              Trade
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Progress bar for total bets (optional) */}
        {predictions && predictions.length > 0 && (
          <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000"
              style={{
                width: `${Math.min((Number(predictions[0]?.betSum || 0) / totalBets) * 100, 100)}%`
              }}
            />
          </div>
        )}
      </div>
    </button>
  );
}