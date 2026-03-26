"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/contact" className="nav-link text-brand-400">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-slate-400 text-center mb-8">
            Have questions? We&apos;d love to hear from you.
          </p>

          {submitted ? (
            <div className="glass-card p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-semibold mb-2">Message Sent!</h2>
              <p className="text-slate-400">We&apos;ll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-500/50"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing & Subscription</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button type="submit" className="btn-primary w-full py-4">
                Send Message
              </button>
            </form>
          )}

          <div className="mt-12 glass-card p-8">
            <h2 className="text-xl font-semibold mb-6">Other Ways to Reach Us</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-slate-400">support@codexlingua.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">💬</span>
                <div>
                  <div className="font-medium">Live Chat</div>
                  <div className="text-slate-400">Available 24/7</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl">🐦</span>
                <div>
                  <div className="font-medium">Twitter</div>
                  <div className="text-slate-400">@codexlingua</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}