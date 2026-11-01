// pages/AccountSettings.tsx
import { useState } from 'react';
import { Link } from 'react-router';
import {
    ArrowLeft, Wallet, History, TrendingUp, TrendingDown,
    DollarSign, Clock, CheckCircle, XCircle, AlertCircle,
    Copy, ExternalLink, Eye, EyeOff, Shield, User,
    Settings, Bell, LogOut, CreditCard, ArrowUpRight,
    ArrowDownRight, Calendar, Search, Filter
} from 'lucide-react';

type TransactionType = 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_won' | 'bet_lost';
type TransactionStatus = 'pending' | 'completed' | 'failed';

interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    status: TransactionStatus;
    timestamp: string;
    description: string;
    txHash?: string;
}

interface Bet {
    id: string;
    marketTitle: string;
    prediction: string;
    amount: number;
    outcome: 'won' | 'lost' | 'pending';
    profit: number;
    timestamp: string;
}

export function AccountSettings() {
    const [activeTab, setActiveTab] = useState<'wallet' | 'bets' | 'settings'>('wallet');
    const [showBalance, setShowBalance] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'deposits' | 'withdrawals' | 'bets'>('all');

    // Mock data - replace with real data from your API
    const walletData = {
        balance: 2450.75,
        totalDeposited: 5000,
        totalWithdrawn: 2549.25,
        netProfit: 1245.50,
        totalBets: 47,
        wonBets: 28,
        lostBets: 19,
        winRate: 59.6
    };

    const transactions: Transaction[] = [
        { id: '1', type: 'deposit', amount: 500, status: 'completed', timestamp: '2024-01-15T10:30:00Z', description: 'Bank transfer deposit', txHash: '0x123...abc' },
        { id: '2', type: 'bet_placed', amount: 100, status: 'completed', timestamp: '2024-01-14T15:20:00Z', description: 'Bet on ETH reaching $5,000', txHash: '0x456...def' },
        { id: '3', type: 'bet_won', amount: 250, status: 'completed', timestamp: '2024-01-13T09:15:00Z', description: 'Won bet on BTC prediction', txHash: '0x789...ghi' },
        { id: '4', type: 'withdrawal', amount: 200, status: 'pending', timestamp: '2024-01-12T18:45:00Z', description: 'Withdrawal to bank account', txHash: '0xabc...jkl' },
        { id: '5', type: 'bet_lost', amount: 50, status: 'completed', timestamp: '2024-01-11T12:00:00Z', description: 'Lost bet on market crash', txHash: '0xdef...mno' },
    ];

    const betHistory: Bet[] = [
        { id: '1', marketTitle: 'Will Ethereum reach $5,000 by end of 2024?', prediction: 'Yes', amount: 100, outcome: 'won', profit: 150, timestamp: '2024-01-14T15:20:00Z' },
        { id: '2', marketTitle: 'BTC price above $50,000 in Q1 2024', prediction: 'No', amount: 200, outcome: 'lost', profit: -200, timestamp: '2024-01-13T10:00:00Z' },
        { id: '3', marketTitle: 'Federal Reserve rate decision', prediction: 'Hike', amount: 50, outcome: 'won', profit: 75, timestamp: '2024-01-12T08:30:00Z' },
        { id: '4', marketTitle: 'Apple stock reaches $200', prediction: 'Yes', amount: 75, outcome: 'pending', profit: 0, timestamp: '2024-01-11T16:45:00Z' },
    ];

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

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

    const getOutcomeIcon = (outcome: Bet['outcome']) => {
        switch (outcome) {
            case 'won': return <CheckCircle className="w-4 h-4 text-green-400" />;
            case 'lost': return <XCircle className="w-4 h-4 text-red-400" />;
            case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Account Settings</h1>
                            <p className="text-sm text-gray-400">Manage your wallet and betting history</p>
                        </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <LogOut className="w-5 h-5 text-gray-400 hover:text-red-400 transition-colors" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('wallet')}
                        className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'wallet'
                            ? 'border-blue-500 text-white'
                            : 'border-transparent text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        <Wallet className="w-4 h-4 inline mr-2" />
                        Wallet
                    </button>
                    <button
                        onClick={() => setActiveTab('bets')}
                        className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'bets'
                            ? 'border-blue-500 text-white'
                            : 'border-transparent text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        <History className="w-4 h-4 inline mr-2" />
                        Bet History
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'settings'
                            ? 'border-blue-500 text-white'
                            : 'border-transparent text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        <Settings className="w-4 h-4 inline mr-2" />
                        Settings
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'wallet' && (
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
                                {transactions.map((tx) => (
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
                                            <p className={`text-sm font-semibold ${tx.type === 'deposit' || tx.type === 'bet_won'
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
                )}

                {activeTab === 'bets' && (
                    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Bet History</h3>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-400">Total Bets: <span className="text-white font-medium">{walletData.totalBets}</span></span>
                                <span className="text-gray-400">Won: <span className="text-green-400 font-medium">{walletData.wonBets}</span></span>
                                <span className="text-gray-400">Lost: <span className="text-red-400 font-medium">{walletData.lostBets}</span></span>
                            </div>
                        </div>

                        <div className="space-y-3">
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
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Settings */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-400" />
                                Profile
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                                    <input
                                        type="text"
                                        value="Hibiki Shibata"
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value="hibiki@example.com"
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    Update Profile
                                </button>
                            </div>
                        </div>

                        {/* Security Settings */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-purple-400" />
                                Security
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                                    Change Password
                                </button>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-yellow-400" />
                                Notifications
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Market Updates</span>
                                    <div className="relative inline-block w-10 h-5 bg-white/10 rounded-full">
                                        <input type="checkbox" className="absolute w-full h-full opacity-0 cursor-pointer peer" defaultChecked />
                                        <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-gray-400 rounded-full transition-transform peer-checked:translate-x-5 peer-checked:bg-blue-500" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Bet Confirmations</span>
                                    <div className="relative inline-block w-10 h-5 bg-white/10 rounded-full">
                                        <input type="checkbox" className="absolute w-full h-full opacity-0 cursor-pointer peer" defaultChecked />
                                        <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-gray-400 rounded-full transition-transform peer-checked:translate-x-5 peer-checked:bg-blue-500" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Weekly Reports</span>
                                    <div className="relative inline-block w-10 h-5 bg-white/10 rounded-full">
                                        <input type="checkbox" className="absolute w-full h-full opacity-0 cursor-pointer peer" />
                                        <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-gray-400 rounded-full transition-transform peer-checked:translate-x-5 peer-checked:bg-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Wallet Settings */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-green-400" />
                                Payment Methods
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-white">Bank Account</p>
                                        <p className="text-xs text-gray-400">•••• 6789</p>
                                    </div>
                                    <span className="text-xs text-green-400">Verified</span>
                                </div>
                                <button className="w-full px-4 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors">
                                    Add Payment Method
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}