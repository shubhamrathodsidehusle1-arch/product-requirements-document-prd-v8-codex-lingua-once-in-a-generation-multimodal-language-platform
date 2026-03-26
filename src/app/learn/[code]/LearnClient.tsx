"use client";

import { useState } from "react";
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

interface LearnClientProps {
  code: string;
  data: {
    path: any;
    units: any[];
    lessons: any[];
    vocab: any[];
    personas: any[];
    vocabCount: number;
    lessonCount: number;
  };
}

function parseJsonField(field: any, defaultValue: any = []): any {
  if (!field) return defaultValue;
  if (typeof field === "object") return field;
  try {
    return JSON.parse(field);
  } catch {
    return defaultValue;
  }
}

export default function LearnClient({ code, data }: LearnClientProps) {
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
      fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: "1", 
          message, 
          language: code 
        }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.response) {
          setChatHistory(prev => [...prev, { role: "assistant", content: data.response }]);
        } else {
          setChatHistory(prev => [...prev, { 
            role: "assistant", 
            content: "¡Muy bien! Keep practicing. Try using '¿Cómo estás?' in your next sentence." 
          }]);
        }
      })
      .catch(() => {
        setChatHistory(prev => [...prev, { 
          role: "assistant", 
          content: "¡Muy bien! Keep practicing. Try using '¿Cómo estás?' in your next sentence." 
        }]);
      });
    }, 1000);
  };

  const vocabList = data.vocab.map(v => ({
    word: v.word,
    translation: parseJsonField(v.translations)[0]?.translation || "",
    mastered: (v.repetitions || 0) >= 3,
  }));

  const renderContent = () => {
    switch (activeTab) {
      case "learn":
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass-card p-6">
                <div className="text-sm text-slate-400 mb-2">Current Level</div>
                <div className="text-3xl font-bold text-brand-400">{data.path?.cefrLevel || "A1"}</div>
                <div className="text-sm text-slate-500">{data.path?.name || "Beginner"}</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-sm text-slate-400 mb-2">Total Lessons</div>
                <div className="text-3xl font-bold text-accent-400">{data.lessonCount}</div>
                <div className="text-slate-500">{data.units.length} units</div>
              </div>
              <div className="glass-card p-6">
                <div className="text-sm text-slate-400 mb-2">Vocabulary</div>
                <div className="text-3xl font-bold text-brand-400">{data.vocabCount}</div>
                <div className="text-slate-500">words to learn</div>
              </div>
            </div>

            {data.units.length > 0 ? (
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Your Lessons</h3>
                <div className="space-y-3">
                  {data.units.map((unit) => {
                    const unitLessons = data.lessons.filter(l => l.unitId === unit.id);
                    return (
                      <div key={unit.id} className="border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-4 bg-brand-500/10 border-b border-white/10">
                          <div className="font-medium">Unit {unit.unitNumber}: {unit.title}</div>
                          <div className="text-sm text-slate-400">{unit.description}</div>
                        </div>
                        <div className="p-2">
                          {unitLessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
                                {lesson.contentType === "audio" ? "🎧" : lesson.contentType === "video" ? "📹" : "📖"}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{lesson.title}</div>
                                <div className="text-sm text-slate-400">{lesson.durationMinutes} min</div>
                              </div>
                              <Link 
                                href={`/learn/${code}/practice?lesson=${lesson.id}`}
                                className="px-4 py-2 bg-brand-500/20 text-brand-400 rounded-lg text-sm hover:bg-brand-500/30"
                              >
                                Practice
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 text-center">
                <p className="text-slate-400 mb-4">No curriculum content yet.</p>
                <Link href="/admin/content" className="btn-primary">
                  Generate Content
                </Link>
              </div>
            )}
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
        const masteredCount = vocabList.filter(v => v.mastered).length;
        const learningCount = vocabList.filter(v => !v.mastered).length;
        
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-green-400">{masteredCount}</div>
                <div className="text-sm text-slate-400">Mastered</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400">{learningCount}</div>
                <div className="text-sm text-slate-400">Learning</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-brand-400">{vocabList.length}</div>
                <div className="text-sm text-slate-400">Total Words</div>
              </div>
            </div>

            {vocabList.length > 0 ? (
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Vocabulary List</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {vocabList.map((word, i) => (
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
            ) : (
              <div className="glass-card p-6 text-center">
                <p className="text-slate-400 mb-4">No vocabulary yet.</p>
                <Link href="/admin/content" className="btn-primary">
                  Generate Vocabulary
                </Link>
              </div>
            )}

            {vocabList.length > 0 && (
              <Link href={`/learn/${code}/review`} className="btn-primary w-full py-4 text-center block">
                Start Vocabulary Review
              </Link>
            )}
          </div>
        );

      case "pronunciation":
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Pronunciation Practice</h3>
              <p className="text-slate-400 mb-4">
                Practice speaking with AI-powered pronunciation feedback
              </p>
              {vocabList.length > 0 ? (
                <div className="space-y-4">
                  {vocabList.slice(0, 5).map((word, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <button className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xl">
                        ▶
                      </button>
                      <div className="flex-1">
                        <div className="font-medium">{word.word}</div>
                        <div className="text-sm text-slate-400">{word.translation}</div>
                      </div>
                      <button className="btn-primary px-4 py-2 text-sm">Record</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">Generate vocabulary to practice pronunciation</p>
              )}
            </div>
          </div>
        );

      case "writing":
        return (
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Write in {lang.name}</h3>
              <textarea 
                placeholder="Write a sentence using what you've learned..."
                className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50"
              />
              <div className="flex gap-3 mt-4">
                <button className="btn-primary">Check Writing</button>
                <button className="btn-secondary">Get AI Feedback</button>
              </div>
            </div>
          </div>
        );

      case "community":
        const personas = data.personas;
        
        return (
          <div className="space-y-6">
            {personas.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">AI Conversation Partners</h3>
                <div className="space-y-3">
                  {personas.map((persona) => {
                    const personality = parseJsonField(persona.personality);
                    return (
                      <div key={persona.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xl">
                          👤
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{persona.name}</div>
                          <div className="text-sm text-slate-400">{persona.description}</div>
                        </div>
                        <button 
                          onClick={() => {
                            setActiveTab("tutor");
                          }}
                          className="btn-secondary text-sm px-4"
                        >
                          Chat
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Live Classes</h3>
              <p className="text-slate-400">No live classes scheduled yet.</p>
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