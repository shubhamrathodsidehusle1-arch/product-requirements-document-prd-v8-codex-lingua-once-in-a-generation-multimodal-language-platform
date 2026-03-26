"use client";

import { useState } from "react";
import Link from "next/link";

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  languages: number;
  level: number;
  country?: string;
}

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "Yuki Tanaka", avatar: "👩", xp: 15420, streak: 45, languages: 5, level: 28, country: "🇯🇵" },
  { rank: 2, name: "María García", avatar: "👩", xp: 14850, streak: 38, languages: 3, level: 26, country: "🇪🇸" },
  { rank: 3, name: "Hans Mueller", avatar: "👨", xp: 13200, streak: 30, languages: 4, level: 24, country: "🇩🇪" },
  { rank: 4, name: "Sophie Martin", avatar: "👩", xp: 12100, streak: 25, languages: 2, level: 22, country: "🇫🇷" },
  { rank: 5, name: "Wei Chen", avatar: "👨", xp: 11500, streak: 28, languages: 2, level: 21, country: "🇨🇳" },
  { rank: 6, name: "João Silva", avatar: "👨", xp: 10200, streak: 21, languages: 3, level: 19, country: "🇧🇷" },
  { rank: 7, name: "Min-Ji Park", avatar: "👩", xp: 9800, streak: 18, languages: 2, level: 18, country: "🇰🇷" },
  { rank: 8, name: "Alex Johnson", avatar: "👨", xp: 9200, streak: 15, languages: 1, level: 17, country: "🇺🇸" },
  { rank: 9, name: "Elena Petrova", avatar: "👩", xp: 8500, streak: 12, languages: 2, level: 16, country: "🇷🇺" },
  { rank: 10, name: "Lucas Brown", avatar: "👨", xp: 7800, streak: 10, languages: 1, level: 15, country: "🇬🇧" },
];

const TIME_PERIODS = [
  { id: "weekly", label: "This Week" },
  { id: "monthly", label: "This Month" },
  { id: "all", label: "All Time" },
];

const REGIONS = [
  { id: "global", label: "🌍 Global" },
  { id: "europe", label: "🌍 Europe" },
  { id: "asia", label: "🌏 Asia" },
  { id: "americas", label: "🌎 Americas" },
];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("weekly");
  const [region, setRegion] = useState("global");

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-slate-300";
    if (rank === 3) return "text-amber-600";
    return "text-slate-400";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
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
            <Link href="/leaderboard" className="nav-link text-brand-400">Leaderboard</Link>
            <Link href="/classes" className="nav-link">Classes</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-slate-400">
              See how you rank against other language learners worldwide
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            {TIME_PERIODS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  period === p.id 
                    ? "bg-brand-500 text-white" 
                    : "bg-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="glass-card overflow-hidden mb-8">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-sm font-medium text-slate-400">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Learner</div>
              <div className="col-span-2 text-right">XP</div>
              <div className="col-span-2 text-center">Streak</div>
              <div className="col-span-2 text-center">Languages</div>
            </div>

            {MOCK_LEADERBOARD.map((user) => (
              <div 
                key={user.rank}
                className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center"
              >
                <div className={`col-span-1 text-lg font-bold ${getRankColor(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {user.name}
                      {user.country && <span>{user.country}</span>}
                    </div>
                    <div className="text-sm text-slate-400">Level {user.level}</div>
                  </div>
                </div>
                <div className="col-span-2 text-right font-semibold text-brand-400">
                  {user.xp.toLocaleString()} XP
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-orange-400">🔥 {user.streak}</span>
                </div>
                <div className="col-span-2 text-center text-slate-400">
                  {user.languages}
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Your Ranking</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <div className="font-medium">You</div>
                  <div className="text-sm text-slate-400">Level 12</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-400">#42</div>
                <div className="text-sm text-slate-400">of 1,234 learners</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">2,450 XP</div>
                <div className="text-sm text-slate-400">to Level 13</div>
              </div>
            </div>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full" style={{ width: "60%" }} />
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/dashboard" className="btn-primary">
              Start Learning to Climb the Ranks →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}