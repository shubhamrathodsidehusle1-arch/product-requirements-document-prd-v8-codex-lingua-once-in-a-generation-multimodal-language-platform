import Link from "next/link";

const TIER_A_LANGUAGES = [
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
];

const TIER_B_LANGUAGES = [
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪" },
];

const FEATURES = [
  {
    icon: "🎯",
    title: "AI-Powered Tutoring",
    description: "Practice conversation with culturally-aware AI personas that adapt to your level",
  },
  {
    icon: "🎧",
    title: "Immersive Listening",
    description: "Studio-grade pronunciation with real-time feedback and accent mirroring",
  },
  {
    icon: "📚",
    title: "Smart Vocabulary",
    description: "Spaced repetition system with AI-generated mnemonics and memory palaces",
  },
  {
    icon: "✍️",
    title: "Writing Studio",
    description: "AI editor that explains grammar, tone, and style with multi-pass coaching",
  },
  {
    icon: "🏆",
    title: "Exam Preparation",
    description: "IELTS, JLPT, DELE, HSK - practice with proctored simulations",
  },
  {
    icon: "🌍",
    title: "120+ Languages",
    description: "From Tier A to endangered heritage languages - master them all",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-surface-dark/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xl font-bold">
              C
            </div>
            <span className="text-xl font-bold gradient-text">Codex Lingua</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="#languages" className="nav-link">Languages</Link>
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#pricing" className="nav-link">Pricing</Link>
            <Link href="/auth/signin" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/20 rounded-full blur-[120px]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              AI-Native Language Platform
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Master any language
              <span className="block gradient-text">with AI by your side</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Immerse yourself in 120+ languages with AI tutors, spaced repetition, 
              pronunciation coaching, and real-world content. Your personal language journey starts here.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Link href="/auth/signin" className="btn-primary text-lg px-8">
                Start Learning Free
              </Link>
              <Link href="/auth/signin" className="btn-secondary text-lg px-8">
                Watch Demo
              </Link>
            </div>
          </div>

          <div className="mt-20 relative">
            <div className="glass-card p-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <div className="text-lg font-semibold">Maria - Your Spanish Coach</div>
                  <div className="text-slate-400 text-sm">Online • Ready to practice</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 mb-4">
                <p className="text-slate-300">
                  &quot;¡Hola! I&apos;m Maria. ¿Cómo estás hoy? Let&apos;s practice your Spanish. 
                  Tell me about your day - what did you do this morning?&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-brand-500/20 text-brand-300 rounded-lg text-sm">
                  🎤 Speak
                </button>
                <button className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg text-sm">
                  💬 Type
                </button>
                <button className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg text-sm">
                  🔊 Listen
                </button>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 glass-card p-4 animate-float">
              <div className="text-3xl">🔥 7 day streak</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-card p-4 animate-float" style={{ animationDelay: "2s" }}>
              <div className="text-3xl">📚 847 words learned</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to <span className="gradient-text">fluency</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From AI tutors to spaced repetition, from pronunciation labs to writing studios
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <div key={i} className="glass-card p-6 hover:border-brand-500/30 transition-all duration-300 group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="languages" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-brand-900/10 to-surface-dark" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Choose your <span className="gradient-text">language</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Start with our most popular languages - more coming soon
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-500" />
              Tier A - Full AI Support
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {TIER_A_LANGUAGES.map((lang) => (
                <Link 
                  key={lang.code} 
                  href={`/learn/${lang.code}`}
                  className="language-card text-center"
                >
                  <div className="text-4xl mb-2">{lang.flag}</div>
                  <div className="font-medium text-white">{lang.name}</div>
                  <div className="text-sm text-slate-400">{lang.nativeName}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-500" />
              Tier B - Growth Markets
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {TIER_B_LANGUAGES.map((lang) => (
                <Link 
                  key={lang.code} 
                  href={`/learn/${lang.code}`}
                  className="language-card text-center opacity-70 hover:opacity-100"
                >
                  <div className="text-4xl mb-2">{lang.flag}</div>
                  <div className="font-medium text-white">{lang.name}</div>
                  <div className="text-sm text-slate-400">{lang.nativeName}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/signin" className="btn-secondary">
              View all 120+ languages →
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Start free, upgrade when you&apos;re ready
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8">
              <div className="text-2xl font-bold mb-2">Free</div>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-3 mb-8 text-slate-300">
                <li>✅ 3 languages</li>
                <li>✅ 50 XP/day limit</li>
                <li>✅ 10 AI messages/day</li>
                <li>✅ Basic vocabulary decks</li>
                <li>✅ Community features</li>
              </ul>
              <Link href="/auth/signin" className="btn-secondary w-full">Get Started</Link>
            </div>
            
            <div className="glass-card p-8 border-brand-500/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-500 text-white text-sm rounded-full">
                Most Popular
              </div>
              <div className="text-2xl font-bold mb-2">Plus</div>
              <div className="text-4xl font-bold mb-6">$9.99<span className="text-lg font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-3 mb-8 text-slate-300">
                <li>✅ 10 languages</li>
                <li>✅ 200 XP/day limit</li>
                <li>✅ 100 AI messages/day</li>
                <li>✅ Unlimited vocabulary decks</li>
                <li>✅ Full offline mode</li>
                <li>✅ Advanced analytics</li>
              </ul>
              <Link href="/auth/signin" className="btn-primary w-full">Start Free Trial</Link>
            </div>
            
            <div className="glass-card p-8">
              <div className="text-2xl font-bold mb-2">Pro</div>
              <div className="text-4xl font-bold mb-6">$19.99<span className="text-lg font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-3 mb-8 text-slate-300">
                <li>✅ Unlimited languages</li>
                <li>✅ Unlimited XP</li>
                <li>✅ Unlimited AI messages</li>
                <li>✅ Custom AI personas</li>
                <li>✅ API access</li>
                <li>✅ Priority support</li>
              </ul>
              <Link href="/auth/signin" className="btn-secondary w-full">Go Pro</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to start your <span className="gradient-text">journey?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join millions of learners mastering new languages with AI by their side
          </p>
          <Link href="/auth/signin" className="btn-primary text-lg px-12 py-4">
            Start Learning Now - It&apos;s Free
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-sm font-bold">
              C
            </div>
            <span className="font-semibold">Codex Lingua</span>
          </div>
          <div className="text-slate-400 text-sm">
            © 2026 Codex Lingua. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}