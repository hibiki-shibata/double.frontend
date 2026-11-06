import type { Bet } from "../types/bet.type";
import { BetCard } from './BetCard';
import { useBetHistory } from "../hooks/betHook";


export function BetHistoryTab() {
    const { data: betHistory = [], isLoading: isBetsLoading } = useBetHistory({ page: 0, limit: 10 });

    const totalBets = betHistory.length
    const wonBets = betHistory.filter(bet => bet.outcome === 'won').length
    const lostBets = betHistory.filter(bet => bet.outcome === 'lost').length

    if (isBetsLoading) {
        return (
            <div className="flex items-center justify-center p-12 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">Bet History</h3>
                <div className="flex items-center gap-4 text-sm bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-gray-400">Total: <span className="text-white font-medium">{totalBets}</span></span>
                    <span className="text-gray-400">Won: <span className="text-green-400 font-medium">{wonBets}</span></span>
                    <span className="text-gray-400">Lost: <span className="text-red-400 font-medium">{lostBets}</span></span>
                </div>
            </div>

            {(!betHistory || betHistory.length === 0) ? (
                <div className="py-12 text-center text-gray-400 text-sm">
                    No bet history found.
                </div>
            ) : (
                <div className="space-y-3">
                    {betHistory.map((bet: Bet) => (
                        <BetCard key={bet.id} bet={bet} />
                    ))}
                </div>
            )}
        </div>
    );
}