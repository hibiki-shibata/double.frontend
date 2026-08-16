// components/Footer.tsx
import { MapPin, Coffee } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900/50 mx-auto ">
            <div className="px-4 max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-sm text-gray-400 hover:text-white">
                                    Markets
                                </a>
                            </li>
                            <li>
                                <a href="https://hibiki-shibata.github.io/" target='_blank' className="text-sm text-gray-400 hover:text-white">
                                    Service Owner Profile
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                <p className="text-sm mt-7 text-gray-400">
                    Hi! I'm Hibiki, maintainer of Double! I'm always welcome your contribution on the development.
                    Feel free to reach out to me:)
                </p>

                {/* Bottom Bar */}
                <div className="mt-2 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>© {currentYear} Hibiki</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Japan
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                            <Coffee className="w-3 h-3" />
                            Open Source
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <a href="/privacy" className="hover:text-gray-300 transition-colors">
                            Privacy
                        </a>
                        <a href="/terms" className="hover:text-gray-300 transition-colors">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}