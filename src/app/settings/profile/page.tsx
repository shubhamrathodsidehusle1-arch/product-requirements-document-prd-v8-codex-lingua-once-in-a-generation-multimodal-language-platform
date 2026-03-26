"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK_USER = {
  id: 1,
  email: "demo@codexlingua.com",
  displayName: "Demo User",
  homeLanguage: "en",
  subscriptionTier: "plus",
  timezone: "America/New_York",
  joinedAt: "2024-01-15",
};

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

const HOME_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
];

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(MOCK_USER);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [timezone, setTimezone] = useState(user.timezone);
  const [homeLanguage, setHomeLanguage] = useState(user.homeLanguage);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setUser({ ...user, displayName, email, timezone, homeLanguage });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
            <Link href="/settings/profile" className="nav-link text-brand-400">Settings</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-slate-400">Manage your account and preferences</p>
          </div>

          <div className="flex gap-8">
            <aside className="w-48 shrink-0">
              <nav className="space-y-2">
                <Link href="/settings/profile" className="block px-4 py-2 rounded-lg bg-brand-500/20 text-brand-400">
                  Profile
                </Link>
                <Link href="/settings/subscription" className="block px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">
                  Subscription
                </Link>
                <Link href="/settings/notifications" className="block px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">
                  Notifications
                </Link>
                <Link href="/settings/ai" className="block px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">
                  AI Settings
                </Link>
              </nav>
            </aside>

            <div className="flex-1 space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Home Language
                    </label>
                    <select
                      value={homeLanguage}
                      onChange={(e) => setHomeLanguage(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50"
                    >
                      {HOME_LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50"
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button onClick={handleSave} className="btn-primary">
                      Save Changes
                    </button>
                    {saved && (
                      <span className="text-green-400 text-sm">✓ Saved successfully</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Account Status</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <div className="font-medium">Subscription</div>
                      <div className="text-sm text-slate-400">Current plan</div>
                    </div>
                    <span className="px-3 py-1 bg-brand-500/20 text-brand-400 rounded-full capitalize">
                      {user.subscriptionTier}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <div className="font-medium">Member Since</div>
                      <div className="text-sm text-slate-400">Account creation date</div>
                    </div>
                    <span className="text-slate-300">{user.joinedAt}</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4 text-red-400">Danger Zone</h2>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-left hover:bg-red-500/20 transition-colors">
                    <div className="font-medium text-red-400">Delete Account</div>
                    <div className="text-sm text-slate-400">Permanently delete your account and all data</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}