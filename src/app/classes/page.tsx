"use client";

import { useState } from "react";
import Link from "next/link";

interface ClassSession {
  id: number;
  title: string;
  instructor: string;
  language: string;
  level: string;
  duration: number;
  scheduledAt: string;
  attendees: number;
  maxAttendees: number;
  isLive: boolean;
  price: number;
}

const MOCK_CLASSES: ClassSession[] = [
  {
    id: 1,
    title: "Spanish Conversation Practice",
    instructor: "María García",
    language: "Spanish",
    level: "A2-B1",
    duration: 60,
    scheduledAt: "Today, 3:00 PM",
    attendees: 8,
    maxAttendees: 10,
    isLive: true,
    price: 0,
  },
  {
    id: 2,
    title: "Japanese Pronunciation Workshop",
    instructor: "Takeshi Yamamoto",
    language: "Japanese",
    level: "A1-A2",
    duration: 45,
    scheduledAt: "Today, 5:00 PM",
    attendees: 5,
    maxAttendees: 8,
    isLive: false,
    price: 0,
  },
  {
    id: 3,
    title: "French Grammar Deep Dive",
    instructor: "Sophie Martin",
    language: "French",
    level: "B1-B2",
    duration: 90,
    scheduledAt: "Tomorrow, 10:00 AM",
    attendees: 6,
    maxAttendees: 12,
    isLive: false,
    price: 4.99,
  },
  {
    id: 4,
    title: "German Business Basics",
    instructor: "Hans Weber",
    language: "German",
    level: "A2-B1",
    duration: 60,
    scheduledAt: "Tomorrow, 2:00 PM",
    attendees: 4,
    maxAttendees: 8,
    isLive: false,
    price: 2.99,
  },
  {
    id: 5,
    title: "Spanish Grammar Essentials",
    instructor: "Carlos Rodríguez",
    language: "Spanish",
    level: "A1",
    duration: 45,
    scheduledAt: "Wed, 4:00 PM",
    attendees: 7,
    maxAttendees: 10,
    isLive: false,
    price: 0,
  },
  {
    id: 6,
    title: "Korean Culture & Language",
    instructor: "Ji-Young Park",
    language: "Korean",
    level: "Beginner",
    duration: 60,
    scheduledAt: "Thu, 6:00 PM",
    attendees: 3,
    maxAttendees: 6,
    isLive: false,
    price: 0,
  },
];

const PAST_CLASSES = [
  { id: 1, title: "Spanish Conversation Practice", instructor: "María García", language: "Spanish", date: "Yesterday", attended: true },
  { id: 2, title: "Japanese Hiragana Basics", instructor: "Takeshi Yamamoto", language: "Japanese", date: "2 days ago", attended: true },
];

export default function ClassesPage() {
  const [classes] = useState(MOCK_CLASSES);
  const [filter, setFilter] = useState<string>("all");

  const filteredClasses = filter === "all" 
    ? classes 
    : filter === "free" 
      ? classes.filter(c => c.price === 0)
      : filter === "live"
        ? classes.filter(c => c.isLive)
        : classes;

  const getLevelColor = (level: string) => {
    if (level.includes("A1") || level === "Beginner") return "bg-green-500/20 text-green-400";
    if (level.includes("A2")) return "bg-yellow-500/20 text-yellow-400";
    if (level.includes("B")) return "bg-orange-500/20 text-orange-400";
    return "bg-purple-500/20 text-purple-400";
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
            <Link href="/classes" className="nav-link text-brand-400">Classes</Link>
            <Link href="/progress" className="nav-link">Progress</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Live Classes</h1>
              <p className="text-slate-400">Join interactive sessions with native speaker instructors</p>
            </div>
            <button className="btn-primary">
              🎥 Start Instant Class
            </button>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full transition-all ${filter === "all" ? "bg-brand-500 text-white" : "bg-white/10 text-slate-400 hover:text-white"}`}
            >
              All Classes
            </button>
            <button 
              onClick={() => setFilter("free")}
              className={`px-4 py-2 rounded-full transition-all ${filter === "free" ? "bg-brand-500 text-white" : "bg-white/10 text-slate-400 hover:text-white"}`}
            >
              Free
            </button>
            <button 
              onClick={() => setFilter("live")}
              className={`px-4 py-2 rounded-full transition-all ${filter === "live" ? "bg-brand-500 text-white" : "bg-white/10 text-slate-400 hover:text-white"}`}
            >
              🔴 Live Now
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredClasses.map((classItem) => (
              <div key={classItem.id} className="glass-card p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  {classItem.isLive && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Live Now
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(classItem.level)}`}>
                    {classItem.level}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{classItem.title}</h3>
                <div className="text-sm text-slate-400 mb-4">
                  with {classItem.instructor}
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <span>🌐 {classItem.language}</span>
                  <span>⏱️ {classItem.duration} min</span>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>{classItem.scheduledAt}</span>
                    <span>{classItem.attendees}/{classItem.maxAttendees} spots</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {classItem.price === 0 ? "Free" : `$${classItem.price}`}
                    </span>
                    <button className="btn-primary text-sm py-2 px-4">
                      {classItem.isLive ? "Join Now" : "Reserve"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-6">Your Past Classes</h2>
            <div className="space-y-3">
              {PAST_CLASSES.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div>
                    <div className="font-medium">{cls.title}</div>
                    <div className="text-sm text-slate-400">with {cls.instructor} • {cls.language}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">{cls.date}</span>
                    {cls.attended && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        Attended
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}