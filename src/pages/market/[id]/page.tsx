// MarketDetail.tsx
import { useMemo, useCallback, useState } from 'react';
import { useParams, Navigate, Link } from "react-router";
import { ArrowLeft, Clock, Calendar, Users, Award, BarChart3 } from 'lucide-react';
import type { MarketStatus } from '../../../features/market/types/market.type';
import type { Prediction } from '../../../features/market/types/prediction.type';
import { PredictionCard } from '../../../features/market/components/detail/PredictionCard';
import { CheckoutPanel } from '../../../features/market/components/detail/CheckoutPanel';
import { useMarket } from '../../../features/market/hooks/marketHook';
import { usePredictions } from '../../../features/market/hooks/predictionHook';
import { ErrorState, LoadingState } from '../../../common/components/StatusState';


const STATUS_CONFIG: Record<MarketStatus, { color: string, label: string }> = {
    OPEN: { color: 'bg-green-500', label: 'Open' },
    CLOSED: { color: 'bg-red-500', label: 'Closed' },
    SETTLED: { color: 'bg-purple-500', label: 'Resolved' },
    CANCELLED: { color: 'bg-gray-500', label: 'Cancelled' },
    // UPCOMING: { color: 'bg-blue-500', label: 'Upcoming' },
    // PAYOUT: { color: 'bg-yellow-500', label: 'Payout' },
} as const;

export function MarketDetail() {
    let { marketId } = useParams()

    const [showCheckout, setShowCheckout] = useState<boolean>(false)
    const [selectedPrediction, setSelectedPrediction] = useState<Prediction>()
    if (marketId == undefined) return <Navigate to="/" replace /> // Navigating to Market list page

    // Fetching market and prediction needs
    const { data: market, isLoading: isMarketLoading, isError: isMarketError } = useMarket(marketId)
    const { data: predictions = [], isLoading: isPredictionLoading, isError: isPredictionError } = usePredictions(marketId)

    // Calculate Static data, using market and prediction
    const calculatedPredictionData = useMemo(() => { // useMemo for mitigate expensive prediction metadata formating process
        const totalBets = predictions.reduce((sum, p) => sum + Number(p.betSum), 0) // Sum up the each prediction's investment sum
        const totalParticipants = predictions.reduce((sum, p) => sum + p.totalParticipants, 0) // Sum up the each prediction's participants  sum
        const predictionsWithPercentage = predictions.map(p => { // Calculate percentage from raw prediction data
            const percentage = totalBets > 0 ? (Number(p.betSum) / totalBets) * 100 : 0
            return { ...p, percentage }
        })
        const maxPercentage: number = Math.max(...predictionsWithPercentage.map(p => p.percentage))
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


    const statusConfig = STATUS_CONFIG[market?.status ?? "CLOSED"]

    return (
        <>
            <div className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-150 mt-14 mb-10 mx-10">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-150" />
                <Link to='/'>Back to Markets</Link>
            </div>
            {(isMarketLoading) && (
                <LoadingState message="Loading market data" />
            )}
            {(isMarketError) && (
                <ErrorState message="Failed to fetch market data" />
            )}


            {/* Main Card */}
            {market &&
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
                                        <Clock className="w-3 h-3" />Created {formatDate(market.createdAt)}
                                    </span>

                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold">{market.title}</h1>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-xs text-gray-400">Total Volume</p>
                                    <p className="text-lg font-bold">${calculatedPredictionData.totalBetsFormatted}M</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid - Using memoized values */}
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
                                    <Calendar className="w-4 h-4 text-orange-400" />{formatDate(market.closeAt)}
                                </p>
                            </div>
                        </div>


                        {/* Predictions - Using memoized data */}
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-yellow-400" />Predictions</h2>
                            {isPredictionLoading && (
                                <LoadingState message="loading predictiton data" />
                            )}
                            {isPredictionError && (
                                <ErrorState message="Failed to load prediction data" />
                            )}
                            <div className="space-y-3">
                                {calculatedPredictionData.predictions.map((prediction, index) => {
                                    const isLeading = prediction.percentage === calculatedPredictionData.maxPercentage &&
                                        calculatedPredictionData.maxPercentage > 0;
                                    return (
                                        <PredictionCard
                                            key={index}
                                            prediction={prediction}
                                            setSelectedPrediction={() => setSelectedPrediction(prediction)}
                                            isLeading={isLeading}
                                            showCheckoutPanel={() => setShowCheckout(true)}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Checkout Panel - Only visible when showCheckout is true */}
                    <div>
                        {(showCheckout && selectedPrediction) && (
                            <CheckoutPanel
                                market={market}
                                selectedPrediction={selectedPrediction}
                                closeCheckoutPanel={() => setShowCheckout(false)}
                            />
                        )}
                    </div>
                </div>
            }
        </>
    );
}
