import { User } from "lucide-react";
import { useAuth } from "../../../../common/lib/auth/context/AuthContext";

export function ProfileSettings() {
    const { user } = useAuth()
    return (
        <>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-400" />
                Profile
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                    <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input
                        type="email"
                        defaultValue={user?.emailAddress}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Update Profile
                </button>
            </div>
        </>
    )
}