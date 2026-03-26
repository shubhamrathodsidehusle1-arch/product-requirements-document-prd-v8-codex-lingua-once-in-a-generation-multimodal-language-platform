"use client";

import { useState } from "react";
import Link from "next/link";

interface Exam {
  id: string;
  name: string;
  fullName: string;
  description: string;
  levels: string[];
  icon: string;
  color: string;
}

const EXAMS: Exam[] = [
  {
    id: "ielts",
    name: "IELTS",
    fullName: "International English Language Testing System",
    description: "Accepted by over 11,000 organizations in 140 countries. Tests all English skills: reading, writing, listening, and speaking.",
    levels: ["Band 4-5 (A2)", "Band 5.5-6 (B1)", "Band 6.5-7 (B2)", "Band 7.5-8.5 (C1)", "Band 9 (C2)"],
    icon: "🇬🇧",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "dele",
    name: "DELE",
    fullName: "Diplomas de Español como Lengua Extranjera",
    description: "Official Spanish language diplomas issued by the Instituto Cervantes. Valid indefinitely and recognized worldwide.",
    levels: ["A1 (Iniciación)", "A2 (Básico)", "B1 (Intermedio)", "B2 (Intermedio Alto)", "C1 (Superior)", "C2 (Maestría)"],
    icon: "🇪🇸",
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: "jlpt",
    name: "JLPT",
    fullName: "Japanese-Language Proficiency Test",
    description: "The most widely taken Japanese language test in the world. N5-N1 levels from beginner to advanced.",
    levels: ["N5 (Beginner)", "N4 (Elementary)", "N3 (Intermediate)", "N2 (Upper-Intermediate)", "N1 (Advanced)"],
    icon: "🇯🇵",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "hsk",
    name: "HSK",
    fullName: "Hanyu Shuiping Kaoshi",
    description: "Chinese proficiency test standardized by the Ministry of Education of China. HSK 1-6 levels.",
    levels: ["HSK 1 (150 words)", "HSK 2 (300 words)", "HSK 3 (600 words)", "HSK 4 (1200 words)", "HSK 5 (2500 words)", "HSK 6 (5000 words)"],
    icon: "🇨🇳",
    color: "from-red-600 to-yellow-500",
  },
  {
    id: "delf",
    name: "DELF",
    fullName: "Diplôme d'Études en Langue Française",
    description: "French language diplomas awarded by the French Ministry of Education. Valid for life.",
    levels: ["A1 (Découverte)", "A2 (Intermédiaire)", "B1 (Avancé)", "B2 (Avancé Supérieur)"],
    icon: "🇫🇷",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "goethe",
    name: "Goethe-Zertifikat",
    fullName: "German Language Diploma",
    description: "Official German language certificates from Goethe-Institut. Recognized worldwide.",
    levels: ["A1 (Start Deutsch 1)", "A2 (Start Deutsch 2)", "B1 (Zertifikat Deutsch)", "B2 (Zertifikat Deutsch für den Beruf)", "C1 (Zertifikat Deutsch für den Beruf)", "C2 (Kleines Deutsches Sprachdiplom)"],
    icon: "🇩🇪",
    color: "from-yellow-600 to-amber-600",
  },
];

interface PracticeTest {
  id: number;
  title: string;
  exam: string;
  level: string;
  duration: number;
  questions: number;
  difficulty: "easy" | "medium" | "hard";
}

const MOCK_TESTS: PracticeTest[] = [
  { id: 1, title: "IELTS Reading: Academic", exam: "ielts", level: "B2", duration: 60, questions: 40, difficulty: "hard" },
  { id: 2, title: "IELTS Listening Practice", exam: "ielts", level: "B1", duration: 30, questions: 40, difficulty: "medium" },
  { id: 3, title: "DELE B1: Reading Comprehension", exam: "dele", level: "B1", duration: 45, questions: 30, difficulty: "medium" },
  { id: 4, title: "JLPT N5: Kanji & Vocabulary", exam: "jlpt", level: "N5", duration: 30, questions: 50, difficulty: "easy" },
  { id: 5, title: "JLPT N4: Grammar & Reading", exam: "jlpt", level: "N4", duration: 45, questions: 45, difficulty: "medium" },
  { id: 6, title: "HSK 2: Listening", exam: "hsk", level: "HSK 2", duration: 20, questions: 35, difficulty: "easy" },
];

export default function ExamPrepPage() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"exams" | "practice">("exams");

  const exam = EXAMS.find(e => e.id === selectedExam);
  const filteredTests = selectedExam 
    ? MOCK_TESTS.filter(t => t.exam === selectedExam)
    : MOCK_TESTS;

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
            <Link href="/exam-prep" className="nav-link text-brand-400">Exam Prep</Link>
            <Link href="/achievements" className="nav-link">Achievements</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Exam Preparation</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Practice for standardized language proficiency tests with AI-powered simulations and detailed feedback
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("exams")}
              className={`px-6 py-3 rounded-full transition-all ${
                activeTab === "exams" 
                  ? "bg-brand-500 text-white" 
                  : "bg-white/10 text-slate-400 hover:text-white"
              }`}
            >
              📚 Exam Guides
            </button>
            <button
              onClick={() => setActiveTab("practice")}
              className={`px-6 py-3 rounded-full transition-all ${
                activeTab === "practice" 
                  ? "bg-brand-500 text-white" 
                  : "bg-white/10 text-slate-400 hover:text-white"
              }`}
            >
              📝 Practice Tests
            </button>
          </div>

          {activeTab === "exams" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXAMS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSelectedExam(selectedExam === e.id ? null : e.id)}
                  className={`glass-card p-6 text-left transition-all ${
                    selectedExam === e.id ? "border-brand-500" : "hover:border-brand-500/50"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{e.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{e.name}</h3>
                      <p className="text-sm text-slate-400">{e.fullName}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{e.description}</p>
                  
                  {selectedExam === e.id && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-sm font-semibold mb-3 text-brand-400">Available Levels:</h4>
                      <div className="flex flex-wrap gap-2">
                        {e.levels.map((level, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 text-xs rounded">
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {activeTab === "practice" && (
            <div className="space-y-6">
              <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedExam(null)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    !selectedExam 
                      ? "bg-brand-500 text-white" 
                      : "bg-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  All Exams
                </button>
                {EXAMS.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setSelectedExam(e.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedExam === e.id 
                        ? "bg-brand-500 text-white" 
                        : "bg-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {e.icon} {e.name}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTests.map((test) => {
                  const examInfo = EXAMS.find(e => e.id === test.exam);
                  return (
                    <div key={test.id} className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{examInfo?.icon}</span>
                        <div>
                          <h3 className="font-semibold">{test.title}</h3>
                          <div className="text-sm text-slate-400">{test.exam.toUpperCase()} • {test.level}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                        <span>⏱️ {test.duration} min</span>
                        <span>❓ {test.questions} questions</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          test.difficulty === "easy" ? "bg-green-500/20 text-green-400" :
                          test.difficulty === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-red-500/20 text-red-400"
                        }`}>
                          {test.difficulty}
                        </span>
                      </div>

                      <button className="btn-primary w-full">
                        Start Test →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-16 glass-card p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Practice with Codex Lingua?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="font-semibold mb-2">AI-Powered Feedback</h3>
                <p className="text-slate-400 text-sm">Get instant, detailed feedback on your answers with explanations from AI tutors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-semibold mb-2">Progress Tracking</h3>
                <p className="text-slate-400 text-sm">Track your scores and see how you compare to other test-takers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Targeted Practice</h3>
                <p className="text-slate-400 text-sm">Focus on your weak areas with personalized recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}