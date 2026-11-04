import { History, LogOut, SettingsIcon, User, Wallet, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../lib/auth/context/AuthContext';
import { ROUTES } from '../config/routes';
import { LoadingState } from './StatusState';

type MenuItems = {
    Icon?: LucideIcon,
    label: string,
    route: string
}

const accountMenuItems: MenuItems[] = [
    { Icon: User, label: "Profile", route: ROUTES.SETTINGS },
    { Icon: Wallet, label: "Wallet", route: ROUTES.SETTINGS },
    { Icon: History, label: "History", route: ROUTES.SETTINGS },
    { Icon: SettingsIcon, label: "Settingsss", route: ROUTES.SETTINGS },
]

const menuItems: MenuItems[] = [
    { label: "Market", route: ROUTES.MARKET_LIST },
    { label: "About", route: ROUTES.ABOUT },
]


export function Header() {
    const { user, isAuthenticated, isLoading: isAuthLoading, logout } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <header className='sticky top-0 z-50 border-b border-white/10 bg-slate-900'>
            <div className=' px-4 sm:px-6 lg:px-30'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <Link to={ROUTES.MARKET_LIST}>
                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold'>D</div>
                            <h1 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                                Double
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Center Navigation */}
                    <nav className='hidden md:flex items-center gap-6'>
                        {menuItems.map((item: MenuItems) => (
                            <Link to={item.route} className='text-sm text-gray-300 hover:text-white transition-colors'>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Authenticated case */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated && user && !isAuthLoading && (
                            <>
                                {/* Desktop User Menu */}
                                <div className="hidden sm:relative sm:flex sm:items-center">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-medium text-white">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="text-sm text-gray-300">Account</span>
                                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-slate-800 rounded-xl border border-white/10 shadow-xl py-1 z-50">
                                            <div className="px-4 py-3 border-b border-white/10">
                                                <p className="text-sm font-medium text-white">Hibiki Shibata</p>
                                                <p className="text-xs text-gray-400">hibiki@example.com</p>
                                            </div>
                                            {accountMenuItems.map((item: MenuItems) => (
                                                <Link to={item.route}>
                                                    <div
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                                    >
                                                        {item.Icon && <item.Icon className="w-4 h-4" />}
                                                        {item.label}
                                                    </div>
                                                </Link>
                                            ))
                                            }

                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-white/10"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile User Icon */}
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="sm:hidden p-2 rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-medium text-white">
                                        {user.name.charAt(0)}
                                    </div>
                                </button>
                            </>
                        )}

                        {isAuthLoading && (
                            <LoadingState message="Loading.." />
                        )}


                        {/* UnAuthenticated case */}
                        {!isAuthenticated && !user && !isAuthLoading && (
                            // Auth Buttons (Logged Out)
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                    <Link to='/auth'>Log In</Link>
                                </div>
                                <div className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 hover:scale-105">
                                    <Link to='/auth?isSignup=TRUE'>Sign Up</Link>
                                </div>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/10 space-y-3">
                        {menuItems.map((item: MenuItems) => (
                            <Link to={item.route} onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <button
                                onClick={() => {
                                    logout()
                                    setIsMobileMenuOpen(false)
                                }}
                                className="block w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                )}
            </div>
        </header >
    );
}