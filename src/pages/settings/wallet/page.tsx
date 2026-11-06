import { useState, useMemo } from 'react';
import {
    Eye, EyeOff, ArrowDownRight, ArrowUpRight,
    DollarSign, TrendingUp, TrendingDown, Copy, Filter, Wallet as WalletIcon
} from 'lucide-react';
import { formatDate } from '../../../common/lib/formatDate';
import { WalletTransactionType } from '../../../features/wallet/types/walletTransaction.type';
import { useWallet, useWalletHistory } from '../../../features/wallet/hooks/walletHook';

type TransactionFilter = 'all' | 'deposits' | 'withdrawals' | 'bets';

interface WalletTabProps {
    onDeposit?: () => void;
    onWithdraw?: () => void;
}

// --- Domain Utilities ---
const FORMATTER_DECIMALS = 2;

function formatBigIntAmount(amount: bigint | undefined, decimals: number = FORMATTER_DECIMALS): string {
    if (amount === undefined || amount === null) return '0.00';
    return Number(amount).toFixed(decimals);
}

function getTransactionMeta(type: WalletTransactionType) {
    switch (type) {
        case WalletTransactionType.DEPOSIT:
            return {
                label: 'Deposit',
                icon: <ArrowDownRight className="w-4 h-4 text-green-400" />,
                isPositive: true,
                colorClass: 'text-green-400'
            };
        case WalletTransactionType.WITHDRAW:
            return {
                label: 'Withdrawal',
                icon: <ArrowUpRight className="w-4 h-4 text-red-400" />,
                isPositive: false,
                colorClass: 'text-red-400'
            };
        case WalletTransactionType.BET:
            return {
                label: 'Bet Placed',
                icon: <DollarSign className="w-4 h-4 text-blue-400" />,
                isPositive: false,
                colorClass: 'text-red-400'
            };
        case WalletTransactionType.PAYOUT:
            return {
                label: 'Payout Won',
                icon: <TrendingUp className="w-4 h-4 text-green-400" />,
                isPositive: true,
                colorClass: 'text-green-400'
            };
        case WalletTransactionType.REFUND:
            return {
                label: 'Refund',
                icon: <TrendingUp className="w-4 h-4 text-yellow-400" />,
                isPositive: true,
                colorClass: 'text-green-400'
            };
        case WalletTransactionType.CANCEL:
            return {
                label: 'Cancelled',
                icon: <TrendingDown className="w-4 h-4 text-gray-400" />,
                isPositive: false,
                colorClass: 'text-gray-400'
            };
        default:
            return {
                label: 'Transaction',
                icon: <DollarSign className="w-4 h-4 text-gray-400" />,
                isPositive: false,
                colorClass: 'text-blue-400'
            };
    }
}

