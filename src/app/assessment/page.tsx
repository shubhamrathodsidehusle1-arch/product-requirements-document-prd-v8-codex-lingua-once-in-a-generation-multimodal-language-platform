"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  type: "multiple_choice" | "fill_blank" | "audio";
  question: string;
  options?: string[];
  correctAnswer: string;
  language: string;
}

const SPANISH_QUESTIONS: Question[] = [
  {
    id: 1,
    type: "multiple_choice",
    question: "How do you say 'Hello' in Spanish?",
    options: ["Hola", "Adiós", "Gracias", "Por favor"],
    correctAnswer: "Hola",
    language: "es",
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "Which of these is 'Thank you'?",
    options: ["Por favor", "De nada", "Gracias", "Hola"],
    correctAnswer: "Gracias",
    language: "es",
  },
  {
    id: 3,
    type: "fill_blank",
    question: "Complete: Me _____ María. (My name is)",
    correctAnswer: "llamo",
    language: "es",
  },
  {
    id: 4,
    type: "multiple_choice",
    question: "What does 'Buenos días' mean?",
    options: ["Good night", "Good morning", "Goodbye", "See you later"],
    correctAnswer: "Good morning",
    language: "es",
  },
  {
    id: 5,
    type: "multiple_choice",
    question: "Which article goes with 'casa' (house)?",
    options: ["el", "la", "los", "las"],
    correctAnswer: "la",
    language: "es",
  },
  {
    id: 6,
    type: "fill_blank",
    question: "The plural of 'casa' is _____",
    correctAnswer: "casas",
    language: "es",
  },
  {
    id: 7,
    type: "multiple_choice",
    question: "Choose the correct conjugation: 'Yo _____ español' (I speak Spanish)",
    options: ["hablar", "habla", "hablo", "hablamos"],
    correctAnswer: "hablo",
    language: "es",
  },
  {
    id: 8,
    type: "multiple_choice",
    question: "What time is 'tres de la tarde'?",
    options: ["3:00 AM", "3:00 PM", "2:00 PM", "3:00 in the afternoon"],
    correctAnswer: "3:00 PM",
    language: "es",
  },
];

type LanguageOption = {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
};

const LANGUAGES: LanguageOption[] = [
  { code: "es", name: "Spanish", flag: "🇪🇸", nativeName: "Español" },
  { code: "fr", name: "French", flag: "🇫🇷", nativeName: "Français" },
  { code: "de", name: "German", flag: "🇩🇪", nativeName: "Deutsch" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", nativeName: "日本語" },
  { code: "zh", name: "Chinese", flag: "🇨🇳", nativeName: "中文" },
  { code: "ko", name: "Korean", flag: "🇰🇷", nativeName: "한국어" },
  { code: "it", name: "Italian", flag: "🇮🇹", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹", nativeName: "Português" },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState<"language" | "assessment" | "results">("language");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = SPANISH_QUESTIONS;
  const question = questions[currentQuestion];

  const handleSelectLanguage = (code: string) => {
    setSelectedLanguage(code);
    setStep("assessment");
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [question.id]: answer });
  };

  const handleSubmitAnswer = () => {
    const isCorrect = answers[question.id]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    setScore((prev) => prev + (isCorrect ? 1 : 0));
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setStep("results");
    }
  };

  const getCefrLevel = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "B1";
    if (percentage >= 60) return "A2";
    if (percentage >= 40) return "A1";
    return "Beginner";
  };

  const getLevelDescription = () => {
    const level = getCefrLevel();
    const descriptions: Record<string, string> = {
      B1: "You can handle most situations likely to arise while traveling in the language region. You can describe experiences, events, dreams, and ambitions, and give reasons for opinions.",
      A2: "You can communicate in simple and routine tasks requiring direct exchange of information on familiar topics and activities.",
      A1: "You can understand and use familiar everyday expressions and very basic phrases. You can introduce yourself and ask questions about personal details.",
      "Beginner": "You are just starting your language journey. We recommend beginning with foundational vocabulary and basic phrases.",
    };
    return descriptions[level] || descriptions["Beginner"];
  };

  if (step === "language") {
    return (
      <div className="min-h-screen bg-surface-dark">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Take the <span className="gradient-text">Placement Assessment</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Select a language to determine your current level
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className="glass-card p-6 text-left hover:border-brand-500/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{lang.flag}</div>
                  <div>
                    <div className="font-semibold text-lg group-hover:text-brand-400 transition-colors">
                      {lang.name}
                    </div>
                    <div className="text-slate-400 text-sm">{lang.nativeName}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === "results") {
    const level = getCefrLevel();
    return (
      <div className="min-h-screen bg-surface-dark">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="glass-card p-8">
            <div className="text-6xl mb-6">
              {level === "B1" ? "🏅" : level === "A2" ? "⭐" : level === "A1" ? "🌱" : "🚀"}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Your Level: <span className="gradient-text">{level}</span>
            </h1>
            <p className="text-slate-400 mb-8">
              You got {score} out of {questions.length} questions correct
            </p>
            <p className="text-slate-300 mb-8">{getLevelDescription()}</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push(`/learn/${selectedLanguage}`)}
                className="btn-primary py-4"
              >
                Start Learning at {level} Level
              </button>
              <button
                onClick={() => {
                  setStep("language");
                  setCurrentQuestion(0);
                  setAnswers({});
                  setScore(0);
                }}
                className="btn-secondary py-4"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-dark">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span className="px-3 py-1 bg-brand-500/20 text-brand-400 rounded-full">
              {selectedLanguage === "es" ? "🇪🇸 Spanish" : "Assessment"}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-slate-500">
              {question.type === "multiple_choice" ? "Multiple Choice" : 
               question.type === "fill_blank" ? "Fill in the Blank" : "Listening"}
            </span>
          </div>

          <h2 className="text-2xl font-semibold mb-8">{question.question}</h2>

          {question.type === "multiple_choice" && question.options && (
            <div className="space-y-3">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    answers[question.id] === option
                      ? "bg-brand-500/20 border-brand-500 border"
                      : "bg-white/5 hover:bg-white/10 border border-transparent"
                  } ${
                    showResult && option === question.correctAnswer
                      ? "bg-green-500/20 border-green-500"
                      : ""
                  } ${
                    showResult && answers[question.id] === option && answers[question.id] !== question.correctAnswer
                      ? "bg-red-500/20 border-red-500"
                      : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {question.type === "fill_blank" && (
            <div>
              <input
                type="text"
                value={answers[question.id] || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                disabled={showResult}
                placeholder="Type your answer..."
                className="input-search w-full"
              />
            </div>
          )}

          {showResult && (
            <div className={`mt-6 p-4 rounded-xl ${
              answers[question.id]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-red-500/10 border border-red-500/30"
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">
                  {answers[question.id]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() ? "✅" : "❌"}
                </span>
                <span className="font-semibold text-lg">
                  {answers[question.id]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() ? "Correct!" : "Incorrect"}
                </span>
              </div>
              {answers[question.id]?.toLowerCase().trim() !== question.correctAnswer.toLowerCase().trim() && (
                <p className="text-slate-400">
                  The correct answer is: <span className="text-white font-medium">{question.correctAnswer}</span>
                </p>
              )}
            </div>
          )}

          <div className="mt-8">
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!answers[question.id]}
                className="btn-primary w-full py-4 disabled:opacity-50"
              >
                Check Answer
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary w-full py-4">
                {currentQuestion < questions.length - 1 ? "Next Question →" : "See Results"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}