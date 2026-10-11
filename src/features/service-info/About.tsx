// pages/About.tsx
import {
    Rocket, TrendingUp, Shield, Zap,
    Users, Award, Sparkles, Target,
    CheckCircle,
} from 'lucide-react';

export function About() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-white/5 to-white/10  rounded-2xl border border-white/10 p-8 text-center">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl shadow-blue-500/20 mb-4">
                    <Rocket className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">About Double</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Currently a free Prediction Market Platform where people can trade on the imminent future
                    events. But we're promising to be a democratized Financial Super Platform for people!
                </p>
            </div>

            {/* Mission */}
            <div className="bg-white/5  rounded-2xl border border-white/10 p-8">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    Mission
                </h2>
                <p className="text-gray-300 leading-relaxed">
                    Democratize our Finance in 100% open source, the highest security at the lowest costs, by your hands!
                    <br></br>
                    {/* Let's end the era of centric instituion keep taking advantage of us ! */}
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5  rounded-2xl border border-white/10 p-6">
                    <div className="p-2 rounded-lg bg-blue-500/20 w-fit mb-3">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Transparency</h3>
                    <p className="text-sm text-gray-400">
                        Designed to be transparent, which is a key for democratized Finance platform.
                    </p>
                </div>

                <div className="bg-white/5  rounded-2xl border border-white/10 p-6">
                    <div className="p-2 rounded-lg bg-green-500/20 w-fit mb-3">
                        <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Highest Security</h3>
                    <p className="text-sm text-gray-400">
                        Security is priotized more than anything to protect our Financial democracy.
                    </p>
                </div>

                <div className="bg-white/5  rounded-2xl border border-white/10 p-6">
                    <div className="p-2 rounded-lg bg-purple-500/20 w-fit mb-3">
                        <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Democracy</h3>
                    <p className="text-sm text-gray-400">
                        We want every single of you to join us protecting the platform!
                        Ideas, Ops, Security, Dev anything to make it better.
                    </p>
                </div>

                <div className="bg-white/5  rounded-2xl border border-white/10 p-6">
                    <div className="p-2 rounded-lg bg-yellow-500/20 w-fit mb-3">
                        <Award className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Benefits</h3>
                    <p className="text-sm text-gray-400">
                        Designed to be benefitial for everyone equally. NOT like classic Finance where centric instituion take our advantages.
                    </p>
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-white/5  rounded-2xl border border-white/10 p-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    How It Works
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3 text-blue-400 font-bold text-lg">
                            1
                        </div>
                        <p className="font-medium text-white text-sm">Browse Markets</p>
                        <p className="text-xs text-gray-400 mt-1">Explore active prediction markets</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3 text-purple-400 font-bold text-lg">
                            2
                        </div>
                        <p className="font-medium text-white text-sm">Place Your Bet</p>
                        <p className="text-xs text-gray-400 mt-1">Choose your position and stake</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3 text-green-400 font-bold text-lg">
                            3
                        </div>
                        <p className="font-medium text-white text-sm">Earn Rewards</p>
                        <p className="text-xs text-gray-400 mt-1">Get paid if your prediction is correct</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5  rounded-2xl border border-white/10 p-6 text-center">
                    <p className="text-2xl font-bold text-blue-400">collecting data..</p>
                    <p className="text-xs text-gray-400 mt-1">Total Volume</p>
                </div>
                <div className="bg-white/5  rounded-2xl border border-white/10 p-6 text-center">
                    <p className="text-2xl font-bold text-purple-400">collecting data..</p>
                    <p className="text-xs text-gray-400 mt-1">Active User</p>
                </div>
                <div className="bg-white/5  rounded-2xl border border-white/10 p-6 text-center">
                    <p className="text-2xl font-bold text-green-400">99.8%</p>
                    <p className="text-xs text-gray-400 mt-1">Uptime</p>
                </div>
                <div className="bg-white/5  rounded-2xl border border-white/10 p-6 text-center">
                    <p className="text-2xl font-bold text-yellow-400">2.5s</p>
                    <p className="text-xs text-gray-400 mt-1">Avg. Trade Speed</p>
                </div>
            </div>

            {/* Why Choose Us */}
            {/* <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10  rounded-2xl border border-white/10 p-8">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Why Choose Double Market?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Low fees and transparent pricing</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Instant deposits and withdrawals</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">24/7 support</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Simple interface</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Trends analysis</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Variety of prediction topics</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
}