"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const LANGUAGE_DETAILS: Record<string, {
  name: string;
  nativeName: string;
  flag: string;
  tier: "A" | "B" | "C";
  speakers: string;
  difficulty: string;
  description: string;
  features: string[];
  levels: { level: string; description: string; hours: number }[];
}> = {
  es: {
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    tier: "A",
    speakers: "543M+",
    difficulty: "Easy for English speakers",
    description: "Spanish is the second most spoken language in the world by native speakers. With roots in Latin, it shares many similarities with other Romance languages.",
    features: ["AI Tutor", "Vocabulary SRS", "Pronunciation Lab", "Writing Studio", "Live Classes"],
    levels: [
      { level: "A1", description: "Beginner", hours: 40 },
      { level: "A2", description: "Elementary", hours: 60 },
      { level: "B1", description: "Intermediate", hours: 80 },
      { level: "B2", description: "Upper Intermediate", hours: 100 },
      { level: "C1", description: "Advanced", hours: 120 },
      { level: "C2", description: "Proficient", hours: 150 },
    ],
  },
  ja: {
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    tier: "A",
    speakers: "125M",
    difficulty: "Challenging for English speakers",
    description: "Japanese is a fascinating language with three writing systems: hiragana, katakana, and kanji. Known for its politeness levels and unique sentence structure.",
    features: ["AI Tutor", "Vocabulary SRS", "Pronunciation Lab", "Kanji Trainer", "Live Classes"],
    levels: [
      { level: "N5", description: "Beginner", hours: 60 },
      { level: "N4", description: "Elementary", hours: 80 },
      { level: "N3", description: "Intermediate", hours: 120 },
      { level: "N2", description: "Upper Intermediate", hours: 150 },
      { level: "N1", description: "Advanced", hours: 200 },
    ],
  },
  zh: {
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    tier: "A",
    speakers: "1.1B+",
    difficulty: "Very challenging",
    description: "Chinese is the most spoken language in the world. It uses characters instead of an alphabet, with each character representing a word or concept.",
    features: ["AI Tutor", "Vocabulary SRS", "Pronunciation Lab", "Character Trainer", "Pinyin Input"],
    levels: [
      { level: "HSK1", description: "150 words", hours: 40 },
      { level: "HSK2", description: "300 words", hours: 60 },
      { level: "HSK3", description: "600 words", hours: 80 },
      { level: "HSK4", description: "1200 words", hours: 120 },
      { level: "HSK5", description: "2500 words", hours: 160 },
      { level: "HSK6", description: "5000+ words", hours: 200 },
    ],
  },
};

const DEFAULT_LANG = {
  name: "Language",
  nativeName: "Language",
  flag: "🌐",
  tier: "B" as const,
  speakers: "Unknown",
  difficulty: "Varies",
  description: "Start learning this language with our AI-powered platform.",
  features: ["AI Tutor", "Vocabulary SRS", "Pronunciation Lab"],
  levels: [
    { level: "A1", description: "Beginner", hours: 40 },
    { level: "A2", description: "Elementary", hours: 60 },
    { level: "B1", description: "Intermediate", hours: 80 },
    { level: "B2", description: "Upper Intermediate", hours: 100 },
  ],
};

export default function LanguageDetailPage() {
  const params = useParams();
  const code = params.code as string;
  const lang = LANGUAGE_DETAILS[code] || { ...DEFAULT_LANG, name: code.toUpperCase() };

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
            <Link href={`/learn/${code}`} className="nav-link text-brand-400">Start Learning</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <div className="text-8xl">{lang.flag}</div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold">{lang.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  lang.tier === "A" ? "bg-brand-500/20 text-brand-400" :
                  lang.tier === "B" ? "bg-accent-500/20 text-accent-400" :
                  "bg-slate-500/20 text-slate-400"
                }`}>
                  Tier {lang.tier} • Full AI Support
                </span>
              </div>
              <p className="text-2xl text-slate-400">{lang.nativeName}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Native Speakers</span>
                  <span className="font-semibold">{lang.speakers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Difficulty</span>
                  <span className="font-semibold text-yellow-400">{lang.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">AI Support</span>
                  <span className="font-semibold text-green-400">Full</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Included Features</h3>
              <div className="flex flex-wrap gap-2">
                {lang.features.map((feature, i) => (
                  <span key={i} className="px-3 py-1 bg-brand-500/20 text-brand-400 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Start Learning</h3>
              <p className="text-slate-400 mb-4">{lang.description}</p>
              <Link href="/assessment" className="btn-primary w-full text-center block">
                Take Placement Test
              </Link>
            </div>
          </div>

          <div className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">CEFR Levels</h2>
            <p className="text-slate-400 mb-8">
              Our curriculum follows the Common European Framework of Reference for Languages
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lang.levels.map((level, i) => (
                <div 
                  key={i} 
                  className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-brand-400">{level.level}</span>
                    <span className="text-sm text-slate-400">{level.hours}h</span>
                  </div>
                  <div className="text-slate-300">{level.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href={`/learn/${code}`} className="btn-primary text-lg px-12 py-4">
              Start Learning {lang.name} →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}