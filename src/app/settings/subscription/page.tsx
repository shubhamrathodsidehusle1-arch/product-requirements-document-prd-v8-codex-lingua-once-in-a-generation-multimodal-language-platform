"use client";

import { useState } from "react";
import Link from "next/link";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    features: [
      "3 languages",
      "50 XP/day limit",
      "10 AI messages/day",
      "Basic vocabulary decks",
      "Community features",
    ],
    limits: {
      languages: 3,
      xpPerDay: 50,
      aiMessages: 10,
    },
  },
  {
    id: "plus",
    name: "Plus",
    price: 9.99,
    period: "month",
    popular: true,
    features: [
      "10 languages",
      "200 XP/day limit",
      "100 AI messages/day",
      "Unlimited vocabulary decks",
      "Full offline mode",
      "Advanced analytics",
    ],
    limits: {
      languages: 10,
      xpPerDay: 200,
      aiMessages: 100,
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: 19.99,
    period: "month",
    features: [
      "Unlimited languages",
      "Unlimited XP",
      "Unlimited AI messages",
      "Custom AI personas",
      "API access",
      "Priority support",
    ],
    limits: {
      languages: -1,
      xpPerDay: -1,
      aiMessages: -1,
    },
  },
];

const MOCK_USAGE = {
  currentPlan: "plus",
  languagesUsed: 5,
  xpToday: 120,
  xpDailyLimit: 200,
  aiMessagesUsed: 45,
  aiMessagesLimit: 100,
  renewalDate: "April 15, 2026",
  paymentMethod: "Visa •••• 4242",
};

export default function SubscriptionPage() {
  const [currentPlan] = useState(MOCK_USAGE.currentPlan);
  const [usage] = useState(MOCK_USAGE);

  const currentPlanData = PLANS.find(p => p.id === currentPlan) || PLANS[0];

  const handleUpgrade = (planId: string) => {
    alert(`Upgrading to ${planId} - This would integrate with Stripe`);
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
            <Link href="/settings/subscription" className="nav-link text-brand-400">Settings</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Subscription</h1>
            <p className="text-slate-400">Manage your plan and billing</p>
          </div>

          <div className="flex gap-8">
            <aside className="w-48 shrink-0">
              <nav className="space-y-2">
                <Link href="/settings/profile" className="block px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white">
                  Profile
                </Link>
                <Link href="/settings/subscription" className="block px-4 py-2 rounded-lg bg-brand-500/20 text-brand-400">
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
                <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">{currentPlanData.name}</span>
                      <span className="px-2 py-1 bg-brand-500/20 text-brand-400 text-xs rounded-full">
                        Current
                      </span>
                    </div>
                    <div className="text-slate-400 mt-1">
                      ${currentPlanData.price}/mo
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Renews</div>
                    <div className="text-white">{usage.renewalDate}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Languages used</span>
                    <span>{usage.languagesUsed} / {currentPlanData.limits.languages === -1 ? "∞" : currentPlanData.limits.languages}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">Daily XP</span>
                      <span>{usage.xpToday} / {currentPlanData.limits.xpPerDay === -1 ? "∞" : currentPlanData.limits.xpPerDay}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${(usage.xpToday / usage.xpDailyLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">AI Messages</span>
                      <span>{usage.aiMessagesUsed} / {currentPlanData.limits.aiMessages === -1 ? "∞" : currentPlanData.limits.aiMessages}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-500 rounded-full"
                        style={{ width: `${(usage.aiMessagesUsed / usage.aiMessagesLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <div className="font-medium">{usage.paymentMethod}</div>
                      <div className="text-sm text-slate-400">Expires 12/27</div>
                    </div>
                  </div>
                  <button className="btn-secondary text-sm">Update</button>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-6">Available Plans</h2>
                <div className="space-y-4">
                  {PLANS.map((plan) => (
                    <div 
                      key={plan.id} 
                      className={`p-4 rounded-xl border ${
                        plan.id === currentPlan 
                          ? "border-brand-500/50 bg-brand-500/10" 
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-lg">{plan.name}</span>
                          {plan.popular && (
                            <span className="px-2 py-1 bg-brand-500/20 text-brand-400 text-xs rounded-full">
                              Popular
                            </span>
                          )}
                          {plan.id === currentPlan && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold">${plan.price}</span>
                          <span className="text-slate-400">/{plan.period}</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {plan.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                            <span className="text-green-400">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                      {plan.id !== currentPlan && (
                        <button 
                          onClick={() => handleUpgrade(plan.id)}
                          className={plan.popular ? "btn-primary w-full" : "btn-secondary w-full"}
                        >
                          {plan.price > currentPlanData.price ? "Upgrade" : "Downgrade"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4 text-red-400">Cancel Subscription</h2>
                <p className="text-slate-400 mb-4">
                  If you cancel, you&apos;ll lose access to premium features at the end of your billing period.
                </p>
                <button className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}