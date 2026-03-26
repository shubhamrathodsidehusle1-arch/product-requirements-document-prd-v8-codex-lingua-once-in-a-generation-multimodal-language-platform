import Link from "next/link";

export default function AboutPage() {
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
            <Link href="/about" className="nav-link text-brand-400">About</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            About <span className="gradient-text">Codex Lingua</span>
          </h1>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed">
              Codex Lingua is the world&apos;s most advanced AI-native language learning platform. 
              We combine curriculum-grade pedagogy with cutting-edge artificial intelligence to create 
              personalized, immersive learning experiences across 120+ languages.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Makes Us Different</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-semibold mb-1">AI-Native Design</h3>
                  <p className="text-slate-400">AI is not an add-on. It is built into every aspect of our pedagogy, from adaptive curriculum to personalized feedback.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold mb-1">Multi-Modal Immersion</h3>
                  <p className="text-slate-400">Reading, listening, speaking, and writing are not siloed. They are integrated into cohesive learning journeys.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🌍</span>
                <div>
                  <h3 className="font-semibold mb-1">Cultural Connection</h3>
                  <p className="text-slate-400">Language is not just vocabulary. It is culture. We connect learning to real media, communities, and contexts.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold mb-1">Personalized Paths</h3>
                  <p className="text-slate-400">No one-size-fits-all. Your learning path adapts to your goals, level, and learning style.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Founded in 2024, Codex Lingua emerged from a simple observation: language learning apps 
              either gamify learning to the point of superficiality or provide unstructured chat experiences.
            </p>
            <p className="text-slate-300 leading-relaxed">
              We set out to build something different: a platform that combines the depth of traditional 
              curriculum with the personalization of AI, making language mastery accessible to everyone.
            </p>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="text-slate-400 mb-6">
              Millions of learners around the world are already mastering new languages with Codex Lingua.
            </p>
            <div className="flex gap-4">
              <Link href="/" className="btn-primary">
                Start Learning Free
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}