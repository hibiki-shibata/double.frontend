import { createContext, useContext, useState, useEffect, type ReactNode, } from 'react';
import type { User } from '../types/user.type';
import type { AccessToken } from '../types/token.type';
import type { LoginCredential } from '../types/login.type';

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredential) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Provider to inject
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    // const [isInitialLoading, setIsInitialLoading] = useState(true)

    // Restore session on initial load (e.g., checking silently refreshed cookie or storage)
    // useEffect(() => {
    //     const storedAccessTOken = localStorage.getItem('access_token');
    //     const storedUser = localStorage.getItem('auth_user');

    //     if (storedToken && storedUser) {
    //         setAccessToken(storedToken);
    //         setUser(JSON.parse(storedUser));
    //     }
    //     setIsInitialLoading(false);
    // }, [])

    async function login(crdential: LoginCredential): Promise<void> {
        // 1. Fetch access token
        // 2. Fetch user data
        // 3. set access token
        // 4. setUser(data.user)
        // setAccessToken()
    }

    async function logout(): Promise<void> {
        setUser(null);
        setAccessToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                accessToken: accessToken,
                isAuthenticated: Boolean(user),
                login: login,
                logout: logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// To read the injected providerƒ
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}