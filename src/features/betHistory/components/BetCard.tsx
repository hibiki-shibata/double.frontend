import { CheckCircle, Clock, XCircle } from "lucide-react";
import { formatDate } from "../../../common/lib/formatDate";
import type { Bet } from "../types/betHistory.type";

const getOutcomeIcon = (outcome: Bet['outcome']) => {
    switch (outcome) {
        case 'won': return <CheckCircle className="w-4 h-4 text-green-400" />;
        case 'lost': return <XCircle className="w-4 h-4 text-red-400" />;
        case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
    }
};

export function BetCard({ bet }: { bet: Bet }) {
    return (
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
    )
}