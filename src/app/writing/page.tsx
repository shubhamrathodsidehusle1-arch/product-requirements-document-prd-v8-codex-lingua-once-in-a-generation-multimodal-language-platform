"use client";

import { useState } from "react";
import Link from "next/link";

const WRITING_PROMPTS = [
  { id: 1, title: "Daily Life", description: "Describe your typical day", level: "A1-A2" },
  { id: 2, title: "Travel Experience", description: "Write about a memorable trip", level: "B1" },
  { id: 3, title: "Opinion Essay", description: "Give your opinion on a topic", level: "B2" },
  { id: 4, title: "Business Email", description: "Write a formal email", level: "B2-C1" },
  { id: 5, title: "Creative Story", description: "Continue a story", level: "A2-B1" },
  { id: 6, title: "Cultural Comparison", description: "Compare customs", level: "B1-B2" },
];

const MOCK_FEEDBACK = {
  score: 85,
  grammar: { score: 90, issues: [] },
  vocabulary: { score: 85, suggestions: ["Consider using 'melancholic' instead of 'sad'"] },
  style: { score: 80, suggestions: ["Vary sentence length for better flow"] },
  overall: "Your writing shows strong comprehension of the topic. Good use of complex structures!",
};

export default function WritingStudioPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<typeof WRITING_PROMPTS[0] | null>(null);
  const [content, setContent] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowFeedback(true);
    }, 2000);
  };

  const handleNewPrompt = () => {
    setSelectedPrompt(null);
    setContent("");
    setShowFeedback(false);
  };

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
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/writing" className="nav-link text-brand-400">Writing</Link>
            <Link href="/settings/profile" className="nav-link">Settings</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Writing Studio</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Practice writing and get AI-powered feedback on grammar, vocabulary, and style
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {!selectedPrompt ? (
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold mb-6">Choose a Writing Prompt</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {WRITING_PROMPTS.map((prompt) => (
                      <button
                        key={prompt.id}
                        onClick={() => setSelectedPrompt(prompt)}
                        className="p-4 bg-white/5 rounded-xl text-left hover:bg-white/10 transition-colors"
                      >
                        <h3 className="font-semibold mb-1">{prompt.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">{prompt.description}</p>
                        <span className="text-xs text-brand-400">{prompt.level}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold">{selectedPrompt.title}</h2>
                      <p className="text-slate-400">{selectedPrompt.description}</p>
                    </div>
                    <button 
                      onClick={handleNewPrompt}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      Change Prompt
                    </button>
                  </div>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing here..."
                    className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50 resize-none"
                  />

                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-slate-400">
                      {content.split(/\s+/).filter(Boolean).length} words
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={!content.trim() || isAnalyzing}
                      className="btn-primary disabled:opacity-50"
                    >
                      {isAnalyzing ? "Analyzing..." : "Get AI Feedback"}
                    </button>
                  </div>
                </div>
              )}

              {showFeedback && (
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">AI Feedback</h2>
                    <div className="text-3xl font-bold text-brand-400">{MOCK_FEEDBACK.score}/100</div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400">Grammar</span>
                        <span className="text-green-400 font-semibold">{MOCK_FEEDBACK.grammar.score}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }} />
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400">Vocabulary</span>
                        <span className="text-yellow-400 font-semibold">{MOCK_FEEDBACK.vocabulary.score}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400">Style</span>
                        <span className="text-orange-400 font-semibold">{MOCK_FEEDBACK.style.score}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: "80%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Suggestions</h3>
                      {MOCK_FEEDBACK.vocabulary.suggestions.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg text-sm">
                          <span className="text-brand-400">💡</span>
                          <span className="text-slate-300">{s}</span>
                        </div>
                      ))}
                      {MOCK_FEEDBACK.style.suggestions.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 bg-white/5 rounded-lg text-sm">
                          <span className="text-brand-400">✨</span>
                          <span className="text-slate-300">{s}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-xl">
                      <h3 className="font-semibold mb-2">Overall Assessment</h3>
                      <p className="text-slate-300">{MOCK_FEEDBACK.overall}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button onClick={handleNewPrompt} className="btn-primary flex-1">
                      Try Another Prompt
                    </button>
                    <button className="btn-secondary flex-1">
                      Save to Portfolio
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Writing Tips</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-brand-400">📝</span>
                    <div className="text-sm text-slate-300">Start with an outline to organize your thoughts</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-brand-400">🔤</span>
                    <div className="text-sm text-slate-300">Pay attention to verb tenses and subject-verb agreement</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-brand-400">📖</span>
                    <div className="text-sm text-slate-300">Read examples to understand good writing patterns</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-brand-400">✏️</span>
                    <div className="text-sm text-slate-300">Practice writing daily, even for 10 minutes</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Your Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Writings</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Average Score</span>
                    <span className="font-semibold text-brand-400">82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">This Week</span>
                    <span className="font-semibold">3</span>
                  </div>
                </div>
              </div>

              <Link href="/learn/es" className="block glass-card p-6 hover:border-brand-500/50 transition-colors">
                <h3 className="font-semibold mb-2">Writing with AI Tutor</h3>
                <p className="text-sm text-slate-400">Get real-time help while writing</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}