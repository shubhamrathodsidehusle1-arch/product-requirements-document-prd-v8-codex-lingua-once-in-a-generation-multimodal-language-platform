"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
  tier: string;
}

const LANGUAGES: Language[] = [
  { code: "es", name: "Spanish", flag: "🇪🇸", nativeName: "Español", tier: "A" },
  { code: "fr", name: "French", flag: "🇫🇷", nativeName: "Français", tier: "A" },
  { code: "de", name: "German", flag: "🇩🇪", nativeName: "Deutsch", tier: "A" },
  { code: "ja", name: "Japanese", flag: "🇯🇵", nativeName: "日本語", tier: "A" },
  { code: "zh", name: "Chinese", flag: "🇨🇳", nativeName: "中文", tier: "A" },
  { code: "ko", name: "Korean", flag: "🇰🇷", nativeName: "한국어", tier: "A" },
  { code: "it", name: "Italian", flag: "🇮🇹", nativeName: "Italiano", tier: "A" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹", nativeName: "Português", tier: "A" },
];

const GOALS = [
  { id: "travel", icon: "✈️", title: "Travel", description: "Communicate while traveling" },
  { id: "work", icon: "💼", title: "Work", description: "Professional development" },
  { id: "study", icon: "📚", title: "Study", description: "Academic or certification" },
  { id: "culture", icon: "🎬", title: "Culture", description: "Movies, music, literature" },
  { id: "family", icon: "👨‍👩‍👧", title: "Family", description: "Connect with relatives" },
  { id: "brain", icon: "🧠", title: "Brain Training", description: "Cognitive benefits" },
];

const TIME_COMMITMENTS = [
  { id: "15", label: "15 min/day", description: "Casual learning" },
  { id: "30", label: "30 min/day", description: "Regular practice" },
  { id: "60", label: "1 hour/day", description: "Serious learner" },
  { id: "120", label: "2+ hours/day", description: "Intensive study" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [experience, setExperience] = useState<string>("");
  const [goals, setGoals] = useState<string[]>([]);
  const [timeCommitment, setTimeCommitment] = useState<string>("");

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setStep(2);
  };

  const handleExperienceSelect = (level: string) => {
    setExperience(level);
    setStep(3);
  };

  const toggleGoal = (goalId: string) => {
    setGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (step === 3 && goals.length > 0) {
      setStep(4);
    } else if (step === 4 && timeCommitment) {
      router.push(`/assessment?lang=${selectedLanguage?.code}`);
    }
  };

  const getRecommendedLevel = () => {
    const levels: Record<string, string> = {
      "beginner": "A1",
      "some": "A2", 
      "intermediate": "B1",
      "advanced": "B2"
    };
    return levels[experience] || "A1";
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-surface-dark flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              What language do you want to <span className="gradient-text">learn?</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Choose the language you&apos;d like to master
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 max-w-4xl">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang)}
                className="glass-card p-6 text-center hover:border-brand-500/50 transition-all group"
              >
                <div className="text-5xl mb-4">{lang.flag}</div>
                <div className="font-semibold text-lg group-hover:text-brand-400 transition-colors">
                  {lang.name}
                </div>
                <div className="text-sm text-slate-400">{lang.nativeName}</div>
                <div className="mt-2 text-xs text-brand-400">Tier {lang.tier} • AI Full</div>
              </button>
            ))}
          </div>

          <div className="mt-8">
            <button className="text-slate-400 hover:text-white">
              View all 120+ languages →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-surface-dark flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">{selectedLanguage?.flag}</div>
            <h1 className="text-4xl font-bold mb-4">
              What&apos;s your <span className="gradient-text">{selectedLanguage?.name}</span> level?
            </h1>
            <p className="text-slate-400 text-lg">
              This helps us personalize your learning path
            </p>
          </div>

          <div className="space-y-4 max-w-xl w-full">
            <button
              onClick={() => handleExperienceSelect("beginner")}
              className="w-full p-6 glass-card text-left hover:border-brand-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">🌱</div>
                <div>
                  <div className="font-semibold text-lg">Absolute Beginner</div>
                  <div className="text-slate-400">I&apos;m just starting out</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleExperienceSelect("some")}
              className="w-full p-6 glass-card text-left hover:border-brand-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">📖</div>
                <div>
                  <div className="font-semibold text-lg">Some Experience</div>
                  <div className="text-slate-400">I know a few words and phrases</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleExperienceSelect("intermediate")}
              className="w-full p-6 glass-card text-left hover:border-brand-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">💬</div>
                <div>
                  <div className="font-semibold text-lg">Intermediate</div>
                  <div className="text-slate-400">I can hold basic conversations</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleExperienceSelect("advanced")}
              className="w-full p-6 glass-card text-left hover:border-brand-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">🎓</div>
                <div>
                  <div className="font-semibold text-lg">Advanced</div>
                  <div className="text-slate-400">I want to refine my skills</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-surface-dark flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              What&apos;s your <span className="gradient-text">goal?</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Select one or more goals (optional)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-3xl">
            {GOALS.map((goal) => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`p-6 glass-card text-center transition-all ${
                  goals.includes(goal.id) 
                    ? "border-brand-500 bg-brand-500/10" 
                    : "hover:border-brand-500/50"
                }`}
              >
                <div className="text-4xl mb-3">{goal.icon}</div>
                <div className="font-semibold">{goal.title}</div>
                <div className="text-sm text-slate-400">{goal.description}</div>
              </button>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={goals.length === 0}
            className="btn-primary mt-12 px-12 py-4 disabled:opacity-50"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-surface-dark flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              How much time can you <span className="gradient-text">practice?</span>
            </h1>
            <p className="text-slate-400 text-lg">
              We&apos;ll tailor your daily lessons accordingly
            </p>
          </div>

          <div className="space-y-4 max-w-xl w-full">
            {TIME_COMMITMENTS.map((time) => (
              <button
                key={time.id}
                onClick={() => setTimeCommitment(time.id)}
                className={`w-full p-6 glass-card text-left transition-all ${
                  timeCommitment === time.id
                    ? "border-brand-500 bg-brand-500/10"
                    : "hover:border-brand-500/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">{time.label}</div>
                  <div className="text-slate-400">{time.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="glass-card p-6 mt-12 max-w-xl w-full">
            <h3 className="font-semibold mb-4">Your Personalized Plan</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Language</span>
                <span>{selectedLanguage?.flag} {selectedLanguage?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Starting Level</span>
                <span className="text-brand-400">{getRecommendedLevel()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Goals</span>
                <span>{goals.length} selected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Daily Time</span>
                <span>{timeCommitment || "Not set"} min</span>
              </div>
            </div>
          </div>

          {timeCommitment && (
            <button
              onClick={handleContinue}
              className="btn-primary mt-8 px-12 py-4"
            >
              Start Learning →
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}