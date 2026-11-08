import { CreditCard } from "lucide-react";

export function WalletSettings() {
    return (
        <>
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
        </>
    )
}