import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-surface-dark/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xl font-bold">
              C
            </div>
            <span className="text-xl font-bold gradient-text">Codex Lingua</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/terms" className="nav-link text-brand-400">Terms</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-slate-400 mb-8">Last updated: March 2026</p>

          <div className="glass-card p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-300 leading-relaxed">
                By accessing and using Codex Lingua, you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
              <p className="text-slate-300 leading-relaxed">
                Permission is granted to temporarily use Codex Lingua for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. User Account</h2>
              <p className="text-slate-300 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Subscription & Payments</h2>
              <p className="text-slate-300 leading-relaxed">
                Subscription fees are billed on a recurring basis. You can cancel your subscription at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-slate-300 leading-relaxed">
                All content, features, and functionality of Codex Lingua are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-slate-300 leading-relaxed">
                In no event shall Codex Lingua be liable for any indirect, incidental, special, consequential or punitive damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have any questions about these Terms, please contact us at legal@codexlingua.com
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}