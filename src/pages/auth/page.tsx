// pages/Auth.tsx
import { useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router';
import { GoogleLogin } from '../../features/auth/components/GoogleLogin';
import { UsernameAndPassword } from '../../features/auth/components/UsernameAndPassword';
import { useAuth } from '../../common/lib/auth/context/AuthContext';
import { ROUTES } from '../../common/config/routes';


export function Auth() {

  // Redirect to Maket list when user already logged-in
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to={ROUTES.MARKET_LIST} />

  // Display signin page at initialization
  const [searchParams] = useSearchParams()
  const [isSignupMode, setIsSignupMode] = useState<boolean>(() => {
    return searchParams.get("isSignup")?.toLowerCase() === 'true'
  })

  const changeAuthMode = () => setIsSignupMode(!isSignupMode)


  return (
    <div className="min-h-screen flex items-center justify-center px-0 py-12 bg-slate-900">
      <div className="w-full max-w-md">
        {/* Auth Page Headlines */}
        <div className="text-center mb-8">
          <div className="items-center justify-center w-30 h-15 mx-auto h-auto rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl mb-3">
            Double
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isSignupMode ? 'Create account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {isSignupMode ? 'Start trading today' : 'Sign in to continue'}
          </p>
        </div>

        {/* Google Login Button */}
        <GoogleLogin />

        {/* Divider between SSO and UsernameAndPassword */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <UsernameAndPassword isSignupMode={isSignupMode} />

        {/* Toggle mode */}
        <p className="text-center text-sm text-gray-400 mt-6">
          {isSignupMode ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={changeAuthMode}
            className="ml-1 text-blue-400 hover:underline font-medium"
          >
            {isSignupMode ? 'Log in' : 'Sign up'}
          </button>
        </p>

        {/* Back to markets */}
        <Link to="/" className="block text-center text-sm text-gray-500 hover:text-gray-300 transition-colors mt-4">
          ← Back to markets
        </Link>
      </div>
    </div>
  );
}