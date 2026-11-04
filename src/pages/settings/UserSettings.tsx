// pages/AccountSettings.tsx
import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Wallet, History, Settings, LogOut } from 'lucide-react';

import { WalletTab, type Transaction } from './wallet/page';
import { BetHistoryTab, type Bet } from './betHistory/page';
import { SettingsTab } from './setting/page';

export function AccountSettings() {
    const [activeTab, setActiveTab] = useState<'wallet' | 'bets' | 'settings'>('wallet');

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
                    <WalletTab
                        walletData={walletData}
                        transactions={transactions}
                        formatDate={formatDate}
                    />
                )}

                {activeTab === 'bets' && (
                    <BetHistoryTab
                        betHistory={betHistory}
                        totalBets={walletData.totalBets}
                        wonBets={walletData.wonBets}
                        lostBets={walletData.lostBets}
                        formatDate={formatDate}
                    />
                )}

                {activeTab === 'settings' && <SettingsTab />}
            </div>
        </div>
    );
}