"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const MOCK_USER = {
  id: 1,
  email: "demo@codexlingua.com",
  displayName: "Demo User",
  streak: 7,
  xp: 2450,
  level: 12,
  languages: [
    { code: "es", name: "Spanish", level: "A2", progress: 65, xp: 1200 },
    { code: "ja", name: "Japanese", level: "A1", progress: 25, xp: 450 },
  ],
};

const MOCK_DUE_VOCAB = [
  { id: 1, word: "hola", translation: "hello", language: "es" },
  { id: 2, word: "gracias", translation: "thank you", language: "es" },
  { id: 3, word: "buenos días", translation: "good morning", language: "es" },
];

const MOCK_RECOMMENDED = [
  { id: 1, type: "lesson", title: "Past Tense Verbs", language: "es", duration: 15 },
  { id: 2, type: "vocab", title: "Food & Dining", language: "es", words: 20 },
  { id: 3, type: "practice", title: "Conversation Practice", language: "es", duration: 10 },
];

const MOCK_STATS = {
  totalWordsLearned: 847,
  totalLessonsCompleted: 42,
  totalMinutes: 1240,
  averageAccuracy: 87,
};

export default function DashboardPage() {
  const [user] = useState(MOCK_USER);
  const [dueVocab] = useState(MOCK_DUE_VOCAB);
  const [recommended] = useState(MOCK_RECOMMENDED);
  const [stats] = useState(MOCK_STATS);

  const getNextLevelXp = () => (user.level + 1) * 500;
  const xpProgress = (user.xp % 500) / 500 * 100;

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
            <Link href="/dashboard" className="nav-link text-brand-400">Dashboard</Link>
            <Link href="/progress" className="nav-link">Progress</Link>
            <Link href="/achievements" className="nav-link">Achievements</Link>
            <Link href="/classes" className="nav-link">Classes</Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-semibold">
                {user.displayName[0]}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="gradient-text">{user.displayName}</span>
            </h1>
            <p className="text-slate-400">Ready to continue your language journey?</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-slate-400">Level {user.level}</div>
                    <div className="text-2xl font-bold">{user.xp} XP</div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full">
                    <span>🔥</span>
                    <span className="font-semibold">{user.streak} day streak</span>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                <div className="text-sm text-slate-400 mt-2 text-right">{500 - (user.xp % 500)} XP to Level {user.level + 1}</div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
                <div className="space-y-3">
                  {user.languages.map((lang) => (
                    <Link 
                      key={lang.code} 
                      href={`/learn/${lang.code}`}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="text-3xl">
                        {lang.code === "es" ? "🇪🇸" : lang.code === "ja" ? "🇯🇵" : "🌐"}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-sm text-slate-400">Level {lang.level}</div>
                      </div>
                      <div className="w-24">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-500 rounded-full"
                            style={{ width: `${lang.progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{lang.progress}%</div>
                      </div>
                      <button className="btn-primary text-sm px-4 py-2">Continue</button>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Recommended for Today</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {recommended.map((item) => (
                    <Link 
                      key={item.id}
                      href={item.type === "vocab" ? `/learn/es/review` : `/learn/es/practice`}
                      className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center"
                    >
                      <div className="text-2xl mb-2">
                        {item.type === "lesson" ? "📖" : item.type === "vocab" ? "📝" : "💬"}
                      </div>
                      <div className="font-medium mb-1">{item.title}</div>
                      <div className="text-sm text-slate-400">
                        {item.duration ? `${item.duration} min` : `${item.words} words`}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {dueVocab.length > 0 && (
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Due for Review</h3>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                      {dueVocab.length} words
                    </span>
                  </div>
                  <div className="space-y-2">
                    {dueVocab.map((word) => (
                      <div key={word.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="font-medium">{word.word}</div>
                          <div className="text-sm text-slate-400">{word.translation}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/learn/es/review" className="btn-primary w-full mt-4">
                    Start Review
                  </Link>
                </div>
              )}

              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">This Week</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Words Learned</span>
                    <span className="font-semibold text-green-400">{stats.totalWordsLearned}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Lessons</span>
                    <span className="font-semibold text-brand-400">{stats.totalLessonsCompleted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Time</span>
                    <span className="font-semibold">{Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Accuracy</span>
                    <span className="font-semibold text-accent-400">{stats.averageAccuracy}%</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/learn/es" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10">
                    <span>🤖</span>
                    <span>Practice with AI Tutor</span>
                  </Link>
                  <Link href="/classes" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10">
                    <span>📹</span>
                    <span>Join Live Class</span>
                  </Link>
                  <Link href="/achievements" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10">
                    <span>🏆</span>
                    <span>View Achievements</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}