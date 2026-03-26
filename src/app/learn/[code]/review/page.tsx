"use client";

import { useState, use } from "react";
import Link from "next/link";

const MOCK_DECK = [
  { id: 1, word: "hola", translation: "Hello", phonetic: "OH-lah", mastered: false },
  { id: 2, word: "gracias", translation: "Thank you", phonetic: "GRAH-see-ahs", mastered: false },
  { id: 3, word: "por favor", translation: "Please", phonetic: "por fah-VOR", mastered: false },
  { id: 4, word: "buenos días", translation: "Good morning", phonetic: "BWEH-nohs DEE-ahs", mastered: false },
  { id: 5, word: "adiós", translation: "Goodbye", phonetic: "ah-dee-OHS", mastered: false },
];

type CardState = "question" | "answer" | "completed";

export default function VocabularyReviewPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardState, setCardState] = useState<CardState>("question");
  const [reviewedCount, setReviewedCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const card = MOCK_DECK[currentIndex];

  const handleFlip = () => {
    if (cardState === "question") {
      setCardState("answer");
    }
  };

  const handleRating = (quality: number) => {
    setReviewedCount(prev => prev + 1);
    
    if (currentIndex < MOCK_DECK.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCardState("question");
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-surface-dark flex items-center justify-center p-4">
        <div className="glass-card p-12 text-center max-w-md">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Review Complete!</h2>
          <p className="text-slate-400 mb-6">
            You reviewed {reviewedCount} words
          </p>
          <div className="space-y-3">
            <Link href={`/learn/${code}`} className="btn-primary block">
              Back to Learning
            </Link>
            <button onClick={() => { setCurrentIndex(0); setReviewedCount(0); setCompleted(false); }} className="btn-secondary w-full">
              Review Again
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
            <span className="text-slate-400">{currentIndex + 1} / {MOCK_DECK.length}</span>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
              <span>Progress</span>
              <span>{Math.round(((currentIndex + 1) / MOCK_DECK.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / MOCK_DECK.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="glass-card p-12 text-center">
            {cardState === "question" ? (
              <>
                <p className="text-sm text-slate-400 mb-4">What does this word mean?</p>
                <div className="text-5xl font-bold mb-4">{card.word}</div>
                <p className="text-2xl text-slate-500 mb-8">[{card.phonetic}]</p>
                <button onClick={handleFlip} className="btn-primary">
                  Show Answer
                </button>
              </>
            ) : (
              <>
                <div className="text-4xl font-bold mb-4">{card.word}</div>
                <div className="text-3xl text-brand-400 mb-4">{card.translation}</div>
                <p className="text-slate-500 mb-8">[{card.phonetic}]</p>
                
                <p className="text-sm text-slate-400 mb-4">How well did you remember?</p>
                <div className="grid grid-cols-4 gap-3">
                  <button
                    onClick={() => handleRating(0)}
                    className="p-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors"
                  >
                    <div className="text-2xl mb-1">😓</div>
                    <div className="text-xs">Again</div>
                  </button>
                  <button
                    onClick={() => handleRating(2)}
                    className="p-4 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-xl transition-colors"
                  >
                    <div className="text-2xl mb-1">😕</div>
                    <div className="text-xs">Hard</div>
                  </button>
                  <button
                    onClick={() => handleRating(3)}
                    className="p-4 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl transition-colors"
                  >
                    <div className="text-2xl mb-1">😊</div>
                    <div className="text-xs">Good</div>
                  </button>
                  <button
                    onClick={() => handleRating(5)}
                    className="p-4 bg-brand-500/20 hover:bg-brand-500/30 text-brand-400 rounded-xl transition-colors"
                  >
                    <div className="text-2xl mb-1">🤩</div>
                    <div className="text-xs">Easy</div>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link href={`/learn/${code}`} className="text-slate-400 hover:text-white">
              ← Exit Review
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}