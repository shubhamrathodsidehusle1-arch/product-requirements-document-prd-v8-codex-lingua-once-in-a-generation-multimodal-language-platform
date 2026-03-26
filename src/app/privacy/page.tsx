import Link from "next/link";

export default function PrivacyPage() {
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
            <Link href="/privacy" className="nav-link text-brand-400">Privacy</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-slate-400 mb-8">Last updated: March 2026</p>

          <div className="glass-card p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-slate-300 leading-relaxed">
                We collect information you provide directly to us, including your name, email, and learning preferences. We also collect usage data to improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-300 leading-relaxed">
                We use your information to provide, maintain, and improve our services, to communicate with you about your learning progress, and to personalize your experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. Data Security</h2>
              <p className="text-slate-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Third-Party Services</h2>
              <p className="text-slate-300 leading-relaxed">
                We may use third-party service providers to help us operate our service. These providers have access to your personal information only to perform these tasks on our behalf.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-slate-300 leading-relaxed">
                You have the right to access, update, or delete your personal information at any time. You can manage your account settings or contact us for assistance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-slate-300 leading-relaxed">
                We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-slate-300 leading-relaxed">
                Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@codexlingua.com
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}