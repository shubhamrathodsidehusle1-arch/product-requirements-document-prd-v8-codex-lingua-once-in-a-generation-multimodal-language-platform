"use client";

import { useState, use } from "react";
import Link from "next/link";

const LANGUAGE_INFO: Record<string, { name: string; nativeName: string; flag: string; level: string }> = {
  es: { name: "Spanish", nativeName: "Español", flag: "🇪🇸", level: "A1" },
  en: { name: "English", nativeName: "English", flag: "🇬🇧", level: "A1" },
  zh: { name: "Chinese", nativeName: "中文", flag: "🇨🇳", level: "A1" },
  fr: { name: "French", nativeName: "Français", flag: "🇫🇷", level: "A1" },
  de: { name: "German", nativeName: "Deutsch", flag: "🇩🇪", level: "A1" },
  ja: { name: "Japanese", nativeName: "日本語", flag: "🇯🇵", level: "A1" },
  ko: { name: "Korean", nativeName: "한국어", flag: "🇰🇷", level: "A1" },
  pt: { name: "Portuguese", nativeName: "Português", flag: "🇵🇹", level: "A1" },
  it: { name: "Italian", nativeName: "Italiano", flag: "🇮🇹", level: "A1" },
  ru: { name: "Russian", nativeName: "Русский", flag: "🇷🇺", level: "A1" },
};

type TabType = "learn" | "tutor" | "vocabulary" | "pronunciation" | "writing" | "community";

const LESSONS = [
  { id: 1, title: "Basic Greetings", type: "reading", duration: 15, completed: true },
  { id: 2, title: "Numbers 1-20", type: "listening", duration: 12, completed: true },
  { id: 3, title: "Introduce Yourself", type: "speaking", duration: 20, completed: false },
  { id: 4, title: "Family Members", type: "vocabulary", duration: 18, completed: false },
  { id: 5, title: "Food & Drinks", type: "reading", duration: 22, completed: false },
  { id: 6, title: "At the Restaurant", type: "speaking", duration: 25, completed: false },
];

const VOCABULARY_DECK = [
  { word: "Hola", translation: "Hello", mastered: true },
  { word: "Gracias", translation: "Thank you", mastered: true },
  { word: "Por favor", translation: "Please", mastered: true },
  { word: "Buenos días", translation: "Good morning", mastered: false },
  { word: "Adiós", translation: "Goodbye", mastered: false },
  { word: "Lo siento", translation: "I'm sorry", mastered: false },
];

