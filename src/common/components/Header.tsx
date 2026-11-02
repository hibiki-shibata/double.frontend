import { History, LogOut, SettingsIcon, User, Wallet, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../features/auth/contexts/AuthContext';

type MenuItems = {
    Icon?: LucideIcon,
    label: string,
    href: string
}

const accountMenuItems: MenuItems[] = [
    { Icon: User, label: "Profile", href: "/settings" },
    { Icon: Wallet, label: "Wallet", href: "/settings" },
    { Icon: History, label: "History", href: "/settings" },
    { Icon: SettingsIcon, label: "Settings", href: "/settings" },
]

const menuItems: MenuItems[] = [
    { label: "Market", href: "/" },
    { label: "About", href: "/about" },
]

export function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            setIsDropdownOpen(false);
            setIsMobileMenuOpen(false);
            navigate('/auth');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <header className='sticky top-0 z-50 border-b border-white/10 bg-slate-900'>
            <div className='px-4 sm:px-6 lg:px-30'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white'>D</div>
                        <h1 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                            <a href='/'>Double</a>
                        </h1>
                    </div>

                    {/* Desktop Center Navigation */}
                    <nav className='hidden md:flex items-center gap-6'>
                        {menuItems.map((item: MenuItems) => (
                            <a key={item.href} href={item.href} className='text-sm text-gray-300 hover:text-white transition-colors'>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        {(isAuthenticated && user) ? (
                            <>
                                {/* Desktop User Menu */}
                                <div className="hidden sm:relative sm:flex sm:items-center">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-medium text-white">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
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
                                                <p className="text-sm font-medium text-white">{user.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                            </div>
                                            {accountMenuItems.map((item: MenuItems) => (
                                                <a 
                                                    key={item.href} 
                                                    href={item.href}
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <div className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                                        {item.Icon && <item.Icon className="w-4 h-4" />}
                                                        {item.label}
                                                    </div>
                                                </a>
                                            ))}

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-white/10 cursor-pointer"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile User Icon Toggle */}
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="sm:hidden p-2 rounded-lg transition-colors cursor-pointer"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-medium text-white">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </button>
                            </>
                        ) : (
                            // Auth Buttons (Logged Out)
                            <div className="flex items-center gap-3">
                                <a 
                                    href='/auth'
                                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 hover:scale-105"
                                >
                                    Sign In
                                </a>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 cursor-pointer"
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
                            <a 
                                key={item.href}
                                href={item.href} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        {isAuthenticated && (
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}