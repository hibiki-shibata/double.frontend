import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Wallet, History, Settings, LogOut } from 'lucide-react';
import { WalletTab, type Transaction } from './wallet/page';
import { BetHistoryTab } from './betHistory/page';
import { SettingsTab } from './setting/page';
import { ROUTES } from '../../common/config/routes';
import { useBetHistory } from '../../features/betHistory/hooks/betHook';
import { formatDate } from '../../common/lib/formatDate';
import { useAuth } from '../../common/lib/auth/context/AuthContext';

enum TabTypes {
    Wallet,
    Bets,
    Settings
}

interface TabConfig {
    type: TabTypes;
    title: string;
    icon: ReactNode;
    content: ReactNode;
}

export function AccountSettings() {
    const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.Wallet)
    const { logout } = useAuth()

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

    const { data: betHistory } = useBetHistory({ page: 0, limit: 2 });

    const settingTabs: TabConfig[] = [
        {
            type: TabTypes.Wallet,
            title: 'Wallet',
            icon: <Wallet className="w-4 h-4 inline mr-2" />,
            content: (
                <WalletTab
                    walletData={walletData}
                    transactions={transactions}
                    formatDate={formatDate}
                />
            )
        },
        {
            type: TabTypes.Bets,
            title: 'Bet History',
            icon: <History className="w-4 h-4 inline mr-2" />,
            content: (
                <BetHistoryTab
                    betHistory={betHistory}
                    totalBets={walletData.totalBets}
                    wonBets={walletData.wonBets}
                    lostBets={walletData.lostBets}
                    formatDate={formatDate}
                />
            )
        },
        {
            type: TabTypes.Settings,
            title: 'Settings',
            icon: <Settings className="w-4 h-4 inline mr-2" />,
            content: <SettingsTab />
        }
    ];

    const activeTabContent = settingTabs.find((tab) => tab.type === activeTab)?.content;

    return (
        <div className="min-h-screen bg-slate-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Headline */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to={ROUTES.MARKET_LIST} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Manage Account</h1>
                            <p className="text-sm text-gray-400">Manage your wallet and betting history</p>
                        </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <LogOut
                            onClick={logout}
                            className="w-5 h-5 text-gray-400 hover:text-red-400 transition-colors"
                        />
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex gap-2 mb-8 border-b border-white/10">
                    {settingTabs.map((tab) => (
                        <button
                            key={tab.type}
                            onClick={() => setActiveTab(tab.type)}
                            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.type
                                ? 'border-blue-500 text-white'
                                : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            {tab.icon}
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* Contents */}
                <div>
                    {activeTabContent}
                </div>
            </div>
        </div>
    );
}