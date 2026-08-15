// MarketDetail.tsx - Performance Optimized
// import { useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Users, Award, BarChart3 } from 'lucide-react';
import { useMemo, useCallback } from 'react';

type MarketResponse = {
    id: string;
    title: string;
    status: "PAYOUT" | "CANCELLED" | "UPCOMING" | "OPEN" | "RESOLVED" | "CLOSED";
    closeAt: string;
    createdAt: string;
    predictions: {
        name: string;
        totalParticipants: number;
        betSum: bigint;
    }[];
}

const STATUS_CONFIG = {
    OPEN: { color: 'bg-green-500', label: 'Open' },
    CLOSED: { color: 'bg-red-500', label: 'Closed' },
    UPCOMING: { color: 'bg-blue-500', label: 'Upcoming' },
    RESOLVED: { color: 'bg-purple-500', label: 'Resolved' },
    PAYOUT: { color: 'bg-yellow-500', label: 'Payout' },
    CANCELLED: { color: 'bg-gray-500', label: 'Cancelled' },
} as const;

export function MarketDetail() {
    // const { id } = useParams();

    // Mock data - replace with actual fetch
    const market: MarketResponse = useMemo(() => ({
        id: '1',
        title: "Will Ethereum reach $5,000 by end of 2024?",
        status: "OPEN",
        closeAt: "2024-12-31T23:59:59Z",
        createdAt: "2024-01-01T00:00:00Z",
        predictions: [
            { name: "Yes", totalParticipants: 1234, betSum: BigInt(4500000000000000000) },
            { name: "No", totalParticipants: 567, betSum: BigInt(2100000000000000000) },
        ]
    }), []);

    // Memoize expensive calculations
    const calculatedData = useMemo(() => {
        const totalBets = market.predictions.reduce((sum, p) => sum + Number(p.betSum), 0);
        const totalParticipants = market.predictions.reduce((sum, p) => sum + p.totalParticipants, 0);

        const predictionsWithPercentage = market.predictions.map(p => {
            const percentage = totalBets > 0 ? (Number(p.betSum) / totalBets) * 100 : 0;
            return { ...p, percentage };
        });

        const maxPercentage = Math.max(...predictionsWithPercentage.map(p => p.percentage));

        return {
            totalBets,
            totalParticipants,
            predictions: predictionsWithPercentage,
            maxPercentage,
            totalBetsFormatted: (totalBets / 1e18).toFixed(2),
        };
    }, [market]);

    // Memoize formatters
    const formatDate = useCallback((date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }, []);

    const formatBetAmount = useCallback((amount: bigint) => {
        return (Number(amount) / 1e18).toFixed(2);
    }, []);

    const statusConfig = STATUS_CONFIG[market.status];
    const isOpen = market.status === 'OPEN';

    return (
        <>
            <button
                onClick={() => window.history.back()}
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-150 mb-6"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-150" />
                <span>Back to Markets</span>
            </button>

            {/* Main Card */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
                {/* Header - Removed animate-pulse */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`px-4 py-1 rounded-full font-semibold ${statusConfig.color}`}>
                                {/* <span className={`${statusConfig.color}`} /> */}
                                {statusConfig.label}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Created {formatDate(market.createdAt)}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            {market.title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Total Volume</p>
                            <p className="text-lg font-bold">
                                ${calculatedData.totalBetsFormatted}M
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid - Using memoized values */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl border border-white/5 mb-8">
                    <div>
                        <p className="text-xs text-gray-400">Participants</p>
                        <p className="text-lg font-semibold text-white flex items-center gap-1">
                            <Users className="w-4 h-4 text-blue-400" />
                            {calculatedData.totalParticipants.toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Total Bets</p>
                        <p className="text-lg font-semibold text-white flex items-center gap-1">
                            <BarChart3 className="w-4 h-4 text-purple-400" />
                            ${calculatedData.totalBetsFormatted}M
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Predictions</p>
                        <p className="text-lg font-semibold text-white">
                            {calculatedData.predictions.length}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Closes</p>
                        <p className="text-lg font-semibold text-white flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            {formatDate(market.closeAt)}
                        </p>
                    </div>
                </div>

                {/* Predictions - Using memoized data */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        Predictions
                    </h2>
                    <div className="space-y-3">
                        {calculatedData.predictions.map((prediction, index) => {
                            const isLeading = prediction.percentage === calculatedData.maxPercentage &&
                                calculatedData.maxPercentage > 0;

                            return (
                                <PredictionCard
                                    key={index}
                                    prediction={prediction}
                                    isLeading={isLeading}
                                    formatBetAmount={formatBetAmount}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Action Button */}
                {isOpen && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-150 hover:scale-[1.02] active:scale-95">
                            Place Your Bet
                        </button>
                        <p className="text-xs text-gray-400 mt-3">
                            ⚡ {calculatedData.totalParticipants.toLocaleString()} participants already placed their bets
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

// Separate component to prevent re-renders of all predictions
const PredictionCard = ({ prediction, isLeading, formatBetAmount }: { prediction: any, isLeading: boolean, formatBetAmount: (num: bigint) => string }) => {
    return (
        <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors duration-150 border border-white/5 hover:border-white/20">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">
                        {prediction.name}
                    </span>
                    {isLeading && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">
                            Leading
                        </span>
                    )}
                </div>
                <div className="text-right">
                    <span className="text-sm font-semibold text-white">
                        {prediction.percentage.toFixed(1)}%
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                        ({prediction.totalParticipants} participants)
                    </span>
                </div>
            </div>

            {/* Progress Bar - Static width, no transition */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${isLeading
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gray-500'
                        }`}
                    style={{ width: `${prediction.percentage}%` }}
                />
            </div>

            <div className="mt-2 flex justify-end">
                <span className="text-xs text-gray-400">
                    ${formatBetAmount(prediction.betSum)} in bets
                </span>
            </div>
        </div>
    );
};