export default function LearnPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [activeTab, setActiveTab] = useState<TabType>("learn");
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "¡Hola! I'm your Spanish tutor. How can I help you practice today?" },
  ]);

  const lang = LANGUAGE_INFO[code] || { name: "Language", nativeName: "Language", flag: "🌐", level: "A1" };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "learn", label: "Learn", icon: "📚" },
    { id: "tutor", label: "AI Tutor", icon: "🤖" },
    { id: "vocabulary", label: "Vocabulary", icon: "📝" },
    { id: "pronunciation", label: "Speaking", icon: "🎤" },
    { id: "writing", label: "Writing", icon: "✍️" },
    { id: "community", label: "Community", icon: "👥" },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setChatHistory([...chatHistory, { role: "user", content: message }]);
    setMessage("");
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: "¡Muy bien! Keep practicing. Try using '¿Cómo estás?' in your next sentence." 
      }]);
    }, 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "learn":
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass-card p-6">
                <div className="text-sm text-slate-400 mb-2">Current Level</div>
                <div className="text-3xl font-bold text-brand-400">{lang.level}</div>
                <div className="text-sm text-slate-500">Beginner</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-sm text-slate-400 mb-2">XP Progress</div>
                <div className="text-3xl font-bold text-accent-400">847</div>
                <div className="text-sm text-slate-500">1,200 to next level</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-sm text-slate-400 mb-2">Today&apos;s Goal</div>
                <div className="text-3xl font-bold text-brand-400">45</div>
                <div className="text-sm text-slate-500">/ 50 XP</div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Your Lessons</h3>
              <div className="space-y-3">
                {LESSONS.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      selectedLesson === lesson.id 
                        ? "bg-brand-500/20 border-brand-500/50" 
                        : "bg-white/5 hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      lesson.completed ? "bg-green-500/20 text-green-400" : "bg-brand-500/20 text-brand-400"
                    }`}>
                      {lesson.completed ? "✓" : lesson.type === "speaking" ? "🎤" : lesson.type === "listening" ? "🎧" : "📖"}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-sm text-slate-400">{lesson.duration} min</div>
                    </div>
                    <Link 
                      href={`/learn/${code}/practice`}
                      className="px-4 py-2 bg-brand-500/20 text-brand-400 rounded-lg text-sm hover:bg-brand-500/30"
                    >
                      Practice
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "tutor":
        return (
          <div className="h-[calc(100vh-300px)] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 p-4 mb-4">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === "user" 
                      ? "bg-brand-500 text-white" 
                      : "bg-white/10 text-slate-200"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="input-search flex-1"
              />
              <button 
                onClick={handleSendMessage}
                className="btn-primary px-6"
              >
                Send
              </button>
            </div>
          </div>
        );

      case "vocabulary":
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-green-400">32</div>
                <div className="text-sm text-slate-400">Mastered</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400">18</div>
                <div className="text-sm text-slate-400">Learning</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-brand-400">5</div>
                <div className="text-sm text-slate-400">Due for Review</div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Vocabulary Deck - Essential Greetings</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {VOCABULARY_DECK.map((word, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <div className="font-medium">{word.word}</div>
                      <div className="text-sm text-slate-400">{word.translation}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      word.mastered 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {word.mastered ? "Mastered" : "Learning"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn-primary w-full py-4">
              Start Vocabulary Review (5 due)
            </button>
          </div>
        );

      case "pronunciation":
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Pronunciation Practice</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <button className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xl">
                    ▶
                  </button>
                  <div className="flex-1">
                    <div className="font-medium">Hola</div>
                    <div className="text-sm text-slate-400">Click to listen</div>
                  </div>
                  <div className="text-green-400 font-medium">Perfect</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <button className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xl">
                    ▶
                  </button>
                  <div className="flex-1">
                    <div className="font-medium">Gracias</div>
                    <div className="text-sm text-slate-400">Click to listen</div>
                  </div>
                  <div className="text-yellow-400 font-medium">Good</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <button className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xl">
                    ▶
                  </button>
                  <div className="flex-1">
                    <div className="font-medium">Buenos días</div>
                    <div className="text-sm text-slate-400">Click to listen</div>
                  </div>
                  <button className="btn-primary px-4 py-2 text-sm">Record</button>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3">Record Your Voice</h3>
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎤</span>
                </div>
                <p className="text-slate-400 mb-4">Click to start recording</p>
                <button className="btn-primary">Start Recording</button>
              </div>
            </div>
          </div>
        );

      case "writing":
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Write in Spanish</h3>
              <textarea 
                placeholder="Write a sentence using what you've learned..."
                className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50"
              />
              <div className="flex gap-3 mt-4">
                <button className="btn-primary">Check Writing</button>
                <button className="btn-secondary">Get AI Feedback</button>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3">Writing Templates</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  📧 Write an email to a friend
                </button>
                <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  📝 Describe your daily routine
                </button>
                <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  🏪 Write a restaurant order
                </button>
              </div>
            </div>
          </div>
        );

      case "community":
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Spanish Learning Community</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-500 to-brand-500 flex items-center justify-center">
                    🇪🇸
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Spanish Conversation Club</div>
                    <div className="text-sm text-slate-400">1,234 members • 23 online</div>
                  </div>
                  <button className="btn-secondary text-sm px-4">Join</button>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-brand-500 flex items-center justify-center">
                    🎯
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Daily Challenge Quests</div>
                    <div className="text-sm text-slate-400">Complete missions, earn XP</div>
                  </div>
                  <span className="text-brand-400">3 active</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3">Live Events</h3>
              <div className="space-y-2">
                <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                  <div className="font-medium text-brand-400">🎙️ Live: Spanish Storytelling</div>
                  <div className="text-sm text-slate-400">Starting in 30 minutes</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-medium">📚 Grammar Workshop: Ser vs Estar</div>
                  <div className="text-sm text-slate-400">Tomorrow, 3:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <span className="text-2xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              <span className="text-slate-400 text-sm">• {lang.level}</span>
            </div>
            <button className="btn-secondary text-sm">🔥 7 day streak</button>
          </div>
        </div>
      </nav>

      <div className="pt-20 flex">
        <aside className="w-64 fixed left-0 top-20 bottom-0 border-r border-white/5 bg-surface-dark/50 p-4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-accent-500/10 border border-accent-500/20 rounded-xl">
            <div className="text-sm text-slate-400 mb-2">Daily Progress</div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="w-[80%] h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full" />
            </div>
            <div className="text-sm text-slate-400 mt-2">45 / 50 XP</div>
          </div>
        </aside>

        <main className="flex-1 ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}