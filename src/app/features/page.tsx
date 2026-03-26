import Link from "next/link";

const FEATURES = [
  {
    icon: "🤖",
    title: "AI-Powered Tutoring",
    description: "Practice conversation with culturally-aware AI personas that adapt to your level and learning style.",
    details: ["Real-time conversation", "Grammar correction", "Cultural context", "Personalized feedback"]
  },
  {
    icon: "🧠",
    title: "Smart Vocabulary",
    description: "Spaced repetition system with AI-generated mnemonics and memory palace techniques.",
    details: ["SM-2 algorithm", "AI mnemonics", "Context examples", "Progress tracking"]
  },
  {
    icon: "🎧",
    title: "Immersive Listening",
    description: "Studio-grade pronunciation with real-time feedback and accent mirroring technology.",
    details: ["Native audio", "Accent training", "Speed control", "Transcript view"]
  },
  {
    icon: "🎤",
    title: "Pronunciation Lab",
    description: "Speech recognition technology to perfect your accent with detailed phoneme analysis.",
    details: ["Waveform display", "Phoneme scoring", "Comparison mode", "Practice drills"]
  },
  {
    icon: "✍️",
    title: "Writing Studio",
    description: "AI editor that explains grammar, tone, and style with multi-pass coaching.",
    details: ["Grammar check", "Style suggestions", "Vocabulary enhancement", "Writing prompts"]
  },
  {
    icon: "📚",
    title: "CEFR Curriculum",
    description: "Structured curriculum aligned with international language proficiency standards.",
    details: ["A1-C2 levels", "Unit-based lessons", "Progress tests", "Certificates"]
  },
  {
    icon: "🏆",
    title: "Exam Preparation",
    description: "Proctored simulations for IELTS, JLPT, DELE, HSK, and other standardized tests.",
    details: ["Practice tests", "Timed sessions", "Score prediction", "Weakness analysis"]
  },
  {
    icon: "👥",
    title: "Live Classes",
    description: "Interactive sessions with native speaker instructors for real-time practice.",
    details: ["Small groups", "Topic-based", "Q&A sessions", "Recording access"]
  },
  {
    icon: "🎯",
    title: "Personalized Learning",
    description: "AI adapts to your goals, level, and learning style for optimal results.",
    details: ["Adaptive paths", "Goal tracking", "Learning analytics", "Custom recommendations"]
  },
  {
    icon: "📱",
    title: "Offline Mode",
    description: "Download content and learn anywhere, even without internet.",
    details: ["Language packs", "Progress sync", "Offline exercises", "Background downloads"]
  },
  {
    icon: "🌍",
    title: "120+ Languages",
    description: "From popular languages to endangered heritage languages, master them all.",
    details: ["Tiered AI support", "Rare languages", "Dialects", "Writing systems"]
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    description: "Detailed insights into your learning journey with actionable recommendations.",
    details: ["XP tracking", "Streak analysis", "Time metrics", "Achievements"]
  },
];

export default function FeaturesPage() {
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
            <Link href="/features" className="nav-link text-brand-400">Features</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need to achieve <span className="gradient-text">fluency</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI with proven learning methodologies 
              to create the most effective language learning experience available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <div key={index} className="glass-card p-6 hover:border-brand-500/30 transition-all group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 glass-card p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Why learners choose <span className="gradient-text">Codex Lingua</span>
                </h2>
                <p className="text-slate-400 mb-6">
                  Join millions of learners who have transformed their language abilities with our 
                  AI-powered platform. Here is what makes us different:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-400 text-xl">✓</span>
                    <div>
                      <span className="font-semibold">Scientifically-proven methods</span>
                      <p className="text-slate-400 text-sm">Based on spaced repetition and CEFR standards</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-400 text-xl">✓</span>
                    <div>
                      <span className="font-semibold">Personalized AI tutor</span>
                      <p className="text-slate-400 text-sm">Available 24/7 to guide your learning journey</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-400 text-xl">✓</span>
                    <div>
                      <span className="font-semibold">Complete learning ecosystem</span>
                      <p className="text-slate-400 text-sm">From vocabulary to conversation, all in one place</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-bold text-brand-400 mb-2">10M+</div>
                  <div className="text-slate-400">Active Learners</div>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-bold text-brand-400 mb-2">120+</div>
                  <div className="text-slate-400">Languages</div>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-bold text-brand-400 mb-2">50M+</div>
                  <div className="text-slate-400">Words Learned</div>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-bold text-brand-400 mb-2">4.8</div>
                  <div className="text-slate-400">App Store Rating</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/signup" className="btn-primary text-lg px-12 py-4">
              Start Learning for Free
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}