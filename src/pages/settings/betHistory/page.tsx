// components/BetHistoryTab.tsx
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Bet } from '../../../features/bet/types/betHistory.type';
import { EmptyState } from '../../../common/components/StatusState';


interface BetHistoryTabProps {
    betHistory: Bet[] | undefined;
    totalBets: number;
    wonBets: number;
    lostBets: number;
    formatDate: (date: string) => string;
}

export function BetHistoryTab({ betHistory, totalBets, wonBets, lostBets, formatDate }: BetHistoryTabProps) {
    const getOutcomeIcon = (outcome: Bet['outcome']) => {
        switch (outcome) {
            case 'won': return <CheckCircle className="w-4 h-4 text-green-400" />;
            case 'lost': return <XCircle className="w-4 h-4 text-red-400" />;
            case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
        }
    };

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
                    <div key={bet.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                {getOutcomeIcon(bet.outcome)}
                                <p className="text-sm font-medium text-white">{bet.marketTitle}</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span>Prediction: <span className="text-white">{bet.prediction}</span></span>
                                <span>Amount: <span className="text-white">${bet.amount}</span></span>
                                <span>{formatDate(bet.timestamp)}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            {bet.outcome !== 'pending' ? (
                                <p className={`text-sm font-semibold ${bet.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {bet.profit > 0 ? '+' : ''}{bet.profit}
                                </p>
                            ) : (
                                <span className="text-xs text-yellow-400">Pending</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );
}