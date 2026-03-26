"use client";

import { useState, use } from "react";
import Link from "next/link";

const LANGUAGE_INFO: Record<string, { name: string; flag: string }> = {
  es: { name: "Spanish", flag: "🇪🇸" },
  en: { name: "English", flag: "🇬🇧" },
  fr: { name: "French", flag: "🇫🇷" },
  de: { name: "German", flag: "🇩🇪" },
  ja: { name: "Japanese", flag: "🇯🇵" },
};

type Exercise = {
  id: number;
  exerciseType: string;
  content: string;
  pointsPossible: number;
};

const MOCK_EXERCISES: Exercise[] = [
  { id: 1, exerciseType: "multiple_choice", content: JSON.stringify({ question: "How do you say 'Hello' in Spanish?", options: ["Hola", "Adiós", "Gracias", "Por favor"], correctAnswer: "Hola" }), pointsPossible: 10 },
  { id: 2, exerciseType: "fill_blank", content: JSON.stringify({ question: "Complete: ___ (Hello)", correctAnswer: "Hola", hint: "Starts with H" }), pointsPossible: 15 },
  { id: 3, exerciseType: "matching", content: JSON.stringify({ pairs: [{ term: "Hola", definition: "Hello" }, { term: "Adiós", definition: "Goodbye" }, { term: "Gracias", definition: "Thank you" }, { term: "Por favor", definition: "Please" }] }), pointsPossible: 20 },
  { id: 4, exerciseType: "multiple_choice", content: JSON.stringify({ question: "What does 'Me llamo' mean?", options: ["My name is", "I am from", "I like", "Thank you"], correctAnswer: "My name is" }), pointsPossible: 10 },
  { id: 5, exerciseType: "fill_blank", content: JSON.stringify({ question: "Three = ___", correctAnswer: "tres", hint: "Sounds like 'trace'" }), pointsPossible: 15 },
];

export default function PracticePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [textAnswer, setTextAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const lang = LANGUAGE_INFO[code] || { name: "Language", flag: "🌐" };
  const exercise = MOCK_EXERCISES[currentIndex];
  const content = JSON.parse(exercise.content);

  const handleMultipleChoice = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    let correct = false;
    let earnedScore = 0;

    if (exercise.exerciseType === "multiple_choice") {
      correct = selectedAnswer === content.correctAnswer;
      earnedScore = correct ? exercise.pointsPossible : 0;
    } else if (exercise.exerciseType === "fill_blank") {
      const userAnswer = textAnswer.toLowerCase().trim();
      const correctAnswer = content.correctAnswer.toLowerCase().trim();
      correct = userAnswer === correctAnswer;
      earnedScore = correct ? exercise.pointsPossible : Math.floor(exercise.pointsPossible * 0.5);
    }

    setIsCorrect(correct);
    setTotalScore(prev => prev + earnedScore);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < MOCK_EXERCISES.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer("");
      setTextAnswer("");
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-surface-dark flex items-center justify-center p-4">
        <div className="glass-card p-12 text-center max-w-md">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Practice Complete!</h2>
          <p className="text-slate-400 mb-6">
            You scored {totalScore} points
          </p>
          <div className="space-y-3">
            <Link href={`/learn/${code}`} className="btn-primary block">
              Back to Learning
            </Link>
            <button onClick={() => { setCurrentIndex(0); setTotalScore(0); setCompleted(false); }} className="btn-secondary w-full">
              Practice Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-surface-dark/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/learn/${code}`} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xl font-bold">
              C
            </div>
            <span className="text-xl font-bold gradient-text">Codex Lingua</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-2xl">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            <span className="px-3 py-1 bg-brand-500/20 text-brand-400 rounded-full text-sm">
              {currentIndex + 1} / {MOCK_EXERCISES.length}
            </span>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
              <span>Progress</span>
              <span>{Math.round((currentIndex / MOCK_EXERCISES.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / MOCK_EXERCISES.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="glass-card p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-xs ${
                exercise.exerciseType === "multiple_choice" ? "bg-brand-500/20 text-brand-400" :
                exercise.exerciseType === "fill_blank" ? "bg-accent-500/20 text-accent-400" :
                "bg-green-500/20 text-green-400"
              }`}>
                {exercise.exerciseType === "multiple_choice" ? "Multiple Choice" :
                 exercise.exerciseType === "fill_blank" ? "Fill in the Blank" :
                 "Matching"}
              </span>
              <span className="text-slate-400 text-sm">{exercise.pointsPossible} points</span>
            </div>

            <h2 className="text-2xl font-semibold mb-8">{content.question}</h2>

            {exercise.exerciseType === "multiple_choice" && (
              <div className="space-y-3">
                {content.options.map((option: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleMultipleChoice(option)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAnswer === option
                        ? "bg-brand-500/20 border-brand-500 border"
                        : "bg-white/5 hover:bg-white/10 border border-transparent"
                    } ${showResult && option === content.correctAnswer ? "bg-green-500/20 border-green-500" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {exercise.exerciseType === "fill_blank" && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  disabled={showResult}
                  placeholder="Type your answer..."
                  className="input-search"
                />
                {content.hint && !showResult && (
                  <p className="text-slate-400 text-sm">💡 {content.hint}</p>
                )}
              </div>
            )}

            {showResult && (
              <div className={`mt-6 p-4 rounded-xl ${isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{isCorrect ? "✅" : "❌"}</span>
                  <span className="font-semibold text-lg">
                    {isCorrect ? "Correct!" : "Not quite"}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-slate-400">
                    The correct answer is: <span className="text-white font-medium">{content.correctAnswer}</span>
                  </p>
                )}
                <p className="text-slate-400 mt-2">
                  +{isCorrect ? exercise.pointsPossible : Math.floor(exercise.pointsPossible * 0.5)} points
                </p>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={exercise.exerciseType === "multiple_choice" ? !selectedAnswer : !textAnswer}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  Check Answer
                </button>
              ) : (
                <button onClick={handleNext} className="btn-primary flex-1">
                  {currentIndex < MOCK_EXERCISES.length - 1 ? "Next Exercise →" : "Finish"}
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href={`/learn/${code}`} className="text-slate-400 hover:text-white">
              ← Exit Practice
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}