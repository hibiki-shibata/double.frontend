import { createContext, useContext, useState, useEffect, type ReactNode, } from 'react';
import type { User } from '../types/user.type';
import type { AccessToken } from '../types/token.type';
import type { AuthCredential } from '../types/credential.type';
import { useLogin, useLogout, useRefreshToken, useSignup } from '../hooks/authHook';
import { useUser } from '../hooks/userHook';
import { authTokenStore } from '../authTokenStore';

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean
    isLoading: boolean
    login: (credentials: AuthCredential) => Promise<void>
    signup: (credentials: AuthCredential) => Promise<void>
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isInitialLoading, setIsInitialLoading] = useState(true)

    // Mutations to handle auth reqs
    const { reqLogin, isLoading: isLoginLoading } = useLogin()
    const { reqSignup, isLoading: isSignupLoading } = useSignup()
    const { reqLogout, isLoading: isLogoutLoading } = useLogout()
    const { reqRefreshToken, isLoading: isRefreshTokenLoading } = useRefreshToken()
    const { fetchUser, isLoading: isUserLoading } = useUser()

    const setAuthState = async (accessToken: string) => {
        authTokenStore.setAccessToken(accessToken)
        setUser(await fetchUser())
    }

    const clearAuthState = () => {
        authTokenStore.clear()
        setUser(null)
    }

    useEffect(() => {
        async function initAuth() {
            try {
                const res: AccessToken = await reqRefreshToken()
                await setAuthState(res.accessToken)
            } catch {
                clearAuthState()
                console.error("Failed to refresh token on init")
            } finally {
                setIsInitialLoading(false) // ✅ Ensure loading is marked done regardless of success/fail
            }
        }

        initAuth()
    }, [])


    async function login(loginCredential: AuthCredential) {
        try {
            const res: AccessToken = await reqLogin(loginCredential)
            await setAuthState(res.accessToken)
        } catch {
            clearAuthState()
            alert("Failed to login")
        }
    }

    async function signup(signupCredential: AuthCredential) {
        try {
            const res: AccessToken = await reqSignup(signupCredential)
            await setAuthState(res.accessToken)
        } catch {
            clearAuthState()
            alert("Failed to Signup")
        }
    }

    async function refreshToken() {
        try {
            const res: AccessToken = await reqRefreshToken()
            await setAuthState(res.accessToken)
        } catch {
            clearAuthState()
            console.error("Failed to refresh token")
        }
    }

    async function logout() {
        try {
            await reqLogout()
            clearAuthState()
        } catch {
            alert("Failed to Logout")
        }
    }


    return (
        <AuthContext.Provider
            value={{
                user: user,
                isAuthenticated: Boolean(user),
                isLoading: isInitialLoading || isLoginLoading || isSignupLoading || isLogoutLoading || isRefreshTokenLoading || (!user && isUserLoading),
                login: login,
                signup: signup,
                logout: logout,
                refreshToken: refreshToken
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Auth context hook
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}