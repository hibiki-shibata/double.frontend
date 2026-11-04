// components/SettingsTab.tsx
import { User, Shield, Bell, CreditCard } from 'lucide-react';

export function SettingsTab() {
    return (
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
                            defaultValue="Hibiki Shibata"
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            defaultValue="hibiki@example.com"
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
    );
}