export function WalletTab({ onDeposit, onWithdraw }: WalletTabProps) {
    const [showBalance, setShowBalance] = useState<boolean>(true);
    const [selectedFilter, setSelectedFilter] = useState<TransactionFilter>('all');

    const { data: walletData, isLoading: isWalletLoading, error: walletError } = useWallet();
    const { data: walletHistory = [], isLoading: isWalletHistoryLoading } = useWalletHistory({ page: 1, limit: 10 });

    // --- Memoized Aggregations & Calculations ---
    const { totalDeposited, totalWithdrawn, netProfit } = useMemo(() => {
        if (!walletHistory.length) {
            return { totalDeposited: 0n, totalWithdrawn: 0n, netProfit: 0n };
        }

        let deposited = 0n;
        let withdrawn = 0n;
        let bets = 0n;
        let payouts = 0n;

        for (const tx of walletHistory) {
            switch (tx.type) {
                case WalletTransactionType.DEPOSIT:
                    deposited += tx.amount;
                    break;
                case WalletTransactionType.WITHDRAW:
                    withdrawn += tx.amount;
                    break;
                case WalletTransactionType.BET:
                    bets += tx.amount;
                    break;
                case WalletTransactionType.PAYOUT:
                    payouts += tx.amount;
                    break;
                default:
                    break;
            }
        }

        return {
            totalDeposited: deposited,
            totalWithdrawn: withdrawn,
            netProfit: payouts - bets
        };
    }, [walletHistory]);

    const filteredTransactions = useMemo(() => {
        return walletHistory.filter(tx => {
            if (selectedFilter === 'deposits') return tx.type === WalletTransactionType.DEPOSIT;
            if (selectedFilter === 'withdrawals') return tx.type === WalletTransactionType.WITHDRAW;
            if (selectedFilter === 'bets') {
                return tx.type === WalletTransactionType.BET || tx.type === WalletTransactionType.PAYOUT;
            }
            return true;
        });
    }, [walletHistory, selectedFilter]);

    // --- Loading State Handler ---
    if (isWalletLoading || isWalletHistoryLoading) {
        return (
            <div className="flex items-center justify-center p-12 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-400">Loading wallet details...</p>
                </div>
            </div>
        );
    }

    // --- Undefined / Empty State Handler ---
    if (!walletData || walletError) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-2xl border border-white/10 text-center">
                <WalletIcon className="w-12 h-12 text-gray-500 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-1">No Wallet Connected</h3>
                <p className="text-sm text-gray-400 max-w-sm mb-4">
                    We couldn't find active wallet data for your account. Please try refreshing or re-connecting.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-bold text-white tracking-tight">
                                {showBalance ? `$${formatBigIntAmount(walletData.balance)}` : '••••••••'}
                            </h2>
                            <button
                                onClick={() => setShowBalance(prev => !prev)}
                                aria-label={showBalance ? 'Hide balance' : 'Show balance'}
                                className="p-1 rounded hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                            >
                                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onDeposit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Deposit
                        </button>
                        <button
                            onClick={onWithdraw}
                            className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                            Withdraw
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-gray-400 mb-1">Total Deposited</p>
                        <p className="text-lg font-semibold text-white">
                            ${formatBigIntAmount(totalDeposited)}
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-gray-400 mb-1">Total Withdrawn</p>
                        <p className="text-lg font-semibold text-white">
                            ${formatBigIntAmount(totalWithdrawn)}
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-gray-400 mb-1">Net Profit</p>
                        <p className={`text-lg font-semibold ${netProfit >= 0n ? 'text-green-400' : 'text-red-400'}`}>
                            {netProfit >= 0n ? '+' : ''}${formatBigIntAmount(netProfit)}
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-xs text-gray-400 mb-1">Reserved Amount</p>
                        <p className="text-lg font-semibold text-white">
                            ${formatBigIntAmount(walletData.reservedAmount)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Transaction History</h3>
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value as TransactionFilter)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all" className="bg-gray-900 text-white">All</option>
                            <option value="deposits" className="bg-gray-900 text-white">Deposits</option>
                            <option value="withdrawals" className="bg-gray-900 text-white">Withdrawals</option>
                            <option value="bets" className="bg-gray-900 text-white">Bets & Payouts</option>
                        </select>
                        <button aria-label="Filter options" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {filteredTransactions.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-sm">
                        No transactions found matching the selected filter.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredTransactions.map((tx) => {
                            const meta = getTransactionMeta(tx.type);
                            return (
                                <div
                                    key={tx.id}
                                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5">
                                            {meta.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{meta.label}</p>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <span>{formatDate(tx.created_at)}</span>
                                                {tx.prediction_id && (
                                                    <>
                                                        <span>•</span>
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(tx.prediction_id)}
                                                            className="flex items-center gap-1 hover:text-white transition-colors group"
                                                            title="Copy prediction ID"
                                                        >
                                                            <span className="font-mono">Pred: {tx.prediction_id.slice(0, 8)}...</span>
                                                            <Copy className="w-3 h-3 text-gray-500 group-hover:text-white" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-semibold ${meta.colorClass}`}>
                                            {meta.isPositive ? '+' : '-'}${formatBigIntAmount(tx.amount)}
                                        </p>
                                        <span className="text-xs px-2 py-0.5 rounded-full text-green-400 bg-green-400/10 font-medium">
                                            Completed
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}