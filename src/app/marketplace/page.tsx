"use client";

import { useState } from "react";
import Link from "next/link";

interface CreatorContent {
  id: number;
  title: string;
  description: string;
  creator: string;
  language: string;
  type: string;
  price: number;
  rating: number;
  downloads: number;
  image: string;
}

const MOCK_CONTENT: CreatorContent[] = [
  { id: 1, title: "Spanish Slang & Idioms", description: "Learn authentic Spanish from the streets of Madrid", creator: "María García", language: "Spanish", type: "Vocabulary", price: 4.99, rating: 4.8, downloads: 2340, image: "🇪🇸" },
  { id: 2, title: "Japanese Business Etiquette", description: "Navigate Japanese corporate culture with confidence", creator: "Takeshi Yamamoto", language: "Japanese", type: "Business", price: 7.99, rating: 4.9, downloads: 890, image: "🇯🇵" },
  { id: 3, title: "French Poetry Collection", description: "Classic French poems with audio narrations", creator: "Sophie Martin", language: "French", type: "Literature", price: 3.99, rating: 4.7, downloads: 1560, image: "🇫🇷" },
  { id: 4, title: "German Technical Vocabulary", description: "Engineering and IT terminology in German", creator: "Hans Weber", language: "German", type: "Technical", price: 5.99, rating: 4.6, downloads: 780, image: "🇩🇪" },
  { id: 5, title: "Korean Drama Phrases", description: "Popular expressions from Korean dramas", creator: "Ji-Young Park", language: "Korean", type: "Culture", price: 2.99, rating: 4.8, downloads: 3200, image: "🇰🇷" },
  { id: 6, title: "Italian Cooking Terms", description: "Authentic Italian culinary vocabulary", creator: "Marco Rossi", language: "Italian", type: "Culture", price: 3.49, rating: 4.5, downloads: 1100, image: "🇮🇹" },
];

const CONTENT_TYPES = ["All", "Vocabulary", "Business", "Literature", "Technical", "Culture", "Grammar", "Pronunciation"];
const LANGUAGES = ["All Languages", "Spanish", "Japanese", "French", "German", "Korean", "Italian", "Chinese"];

export default function MarketplacePage() {
  const [filterType, setFilterType] = useState("All");
  const [filterLang, setFilterLang] = useState("All Languages");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContent = MOCK_CONTENT.filter(c => {
    const matchesType = filterType === "All" || c.type === filterType;
    const matchesLang = filterLang === "All Languages" || c.language === filterLang;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesLang && matchesSearch;
  });

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
            <Link href="/marketplace" className="nav-link text-brand-400">Marketplace</Link>
            <Link href="/settings/profile" className="nav-link">Profile</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Creator Marketplace</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Discover community-created content: vocabulary packs, courses, and learning materials from language experts worldwide
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search content..."
              className="px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50"
            >
              {CONTENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              value={filterLang}
              onChange={(e) => setFilterLang(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50"
            >
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <div key={item.id} className="glass-card p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-slate-400">by {item.creator}</p>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-4 flex-1">{item.description}</p>
                
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="px-2 py-1 bg-white/10 rounded">{item.type}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-400">{item.language}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400">⭐ {item.rating}</span>
                    <span className="text-slate-400 text-sm">{item.downloads.toLocaleString()} downloads</span>
                  </div>
                  <span className="text-2xl font-bold text-brand-400">${item.price}</span>
                </div>

                <button className="btn-primary w-full mt-4">
                  Get Content
                </button>
              </div>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No content found</h3>
              <p className="text-slate-400">Try adjusting your filters</p>
            </div>
          )}

          <div className="mt-16 glass-card p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Become a Creator</h2>
                <p className="text-slate-400 mb-4">
                  Share your language expertise with millions of learners. Create vocabulary packs, courses, and learning materials.
                </p>
                <button className="btn-primary">
                  Apply to be a Creator →
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-brand-400">$2.5M+</div>
                  <div className="text-sm text-slate-400">Paid to creators</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-brand-400">50K+</div>
                  <div className="text-sm text-slate-400">Content packs</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-brand-400">10M+</div>
                  <div className="text-sm text-slate-400">Downloads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}