"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_PROGRESS = {
  totalXp: 12450,
  level: 12,
  streak: 7,
  totalWords: 847,
  totalLessons: 42,
  totalMinutes: 1240,
  averageAccuracy: 87,
};

const MOCK_ACTIVITY = [
  { date: "Today", xp: 120, activity: "Vocabulary review", type: "vocab" },
  { date: "Today", xp: 80, activity: "Completed lesson", type: "lesson" },
  { date: "Yesterday", xp: 150, activity: "AI conversation", type: "chat" },
  { date: "Yesterday", xp: 60, activity: "Practice exercises", type: "practice" },
  { date: "2 days ago", xp: 100, activity: "Writing feedback", type: "writing" },
];

const WEEKLY_GOALS = [
  { id: 1, name: "Learn 50 new words", current: 32, target: 50, type: "words" },
  { id: 2, name: "Complete 10 lessons", current: 7, target: 10, type: "lessons" },
  { id: 3, name: "Practice for 5 hours", current: 3.5, target: 5, type: "time" },
  { id: 4, name: "5 day streak", current: 5, target: 5, type: "streak" },
];

const LANGUAGE_PROGRESS = [
  { code: "es", name: "Spanish", flag: "🇪🇸", level: "A2", xp: 4500, nextLevelXp: 6000, lessons: 28, words: 342 },
  { code: "ja", name: "Japanese", flag: "🇯🇵", level: "A1", xp: 1200, nextLevelXp: 3000, lessons: 8, words: 156 },
];

export default function ProgressPage() {
  const [progress] = useState(MOCK_PROGRESS);
  const [activity] = useState(MOCK_ACTIVITY);
  const [weeklyGoals] = useState(WEEKLY_GOALS);
  const [languages] = useState(LANGUAGE_PROGRESS);

  const getLevelXp = (level: number) => level * 500;
  const nextLevelXp = getLevelXp(progress.level + 1);
  const currentLevelXp = getLevelXp(progress.level);
  const xpProgress = ((progress.totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

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
            <Link href="/progress" className="nav-link text-brand-400">Progress</Link>
            <Link href="/achievements" className="nav-link">Achievements</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
            <p className="text-slate-400">Track your language learning journey</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="text-sm text-slate-400 mb-1">Level</div>
              <div className="text-3xl font-bold text-brand-400">{progress.level}</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-sm text-slate-400 mb-1">Total XP</div>
              <div className="text-3xl font-bold">{progress.totalXp.toLocaleString()}</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-sm text-slate-400 mb-1">🔥 Streak</div>
              <div className="text-3xl font-bold text-orange-400">{progress.streak} days</div>
            </div>
            <div className="glass-card p-6">
              <div className="text-sm text-slate-400 mb-1">Accuracy</div>
              <div className="text-3xl font-bold text-green-400">{progress.averageAccuracy}%</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-6">Level Progress</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-2xl font-bold">
                    {progress.level}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Level {progress.level}</span>
                      <span className="text-slate-400">Level {progress.level + 1}</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full"
                        style={{ width: `${xpProgress}%` }}
                      />
                    </div>
                    <div className="text-sm text-slate-400 mt-2">
                      {nextLevelXp - progress.totalXp} XP to Level {progress.level + 1}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-6">Weekly Goals</h2>
                <div className="space-y-4">
                  {weeklyGoals.map((goal) => {
                    const percent = (goal.current / goal.target) * 100;
                    return (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{goal.name}</span>
                          <span className="text-slate-400">
                            {goal.current} / {goal.target}
                            {goal.type === "time" ? " hrs" : ""}
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${percent >= 100 ? "bg-green-500" : "bg-brand-500"}`}
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-6">Language Progress</h2>
                <div className="space-y-4">
                  {languages.map((lang) => {
                    const percent = (lang.xp / lang.nextLevelXp) * 100;
                    return (
                      <Link 
                        key={lang.code}
                        href={`/learn/${lang.code}`}
                        className="block p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-2xl">{lang.flag}</div>
                          <div className="flex-1">
                            <div className="font-medium">{lang.name}</div>
                            <div className="text-sm text-slate-400">Level {lang.level}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-brand-400">{lang.xp} XP</div>
                            <div className="text-xs text-slate-500">to {lang.level === "A1" ? "A2" : "B1"}</div>
                          </div>
                        </div>
                        <div className="flex gap-6 text-sm text-slate-400">
                          <span>📚 {lang.lessons} lessons</span>
                          <span>📝 {lang.words} words</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">All-Time Stats</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Words Learned</span>
                    <span className="font-semibold text-green-400">{progress.totalWords}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Lessons Completed</span>
                    <span className="font-semibold text-brand-400">{progress.totalLessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Time Learning</span>
                    <span className="font-semibold">
                      {Math.floor(progress.totalMinutes / 60)}h {progress.totalMinutes % 60}m
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Avg. Accuracy</span>
                    <span className="font-semibold text-accent-400">{progress.averageAccuracy}%</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {activity.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm">
                        {item.type === "vocab" ? "📝" : 
                         item.type === "lesson" ? "📖" : 
                         item.type === "chat" ? "💬" : "✍️"}
                      </div>
                      <div className="flex-1">
                        <div className="text-slate-300">{item.activity}</div>
                        <div className="text-xs text-slate-500">{item.date}</div>
                      </div>
                      <div className="text-brand-400">+{item.xp} XP</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}