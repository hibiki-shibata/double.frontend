// pages/Terms.tsx
import {
    Scale, Shield, AlertTriangle,
    CheckCircle, Users, DollarSign, Clock,
    Gavel, Mail, BookOpen
} from 'lucide-react';

export function Terms() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-purple-500/20">
                        <Scale className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
                        <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-400" />
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-sm leading-relaxed">
                            By using Doubl platform, you agree to these terms. We may update these terms occasionally - changes will
                            be posted on this page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-400" />
                            2. Eligibility
                        </h2>
                        <ul className="flex space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Anyone on the planet</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-yellow-400" />
                            3. Accountability
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>You're responsible for maintaining account security & asset control</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <Gavel className="w-5 h-5 text-purple-400" />
                            4. Fair Use and Conduct
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li>• Don't manipulate or exploit the platform</li>
                            <li>• Don't harass, abuse other users</li>
                            <li>• Don't use bots or automated tools</li>
                            <li>• Don't engage in any harmfull activity</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-400" />
                            5. Market Resolution
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>Markets resolve according to predetermined criteria</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <span>We may delay resolution for verification</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-400" />
                            6. Liability and Disclaimers
                        </h2>
                        <div className="space-y-2 text-sm bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                            <p className="font-medium text-red-400">Important Limitations:</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>We're not liable for losses from using the platform</li>
                                <li>We may suspend service for maintenance or emergencies</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            7. Termination
                        </h2>
                        <p className="text-sm leading-relaxed">
                            We may suspend or terminate your account for violating these terms,
                            engaging in fraudulent activity, or for any other reason at our discretion.
                            You may also close your account at any time.
                        </p>
                    </section>

                    <section className="border-t border-white/10 pt-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>Questions? Contact us at <a href="https://hibiki-shibata.github.io/" className="text-blue-400 hover:underline">Maintainer portal</a></span>
                            </div>
                            <span>© {new Date().getFullYear()} Double Market</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}