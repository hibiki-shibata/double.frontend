// components/WalletTab.tsx
import { useState } from 'react';
import { 
    Eye, EyeOff, ArrowDownRight, ArrowUpRight, 
    DollarSign, TrendingUp, TrendingDown, Copy, Filter 
} from 'lucide-react';

export type TransactionType = 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_won' | 'bet_lost';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    timestamp: string;
    description: string;
    txHash?: string;
}

interface WalletTabProps {
    walletData: {
        balance: number;
        totalDeposited: number;
        totalWithdrawn: number;
        netProfit: number;
        winRate: number;
    };
    transactions: Transaction[];
    formatDate: (date: string) => string;
}

export function WalletTab({ walletData, transactions, formatDate }: WalletTabProps) {
    const [showBalance, setShowBalance] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'deposits' | 'withdrawals' | 'bets'>('all');

    const getTransactionIcon = (type: TransactionType) => {
        switch (type) {
            case 'deposit': return <ArrowDownRight className="w-4 h-4 text-green-400" />;
            case 'withdrawal': return <ArrowUpRight className="w-4 h-4 text-red-400" />;
            case 'bet_placed': return <DollarSign className="w-4 h-4 text-blue-400" />;
            case 'bet_won': return <TrendingUp className="w-4 h-4 text-green-400" />;
            case 'bet_lost': return <TrendingDown className="w-4 h-4 text-red-400" />;
        }
    };

    const getStatusColor = (status: TransactionStatus) => {
        switch (status) {
            case 'completed': return 'text-green-400 bg-green-400/10';
            case 'pending': return 'text-yellow-400 bg-yellow-400/10';
            case 'failed': return 'text-red-400 bg-red-400/10';
        }
    };

    const filteredTransactions = transactions.filter(tx => {
        if (selectedFilter === 'deposits') return tx.type === 'deposit';
        if (selectedFilter === 'withdrawals') return tx.type === 'withdrawal';
        if (selectedFilter === 'bets') return tx.type.startsWith('bet_');
        return true;
    });

    return (
        <div className="space-y-6">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-bold text-white">
                                {showBalance ? `$${walletData.balance.toFixed(2)}` : '••••••••'}
                            </h2>
                            <button
                                onClick={() => setShowBalance(!showBalance)}
                                className="p-1 rounded hover:bg-white/5 transition-colors"
                            >
                                {showBalance ? (
                                    <EyeOff className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <Eye className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                            Deposit
                        </button>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                            Withdraw
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-xs text-gray-400">Total Deposited</p>
                        <p className="text-lg font-semibold text-white">
                            ${walletData.totalDeposited.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-xs text-gray-400">Total Withdrawn</p>
                        <p className="text-lg font-semibold text-white">
                            ${walletData.totalWithdrawn.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-xs text-gray-400">Net Profit</p>
                        <p className={`text-lg font-semibold ${walletData.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {walletData.netProfit >= 0 ? '+' : ''}{walletData.netProfit.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-xs text-gray-400">Win Rate</p>
                        <p className="text-lg font-semibold text-white">
                            {walletData.winRate}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Transaction History</h3>
                    <div className="flex gap-2">
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value as any)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All</option>
                            <option value="deposits">Deposits</option>
                            <option value="withdrawals">Withdrawals</option>
                            <option value="bets">Bets</option>
                        </select>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <Filter className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    {filteredTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white/5">
                                    {getTransactionIcon(tx.type)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{tx.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span>{formatDate(tx.timestamp)}</span>
                                        {tx.txHash && (
                                            <>
                                                <span>•</span>
                                                <button className="flex items-center gap-1 hover:text-white transition-colors">
                                                    <span className="font-mono">{tx.txHash.slice(0, 8)}...</span>
                                                    <Copy className="w-3 h-3" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-semibold ${
                                    tx.type === 'deposit' || tx.type === 'bet_won'
                                        ? 'text-green-400'
                                        : tx.type === 'withdrawal' || tx.type === 'bet_lost'
                                            ? 'text-red-400'
                                            : 'text-blue-400'
                                }`}>
                                    {tx.type === 'deposit' || tx.type === 'bet_won' ? '+' : ''}{tx.amount}
                                </p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(tx.status)}`}>
                                    {tx.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}