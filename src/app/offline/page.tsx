"use client";

import { useState } from "react";
import Link from "next/link";

interface OfflinePack {
  id: number;
  name: string;
  language: string;
  size: string;
  words: number;
  lessons: number;
  downloads: number;
  isDownloaded: boolean;
  isDownloading: boolean;
}

const MOCK_PACKS: OfflinePack[] = [
  { id: 1, name: "Spanish Basics", language: "Spanish", size: "45 MB", words: 500, lessons: 20, downloads: 45000, isDownloaded: true, isDownloading: false },
  { id: 2, name: "Spanish Conversations", language: "Spanish", size: "62 MB", words: 800, lessons: 30, downloads: 32000, isDownloaded: false, isDownloading: false },
  { id: 3, name: "Japanese N5 Kanji", language: "Japanese", size: "38 MB", words: 200, lessons: 15, downloads: 28000, isDownloaded: true, isDownloading: false },
  { id: 4, name: "Japanese Daily Phrases", language: "Japanese", size: "28 MB", words: 300, lessons: 10, downloads: 18000, isDownloaded: false, isDownloading: false },
  { id: 5, name: "French Essential Vocab", language: "French", size: "35 MB", words: 450, lessons: 18, downloads: 22000, isDownloaded: false, isDownloading: false },
  { id: 6, name: "German Business", language: "German", size: "52 MB", words: 600, lessons: 25, downloads: 15000, isDownloaded: false, isDownloading: false },
];

export default function OfflinePage() {
  const [packs, setPacks] = useState(MOCK_PACKS);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = (id: number) => {
    setDownloadingId(id);
    setTimeout(() => {
      setPacks(packs.map(p => p.id === id ? { ...p, isDownloaded: true, isDownloading: false } : p));
      setDownloadingId(null);
    }, 2000);
  };

  const downloadedPacks = packs.filter(p => p.isDownloaded);
  const availablePacks = packs.filter(p => !p.isDownloaded);

  const storageUsed = downloadedPacks.reduce((acc, p) => acc + parseInt(p.size), 0);
  const storageLimit = 500; // MB

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
            <Link href="/offline" className="nav-link text-brand-400">Offline</Link>
            <Link href="/settings/profile" className="nav-link">Settings</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Offline Mode</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Download language packs and learn anywhere, even without internet connection
            </p>
          </div>

          <div className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Storage Used</h3>
                <p className="text-sm text-slate-400">{downloadedPacks.length} packs downloaded</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-brand-400">{storageUsed} MB</div>
                <div className="text-sm text-slate-400">of {storageLimit} MB</div>
              </div>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full"
                style={{ width: `${(storageUsed / storageLimit) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Downloaded Packs</h2>
            {downloadedPacks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {downloadedPacks.map((pack) => (
                  <div key={pack.id} className="glass-card p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <h3 className="font-semibold">{pack.name}</h3>
                        <p className="text-sm text-slate-400">{pack.language}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                      <span>{pack.size}</span>
                      <span>{pack.words} words</span>
                      <span>{pack.lessons} lessons</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-primary flex-1 text-sm py-2">Use</button>
                      <button className="btn-secondary flex-1 text-sm py-2 text-red-400 border-red-500/30 hover:bg-red-500/10">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <p className="text-slate-400">No packs downloaded yet</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Available for Download</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availablePacks.map((pack) => (
                <div key={pack.id} className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">
                      {pack.language === "Spanish" ? "🇪🇸" :
                       pack.language === "Japanese" ? "🇯🇵" :
                       pack.language === "French" ? "🇫🇷" : "🇩🇪"}
                    </span>
                    <div>
                      <h3 className="font-semibold">{pack.name}</h3>
                      <p className="text-sm text-slate-400">{pack.language}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                    <span>{pack.size}</span>
                    <span>{pack.words} words</span>
                    <span>{pack.lessons} lessons</span>
                    <span>{pack.downloads.toLocaleString()} downloads</span>
                  </div>
                  <button 
                    onClick={() => handleDownload(pack.id)}
                    disabled={downloadingId === pack.id || storageUsed + parseInt(pack.size) > storageLimit}
                    className="btn-primary w-full text-sm py-2 disabled:opacity-50"
                  >
                    {downloadingId === pack.id ? "Downloading..." : storageUsed + parseInt(pack.size) > storageLimit ? "Storage Full" : "Download"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 glass-card p-8">
            <h2 className="text-2xl font-bold mb-4">How Offline Mode Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📥</div>
                <h3 className="font-semibold mb-2">Download Packs</h3>
                <p className="text-slate-400 text-sm">Download vocabulary, lessons, and audio to your device</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✈️</div>
                <h3 className="font-semibold mb-2">Learn Offline</h3>
                <p className="text-slate-400 text-sm">Practice vocabulary, lessons, and exercises without internet</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="font-semibold mb-2">Sync Progress</h3>
                <p className="text-slate-400 text-sm">When back online, your progress syncs automatically</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}