import { Shield } from "lucide-react";

export function SecuritySettings() {
    return (
        <>
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
        </>
    )
}