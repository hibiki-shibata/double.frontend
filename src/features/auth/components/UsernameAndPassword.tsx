import { useState } from "react"
import { Link } from "react-router"
import { useAuth } from "../contexts/AuthContext"

type Props = { isSignupMode: boolean }

export function UsernameAndPassword({ isSignupMode }: Props) {
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useAuth()

    return (
        <form className="space-y-4" onSubmit={(e) =>
            e.preventDefault()
        }>
            {isSignupMode && (
                <div>
                    <label className="block text-sm text-gray-300 mb-1">Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                    />
                </div>
            )}

            <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                />
            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-1">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                        {showPassword ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {isSignupMode && (
                <div>
                    <label className="block text-sm text-gray-300 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                    />
                </div>
            )}

            {!isSignupMode && (
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                        <input type="checkbox" className="rounded border-white/10 bg-white/5 text-blue-500" />
                        Remember me
                    </label>
                    <a href="#" className="text-blue-400 hover:underline">Forgot password?</a>
                </div>
            )}

            {isSignupMode && (
                <div className="flex items-start gap-2 text-sm">
                    <input type="checkbox" className="mt-0.5 rounded border-white/10 bg-white/5 text-blue-500" />
                    <span className="text-gray-400">
                        I agree to the
                        <Link to="/terms" className="text-blue-400 hover:underline"> Terms</Link> and <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
                    </span>
                </div>
            )}

            <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
                {isSignupMode ? 'Create account' : 'Sign in'}
            </button>
        </form>
    )
}