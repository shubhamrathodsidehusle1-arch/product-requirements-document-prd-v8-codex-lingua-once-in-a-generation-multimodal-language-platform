import Link from "next/link";

export default function ExtensionPage() {
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
            <Link href="/extension" className="nav-link text-brand-400">Extension</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🦊</div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Codex Lingua Extension</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Learn languages while you browse. Get instant translations, vocabulary highlights, and practice exercises on any webpage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="font-semibold mb-2">Instant Translation</h3>
              <p className="text-slate-400 text-sm">Hover over any word to see translations in your target language</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="font-semibold mb-2">Vocabulary Highlighting</h3>
              <p className="text-slate-400 text-sm">Known words stay normal, unknown words get highlighted for practice</p>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold mb-2">Smart Context</h3>
              <p className="text-slate-400 text-sm">See how words are used in real content from news, social media, and articles</p>
            </div>
          </div>

          <div className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold">One-Click Dictionary</h3>
                  <p className="text-slate-400 text-sm">Click any word for instant definitions, pronunciation, and example sentences</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold">Vocabulary Collection</h3>
                  <p className="text-slate-400 text-sm">Save words to your personal vocabulary list for review</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold">Reading Level Adjustment</h3>
                  <p className="text-slate-400 text-sm">Simplify text to match your language level for easier comprehension</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold">Audio Pronunciation</h3>
                  <p className="text-slate-400 text-sm">Listen to native pronunciation of any word</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-green-400 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold">Contextual Examples</h3>
                  <p className="text-slate-400 text-sm">See how words are used in real sentences from the page</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Supported Browsers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-4xl mb-3">🔵</div>
                <h3 className="font-semibold">Chrome</h3>
                <p className="text-sm text-slate-400 mb-3">Version 90+</p>
                <button className="btn-primary text-sm">Add to Chrome</button>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-4xl mb-3">🧡</div>
                <h3 className="font-semibold">Firefox</h3>
                <p className="text-sm text-slate-400 mb-3">Version 88+</p>
                <button className="btn-secondary text-sm">Add to Firefox</button>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-4xl mb-3">🌐</div>
                <h3 className="font-semibold">Edge</h3>
                <p className="text-sm text-slate-400 mb-3">Version 90+</p>
                <button className="btn-secondary text-sm">Add to Edge</button>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Is the extension free?</h3>
                <p className="text-slate-400 text-sm">Yes, the basic extension is free. Premium features like unlimited vocabulary storage are available with a Plus or Pro subscription.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Does it work on all websites?</h3>
                <p className="text-slate-400 text-sm">The extension works on most websites including news sites, social media, and educational content. Some secure sites may have restrictions.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Does it work offline?</h3>
                <p className="text-slate-400 text-sm">Basic translation works offline if you have downloaded language packs. Full features require an internet connection.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I sync with the app?</h3>
                <p className="text-slate-400 text-sm">Your vocabulary and progress automatically sync with your Codex Lingua account across all devices.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}