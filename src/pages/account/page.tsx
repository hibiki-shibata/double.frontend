import { useState, type ReactElement } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Wallet, History, Settings, LogOut } from 'lucide-react';
import { WalletTab } from '../../features/wallet/components/page';
import { BetHistoryTab } from '../../features/betHistory/components/page';
import { SettingsTab } from '../../features/settings/settingsTab';
import { ROUTES } from '../../common/config/routes';
import { useAuth } from '../../common/lib/auth/context/AuthContext';

enum TabTypes { Wallet, BetHistory, Settings, }

const tabs: { 'tabType': TabTypes, 'title': string, 'icon': ReactElement, 'content': ReactElement }[] = [
    { 'tabType': TabTypes.Wallet, 'title': 'Wallet', 'icon': <Wallet className="w-4 h-4" />, 'content': <WalletTab /> },
    { 'tabType': TabTypes.BetHistory, 'title': 'Bet History', 'icon': <History className="w-4 h-4" />, 'content': <BetHistoryTab /> },
    { 'tabType': TabTypes.Settings, 'title': 'Settings', 'icon': <Settings className="w-4 h-4" />, 'content': <SettingsTab /> },
]

export function Account() {
    const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.Wallet);
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Headline */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            to={ROUTES.MARKET_LIST}
                            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                            aria-label="Back to markets"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Manage Account</h1>
                            <p className="text-sm text-gray-400">Manage your wallet, bets and account</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-red-400"
                        title="Log out"
                    >
                        <LogOut className="w-5 h-5 transition-colors" />
                    </button>
                </div>


                {/* Tabs Navigation */}
                <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            onClick={() => setActiveTab(tab.tabType)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.tabType
                                ? 'border-blue-500 text-white'
                                : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            {tab.icon}
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* Active Tab Content Panel */}
                {(tabs.find((tab) => tab.tabType === activeTab))?.content}
            </div>
        </div>
    );
}