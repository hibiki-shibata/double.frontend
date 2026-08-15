import { useState } from 'react';

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className='sticky top-0 z-50 border-b border-white/10 bg-slate-900'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm'>
                            D
                        </div>
                        <h1 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                            <a href='/'>
                                Double
                            </a>
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center gap-6'>
                        <a href="/" className='text-sm text-gray-300 hover:text-white transition-colors'>
                            Markets
                        </a>
                        <a href="/about" className='text-sm text-gray-300 hover:text-white transition-colors'>
                            About
                        </a>
                    </nav>

                    {/* Auth Buttons */}
                    <div className='flex items-center gap-3'>
                        <button className='hidden sm:inline-block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors'>
                            <a href='auth'>Log in</a>
                        </button>
                        <button className='px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 hover:scale-105'>
                            <a href='auth'>Sign up</a>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors'
                            aria-label="Toggle menu"
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
                    <div className='md:hidden py-4 border-t border-white/10 space-y-3'>
                        <a href="#" className='block px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors'>
                            Markets
                        </a>
                        <a href="#" className='block px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors'>
                            Portfolio
                        </a>
                        <a href="#" className='block px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors'>
                            About
                        </a>
                        <div className='pt-3 border-t border-white/10 flex flex-col gap-2'>
                            <button className='w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors'>
                                Log in
                            </button>
                            <button className='w-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg'>
                                Sign up
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}