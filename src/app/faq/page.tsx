import Link from "next/link";

const FAQS = [
  {
    question: "How does the AI tutoring work?",
    answer: "Our AI tutors are trained on millions of language learning conversations. They adapt to your level, provide instant feedback, and create personalized practice scenarios based on your learning goals."
  },
  {
    question: "What languages are available?",
    answer: "We offer 120+ languages across all tiers. Tier A languages (Spanish, French, German, Japanese, Chinese, etc.) have full AI support. Tier B and C languages have varying levels of AI and content support."
  },
  {
    question: "How does the spaced repetition system work?",
    answer: "We use the SM-2 algorithm to schedule vocabulary review at optimal intervals. Words you find difficult appear more frequently, while mastered words are shown less often to maximize retention."
  },
  {
    question: "Can I use Codex Lingua offline?",
    answer: "Yes! With offline mode, you can download language packs to your device and learn without an internet connection. Your progress syncs automatically when you reconnect."
  },
  {
    question: "What's included in each subscription tier?",
    answer: "Free: 3 languages, 50 XP/day, 10 AI messages. Plus: 10 languages, 200 XP/day, 100 AI messages, offline mode. Pro: Unlimited everything, custom AI personas, API access."
  },
  {
    question: "How do live classes work?",
    answer: "Live classes are video sessions with native speaker instructors. You can join scheduled classes, interact in real-time, and get personalized feedback. Some classes are free, others require tokens or a subscription."
  },
  {
    question: "How do I track my progress?",
    answer: "Your dashboard shows XP, level, streak, words learned, lessons completed, and accuracy. The progress page has detailed stats including weekly goals and language-specific progress."
  },
  {
    question: "Can I create custom AI personas?",
    answer: "Yes! Pro subscribers can create custom AI conversation partners with specific personalities, speaking styles, and scenarios. Plus subscribers can use pre-built personas."
  },
  {
    question: "Is the content CEFR-aligned?",
    answer: "Yes, our curriculum follows the Common European Framework of Reference (CEFR) from A1 to C2, with equivalent levels for other language systems (JLPT, HSK, etc.)."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime from Settings > Subscription. You'll keep access until your billing period ends. No cancellation fees."
  },
];

export default function FAQPage() {
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
            <Link href="/faq" className="nav-link text-brand-400">FAQ</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Find answers to common questions about Codex Lingua
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details key={index} className="glass-card p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  <span className="text-2xl text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-slate-400 mt-4 pt-4 border-t border-white/10">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 glass-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-slate-400 mb-6">Can not find the answer you are looking for?</p>
            <Link href="/contact" className="btn-primary">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}