"use client";

import { useState } from "react";
import Link from "next/link";

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  xp: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 1, name: "First Steps", description: "Complete your first lesson", icon: "🌱", category: "progress", xp: 50, unlocked: true, unlockedAt: "Jan 20, 2026" },
  { id: 2, name: "Word Collector", description: "Learn 100 vocabulary words", icon: "📚", category: "vocabulary", xp: 100, unlocked: true, unlockedAt: "Feb 5, 2026", progress: 100, target: 100 },
  { id: 3, name: "Polyglot", description: "Start learning 3 languages", icon: "🌍", category: "languages", xp: 150, unlocked: true, unlockedAt: "Feb 15, 2026", progress: 3, target: 3 },
  { id: 4, name: "Streak Master", description: "Maintain a 7-day streak", icon: "🔥", category: "streak", xp: 100, unlocked: true, unlockedAt: "Mar 1, 2026", progress: 7, target: 7 },
  { id: 5, name: "Perfect Score", description: "Get 100% on 5 exercises", icon: "💯", category: "progress", xp: 200, unlocked: true, unlockedAt: "Mar 10, 2026" },
  { id: 6, name: "Chatty", description: "Have 50 conversations with AI", icon: "💬", category: "ai", xp: 150, unlocked: true, unlockedAt: "Mar 15, 2026", progress: 50, target: 50 },
  { id: 7, name: "Vocabulary Master", description: "Master 500 vocabulary words", icon: "🏅", category: "vocabulary", xp: 300, unlocked: false, progress: 342, target: 500 },
  { id: 8, name: "Bilingual", description: "Reach B1 level in any language", icon: "🎓", category: "level", xp: 500, unlocked: false, progress: 65, target: 100 },
  { id: 9, name: "Marathon", description: "Practice for 100 hours total", icon: "⏱️", category: "time", xp: 1000, unlocked: false, progress: 20.5, target: 100 },
  { id: 10, name: "Social Learner", description: "Join 10 live classes", icon: "📹", category: "community", xp: 200, unlocked: false, progress: 4, target: 10 },
  { id: 11, name: "Night Owl", description: "Practice at midnight", icon: "🦉", category: "special", xp: 50, unlocked: true, unlockedAt: "Jan 25, 2026" },
  { id: 12, name: "Early Bird", description: "Practice at 6 AM", icon: "🌅", category: "special", xp: 50, unlocked: false },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "progress", label: "Progress" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "streak", label: "Streaks" },
  { id: "ai", label: "AI Practice" },
  { id: "level", label: "Levels" },
  { id: "special", label: "Special" },
];

export default function AchievementsPage() {
  const [achievements] = useState(MOCK_ACHIEVEMENTS);
  const [filter, setFilter] = useState("all");
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const filteredAchievements = achievements.filter((a) => {
    const matchesCategory = filter === "all" || a.category === filter;
    const matchesUnlocked = !showUnlockedOnly || a.unlocked;
    return matchesCategory && matchesUnlocked;
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXp = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

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
            <Link href="/achievements" className="nav-link text-brand-400">Achievements</Link>
            <Link href="/progress" className="nav-link">Progress</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Achievements</h1>
            <p className="text-slate-400">Track your milestones and earn rewards</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="text-sm text-slate-400 mb-1">Unlocked</div>
              <div className="text-3xl font-bold text-brand-400">{unlockedCount} / {achievements.length}</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-sm text-slate-400 mb-1">Total XP Earned</div>
              <div className="text-3xl font-bold">{totalXp}</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-sm text-slate-400 mb-1">Completion</div>
              <div className="text-3xl font-bold text-accent-400">{Math.round((unlockedCount / achievements.length) * 100)}%</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    filter === cat.id 
                      ? "bg-brand-500 text-white" 
                      : "bg-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
              className={`px-4 py-2 rounded-lg transition-all ${
                showUnlockedOnly 
                  ? "bg-brand-500/20 text-brand-400" 
                  : "bg-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {showUnlockedOnly ? "Showing Unlocked" : "Show All"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`glass-card p-6 relative overflow-hidden ${
                  !achievement.unlocked ? "opacity-60" : ""
                }`}
              >
                {achievement.unlocked && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-bl-full" />
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`text-4xl ${!achievement.unlocked ? "grayscale" : ""}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      {achievement.unlocked && (
                        <span className="text-green-400">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-brand-400">+{achievement.xp} XP</span>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <span className="text-xs text-slate-500">{achievement.unlockedAt}</span>
                      )}
                    </div>
                  </div>
                </div>

                {!achievement.unlocked && achievement.progress !== undefined && achievement.target && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Progress</span>
                      <span>{achievement.progress} / {achievement.target}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-500 rounded-full transition-all"
                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}