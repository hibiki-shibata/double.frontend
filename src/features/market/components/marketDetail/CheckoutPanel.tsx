// components/CheckoutPanel.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import { Users, Clock, CheckCircle } from 'lucide-react';
import type { Prediction } from '../../types';

interface CheckoutPanelProps {
    isMarketOpen: boolean
    selectedPrediction: Prediction;
    closeCheckoutPanel: () => void;
}

export function CheckoutPanel({
    isMarketOpen,
    selectedPrediction,
    closeCheckoutPanel,
}: CheckoutPanelProps) {
    const [betAmount, setBetAmount] = useState<string>('');
    const isSuccess = false
    const isSubmitting = false
    const isLoggedIn = false


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPrediction || !betAmount) return;
        // implement later
    };

    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            {/* Guard 1: User Not Logged In */}
            {!isLoggedIn && (
                <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Join the Prediction</h3>
                    <p className="text-sm text-gray-400 mb-6">
                        Sign in to bet on this market and start earning rewards
                    </p>
                    <Link
                        to="/auth"
                        className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity  active:opacity-80"
                    >
                        Sign in to bet
                    </Link>
                    <p className="text-xs text-gray-500 mt-3">
                        Don't have an account?{' '}
                        <Link to="/auth" className="text-blue-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            )}

            {/* Guard 2: Market Closed */}
            {isLoggedIn && !isMarketOpen && (
                <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-gray-500/20 flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Market Closed</h3>
                    <p className="text-sm text-gray-400">
                        This market is no longer accepting bets
                    </p>
                </div>
            )}

            {/* Guard 3: Success State */}
            {isLoggedIn && isSuccess && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-400">bet submitted!</p>
                    <p className="text-xs text-gray-400 mt-1">Your prediction has been recorded</p>
                </div>
            )}

            {/* Default State: Active Voting Form */}
            {isLoggedIn && !isSuccess && (
                <>
                    <p className="text-sm text-gray-400 mb-4 mt-1">Review your bet details before submit</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Prediction Selection */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Your Prediction
                            </label>
                            <div className="w-full text-left px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-emerald-400 font-medium truncate">
                                {selectedPrediction?.name || "None selected"}
                            </div>
                        </div>

                        {/* Bet Amount */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Bet Amount (USD)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                <input
                                    type="number"
                                    value={betAmount}
                                    onChange={(e) => setBetAmount(e.target.value)}
                                    placeholder="0.00"
                                    min="0"
                                    step="1"
                                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Min: $1.00 • Max: $10,000.00</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!selectedPrediction || !betAmount || isSubmitting}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Submit bet'
                            )}
                        </button>
                    </form>
                </>
            )}

            {/* Footer Close Button */}
            <div className="flex items-center justify-center mt-6">
                <button
                    onClick={closeCheckoutPanel}
                    className='hover:scale-104 active:scale-100 font-semibold'
                // className="w-full sm:w-auto px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white hover:scale-102 active:scale-95"
                >
                    Close
                </button>
            </div>
        </div>
    );
}