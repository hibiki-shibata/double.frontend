import type { Bet } from '../../../features/betHistory/types/betHistory.type';
import { EmptyState } from '../../../common/components/StatusState';
import { BetCard } from '../../../features/betHistory/components/BetCard';


type Props = {
    betHistory: Bet[] | undefined;
    totalBets: number;
    wonBets: number;
    lostBets: number;
    formatDate: (date: string) => string;
}

export function BetHistoryTab({ betHistory, totalBets, wonBets, lostBets }: Props) {
    return (
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Bet History</h3>
                <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">Total Bets: <span className="text-white font-medium">{totalBets}</span></span>
                    <span className="text-gray-400">Won: <span className="text-green-400 font-medium">{wonBets}</span></span>
                    <span className="text-gray-400">Lost: <span className="text-red-400 font-medium">{lostBets}</span></span>
                </div>
            </div>
            {betHistory && (
                <EmptyState message="No Bet History yet" />
            )}

            {betHistory && <div className="space-y-3">
                {betHistory.map((bet) => (
                    <BetCard bet={bet} />
                ))}
            </div>}
        </div>
    );
}