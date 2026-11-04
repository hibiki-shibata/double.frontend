import { Users } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../../../common/lib/auth/context/AuthContext";
import { LoadingState } from "../../../../common/components/StatusState";

export function NavSigninCard() {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
    return (
        <div className="text-center py-4">
            {isAuthLoading && (
                <LoadingState message='Loading..' />
            )}
            {isAuthenticated && !isAuthLoading && (
                <>
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Join the Prediction</h3>
                    <p className="text-sm text-gray-400 mb-6">Sign in to bet on this market and start earning rewards</p>
                    <Link
                        to="/auth"
                        className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity  active:opacity-80"
                    >
                        Sign in to bet
                    </Link>
                    <p className="text-xs text-gray-500 mt-3">
                        Don't have an account?{' '}
                        <Link
                            to="/auth?isSignup=TRUE"
                            className="text-blue-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </>
            )}
        </div>
    )
}