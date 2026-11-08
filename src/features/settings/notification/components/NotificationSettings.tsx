import { Bell } from "lucide-react";

export function NotificationSettings() {
    return (
        <>
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
        </>
    )
}