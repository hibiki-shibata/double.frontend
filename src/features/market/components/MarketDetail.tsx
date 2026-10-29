// MarketDetail.tsx
import { ArrowLeft, Clock, Calendar, Users, Award, BarChart3 } from 'lucide-react';
import { useMemo, useCallback, useState } from 'react';
import { CheckoutPanel } from './CheckoutPanel';
import type { Market, MarketStatus, Prediction } from '../types';
import { useMarket } from '../hooks/marketHook';
import { usePredictions } from '../hooks/predictionHook';
// import { useNavigate } from 'react-router';
import { useParams, Navigate, Link } from "react-router";

const STATUS_CONFIG: Record<MarketStatus, { color: string, label: string }> = {
    OPEN: { color: 'bg-green-500', label: 'Open' },
    CLOSED: { color: 'bg-red-500', label: 'Closed' },
    SETTLED: { color: 'bg-purple-500', label: 'Resolved' },
    CANCELLED: { color: 'bg-gray-500', label: 'Cancelled' },
    // UPCOMING: { color: 'bg-blue-500', label: 'Upcoming' },
    // PAYOUT: { color: 'bg-yellow-500', label: 'Payout' },
} as const;

// Todo
// Add: auth context
export function MarketDetail() {
    let { marketId } = useParams()

    const [showCheckout, setShowCheckout] = useState(true)
    const isLoggedIn = false
    if (marketId == undefined) return <Navigate to="/" replace />;

    const { data: market, isLoading: marketIsLoading, isError: marketIsError } = useMarket(marketId)
    const { data: predictions = [], isLoading: predictionsIsLoading, isError: predictionsIsError } = usePredictions(marketId)

    const calculatedPredictionData = useMemo(() => { // useMemo for mitigate expensive prediction metadata formating process
        const totalBets = predictions.reduce((sum, p) => sum + Number(p.betSum), 0) // Sum up the each prediction's investment sum
        const totalParticipants = predictions.reduce((sum, p) => sum + p.totalParticipants, 0) // Sum up the each prediction's participants  sum
        const predictionsWithPercentage = predictions.map(p => { // Calculate percentage from raw prediction data
            const percentage = totalBets > 0 ? (Number(p.betSum) / totalBets) * 100 : 0
            return { ...p, percentage }
        })
        const maxPercentage = Math.max(...predictionsWithPercentage.map(p => p.percentage))
        return {
            totalBets,
            totalParticipants,
            predictions: predictionsWithPercentage,
            maxPercentage,
            totalBetsFormatted: (totalBets / 1e18).toFixed(2),
        }
    }, [predictions])

    // Memoize formatters
    const formatDate = useCallback((date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }, [])

    const formatBetAmount = useCallback((amount: bigint) => {
        return (Number(amount) / 1e18).toFixed(2);
    }, []);


    const toggleCheckout = () => setShowCheckout(!showCheckout);


    // Loading/Error case handling
    if (marketIsLoading || predictionsIsLoading) return <div>Loading...</div>
    if (marketIsError || predictionsIsError) return <div>Market or Prediction is Error during load</div>

    // No data case handling
    if (!market || !predictions) return <div>No data to show</div>
    // set status-based variable - change css 
    const statusConfig = STATUS_CONFIG[market.status]

    return (
        <>
            <div className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-150 mb-6">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-150" />
                <Link to='/'>Back to Markets</Link>
            </div>

            {/* Main Card */}
            <div className={`grid gap-6 ${showCheckout ? 'max-w-7xl mx-auto grid-cols-1 lg:grid-cols-2' : 'max-w-6xl mx-auto grid-cols-1'}`}>
                <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
                    {/* Header - Removed animate-pulse */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`px-4 py-1 rounded-full font-semibold ${statusConfig.color}`}>
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
                                    ${calculatedPredictionData.totalBetsFormatted}M
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid - Using memoized values */}
                    <PredictionStaticGrid
                        calculatedPredictionData={calculatedPredictionData}
                        market={market}
                        formatDate={formatDate}
                    />


                    {/* Predictions - Using memoized data */}
                    <div>
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-400" />
                            Predictions
                        </h2>
                        <div className="space-y-3">
                            {calculatedPredictionData.predictions.map((prediction, index) => {
                                const isLeading = prediction.percentage === calculatedPredictionData.maxPercentage &&
                                    calculatedPredictionData.maxPercentage > 0;

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
                    {(market.status === 'OPEN') && (
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <button
                                onClick={toggleCheckout}
                                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-150 hover:scale-[1.02] active:scale-95"
                            >
                                {showCheckout ? 'Close Bet' : 'Place Your Bet'}
                            </button>
                            <p className="text-xs text-gray-400 mt-3">
                                ⚡ {calculatedPredictionData.totalParticipants.toLocaleString()} participants already placed their bets
                            </p>
                        </div>
                    )}
                </div>

                {/* Checkout Panel - Only visible when showCheckout is true */}
                {showCheckout && (
                    <div>
                        <CheckoutPanel
                            isLoggedIn={isLoggedIn}
                            marketStatus={status}
                            predictions={predictions}
                            onVote={(prediction, amount) => {
                                console.log('Vote:', { prediction, amount });
                                // Handle vote submission
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}


function PredictionStaticGrid(
    { calculatedPredictionData, market, formatDate }: { calculatedPredictionData: any, market: any, formatDate: (time: string) => any }
) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl border border-white/5 mb-8">
            <div>
                <p className="text-xs text-gray-400">Participants</p>
                <p className="text-lg font-semibold text-white flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    {calculatedPredictionData.totalParticipants.toLocaleString()}
                </p>
            </div>
            <div>
                <p className="text-xs text-gray-400">Total Bets</p>
                <p className="text-lg font-semibold text-white flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                    ${calculatedPredictionData.totalBetsFormatted}M
                </p>
            </div>
            <div>
                <p className="text-xs text-gray-400">Predictions</p>
                <p className="text-lg font-semibold text-white">
                    {calculatedPredictionData.predictions.length}
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
    )
}



// Separate component to prevent re-renders of all predictions
function PredictionCard(
    { prediction, isLeading, formatBetAmount }: { prediction: any, isLeading: boolean, formatBetAmount: (num: bigint) => string }
) {
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