// pages/Privacy.tsx
import { Shield, Lock, Eye, Database, Mail, CheckCircle } from 'lucide-react';

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-white/5 to-white/10  rounded-2xl border border-white/10 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-blue-500/20">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" />
              Information We Collect
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              We collect information you provide directly, such as when you create an account, 
              place bets, or communicate with us. This may include:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Email address and account credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Betting history and transaction data</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Device and usage information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Communication preferences</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              How We Use Your Information
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Process and manage your bets and transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Provide customer support and respond to inquiries</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Improve our platform and user experience</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Comply with legal and regulatory requirements</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-400" />
              Data Security
            </h2>
            <p className="text-sm leading-relaxed">
              We implement industry-standard security measures to protect your data, 
              including encryption, access controls, and regular security audits. 
              We never sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-400" />
              Your Rights
            </h2>
            <ul className="space-y-2 text-sm">
              <li>• Access and update your personal information</li>
              <li>• Request deletion of your account and data</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Data portability (export your data)</li>
            </ul>
            <p className="mt-3 text-sm text-gray-400">
              Contact us at <a href="mailto:privacy@double.market" className="text-blue-400 hover:underline">privacy@double.market</a> 
              to exercise these rights.
            </p>
          </section>

          <section className="border-t border-white/10 pt-6">
            <p className="text-xs text-gray-500">
              We may update this policy from time to time. We'll notify you of any changes 
              by posting the new policy on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}