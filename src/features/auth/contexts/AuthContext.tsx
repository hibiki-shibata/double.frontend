import { createContext, useContext, useState, useEffect, type ReactNode, } from 'react';
import type { User } from '../types/user.type';
import type { AccessToken } from '../types/token.type';
import type { AuthCredential } from '../types/credential.type';
import { useLogin, useLogout, useRefreshToken, useSignup } from '../hooks/authHook';
import { useUser } from '../hooks/userHook';

type AuthContextType = {
    user: User | null;
    accessToken: string | null;
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
    const [accessToken, setAccessToken] = useState<string | null>(null)

    // Mutations to handle auth reqs
    const { login, isLoading: isLoginLoading } = useLogin()
    const { signup, isLoading: isSignupLoading } = useSignup()
    const { logout, isLoading: isLogoutLoading } = useLogout()
    const { refreshToken, isLoading: isRefreshTokenLoading } = useRefreshToken()
    const { fetchUser, isLoading: isUserLoading } = useUser()

    function clearAuthState() {
        setUser(null)
        setAccessToken(null)
    }

    useEffect(() => {
        handleRefreshToken() // Refresh Token every time 
    }, [])


    async function handleLogin(loginCredential: AuthCredential) {
        try {
            const res: AccessToken = await login(loginCredential)
            setAccessToken(res.accessToken)
            setUser(await fetchUser())
        } catch {
            clearAuthState()
            alert("Failed to login")
        }
    }

    async function handleSignup(signupCredential: AuthCredential) {
        try {
            const res: AccessToken = await signup(signupCredential)
            setAccessToken(res.accessToken)
            setUser(await fetchUser())
        } catch {
            clearAuthState()
            alert("Failed to Signup")
        }
    }

    async function handleRefreshToken() {
        try {
            const res: AccessToken = await refreshToken()
            setAccessToken(res.accessToken)
            setUser(await fetchUser())
        } catch {
            clearAuthState()
            console.error("Failed to refresh token")
        }
    }

    async function handleLogout() {
        try {
            await logout()
            setAccessToken(null)
            setUser(null)
        } catch {
            clearAuthState()
            alert("Failed to Logout")
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                accessToken: accessToken,
                isAuthenticated: Boolean(user && accessToken),
                isLoading: (isLoginLoading || isSignupLoading || isLogoutLoading || isRefreshTokenLoading || (Boolean(accessToken) && isUserLoading)),
                login: handleLogin,
                signup: handleSignup,
                logout: handleLogout,
                refreshToken: handleRefreshToken
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




// // Provider to inject
// export function AuthProvider({ children }: { children: ReactNode }) {
//     const [accessToken, setAccessToken] = useState<string | null>(null)
//     const queryClient = useQueryClient();

//     const { login, isLoading: isLoginLoading } = useLogin();
//     const { signup, isLoading: isSignupLoading } = useSignup();
//     const { logout, isLoading: isLogoutLoading } = useLogout();
//     const { refreshToken, isLoading: isRefreshTokenLoading } = useRefreshToken();

//     // Industrial standard: UseQuery for fetching and caching the user profile
//     const { data: user, isLoading: isUserLoading, error: userError } = useUser()

//     // Auto-relogin
//     useEffect(() => {
//         async function initializeAuth() {
//             try {
//                 const res = await refreshToken();
//                 if (!res?.accessToken) throw new Error('No access token returned');

//                 setAccessToken(res.accessToken)
//             } catch {
//                 setAccessToken(null)
//             }
//         }
//         initializeAuth()
//     }, []);

//     // Clean logout routine that clears tokens and invalidates user cache
//     const handleLogout = async () => {
//         await logout()
//         setAccessToken(null)
//         await queryClient.setQueryData(['user', 'me'], null)
//         queryClient.removeQueries({ queryKey: ['user', 'me'] })
//     };

//     // If a token refresh fails or user fetch fails with unauthorized, wipe token
//     useEffect(() => {
//         if (userError) setAccessToken(null);
//     }, [userError]);

//     const value = {
//         user: user ?? null,
//         accessToken,
//         isAuthenticated: Boolean(accessToken && user),
//         isLoading: isInitializing || isRefreshTokenLoading || (Boolean(accessToken) && isUserLoading) || isLoginLoading || isSignupLoading || isLogoutLoading,
//         login,
//         signup,
//         logout: handleLogout,
//         refreshToken,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export function useAuth() {
//     const context = useContext(AuthContext);
//     if (!context) throw new Error('useAuth must be used within an AuthProvider');
//     return context;
// };