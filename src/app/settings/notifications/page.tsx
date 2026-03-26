"use client";

import { useState } from "react";
import Link from "next/link";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "vocab",
    title: "Time to review!",
    message: "You have 15 words due for review. Keep your streak going!",
    time: "2 hours ago",
    read: false,
    actionUrl: "/learn/es/review",
  },
  {
    id: 2,
    type: "achievement",
    title: "Achievement Unlocked! 🎉",
    message: "You've learned 500 words! That's impressive dedication.",
    time: "1 day ago",
    read: false,
    actionUrl: "/achievements",
  },
  {
    id: 3,
    type: "class",
    title: "Class Starting Soon",
    message: "Spanish Conversation Practice starts in 30 minutes",
    time: "Yesterday",
    read: true,
    actionUrl: "/classes",
  },
  {
    id: 4,
    type: "streak",
    title: "🔥 7 Day Streak!",
    message: "Amazing! You've practiced for 7 days in a row. Keep it up!",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "subscription",
    title: "Welcome to Plus!",
    message: "You now have access to 10 languages and unlimited vocabulary decks.",
    time: "1 week ago",
    read: true,
    actionUrl: "/settings/subscription",
  },
];

const FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "vocab", label: "Vocabulary" },
  { id: "achievement", label: "Achievements" },
  { id: "class", label: "Classes" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "vocab": return "📝";
      case "achievement": return "🏆";
      case "class": return "📹";
      case "streak": return "🔥";
      case "subscription": return "💳";
      default: return "🔔";
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
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/settings/notifications" className="nav-link text-brand-400">Settings</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-slate-400">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="btn-secondary text-sm"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  filter === option.id 
                    ? "bg-brand-500 text-white" 
                    : "bg-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <div className="text-4xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                <p className="text-slate-400">You&apos;re all caught up!</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`glass-card p-4 flex items-start gap-4 ${
                    !notification.read ? "border-l-4 border-l-brand-500" : ""
                  }`}
                >
                  <div className="text-2xl">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-brand-500" />
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-500">{notification.time}</span>
                      {notification.actionUrl && (
                        <Link 
                          href={notification.actionUrl}
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-brand-400 hover:text-brand-300"
                        >
                          View →
                        </Link>
                      )}
                    </div>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      ✓
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}