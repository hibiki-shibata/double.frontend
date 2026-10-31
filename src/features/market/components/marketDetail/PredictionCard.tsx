import { useCallback } from "react";

export function PredictionCard(
    { prediction, isLeading, setSelectedPrediction, showCheckoutPanel }:
        { prediction: any, isLeading: boolean, setSelectedPrediction: () => void, showCheckoutPanel: () => void }
) {
    
    const formatBetAmount = useCallback((amount: bigint) => {
        return (Number(amount) / 1e18).toFixed(2);
    }, [])

    return (
        <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors duration-150 border border-white/5 hover:border-white/20"
            onClick={() => {
                setSelectedPrediction()
                showCheckoutPanel()
            }}>
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
                    className={`h-full rounded-full ${isLeading ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-500'}`}
                    style={{ width: `${prediction.percentage}%` }}
                />
            </div>

            <div className="mt-2 flex justify-end">
                <span className="text-xs text-gray-400">
                    ${formatBetAmount(prediction.betSum)} in bets
                </span>
            </div>
        </div>
    )
}